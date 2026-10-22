// Homepage ink. A worker paints the traced neuron plate, warped so its soma and five axon
// dots land on the live layout. Signals are drawn on a transparent overlay as fronts of
// darker, thicker ink travelling along the fibres by their distance from the soma (no
// light, no blur), shaped like a calcium transient: a fast rise, then a slow fade. Paths you
// use thicken over visits, and the thickness persists, so the drawing remembers.

import { inkColor } from './ink';
import './ink.css'; // loading states: phone placeholder, desktop fade-in
import type { PlateMeta, PlatePainted, PlateRequest, PlateWarp } from './plate.worker';
// Content-hashed asset URL, so the 780 KB trace is cached immutably.
import traceUrl from './trace.json?url';

type Pt = [number, number];
/** Distances are plate px along the fibres; `inward` runs from distance D back to the soma. */
type Wave = {
	groups: number[];
	t0: number;
	v: number;
	inward: boolean;
	D: number;
	maxD: number;
	strength: number;
	hover: boolean;
	fadeAt?: number;
};
/** One fibre group's segments (index of their first point) sorted by distance from the soma. */
type Group = { seg: Uint32Array; d: Float32Array; dots: number[] };

// Plate px (1586×992): the main soma, and cells that must move rigidly (x, y, radius) so
// somata stay round. The five terminal arbors are added per dot. Measured by InkTrace.
const SOMA: Pt = [425, 672];
const BACKGROUND_CELLS = [
	[1515, 130, 80],
	[1345, 920, 70]
];
// Plate frame anchors (fractions), every 1/8 along each edge, pinned to the viewport frame:
// fewer let the plate's edge bow inward between anchors and leave a bare strip.
const FRAME = Array.from({ length: 8 }, (_, i) => i / 8).flatMap((f) => [
	[f, 0],
	[1, f],
	[1 - f, 1],
	[0, 1 - f]
]);
// Phones show this window of the plate (fractions) as a figure between the bio and essays.
const PHONE_CROP = { x0: 0, x1: 0.64, y0: 0.12, y1: 0.86 };
// Groups: 0..4 main-cell fibres to each terminal, 5 the rest of the main cell, 6..8 cells 1..3.
const GROUPS = 9;
// Calcium-transient shape (GCaMP6f rises in ~50 ms and decays over a few hundred ms).
const RISE = 60;
const TAIL = 420;
const SPAN = 4 * TAIL; // beyond this the front has faded out
const V_SIGNAL = 0.9; // plate px per ms: an essay's signal reaches the soma in under a second
const V_IDLE = 0.45;
const V_RINGS = 0.18; // slow enough that the soma's contour rings darken one after another
const FRAME_MS = 40; // the overlay steps at ~24 fps, like drawn animation on twos
const STORE = 'ink-paths';
const HALF_LIFE = 21 * 864e5; // learned paths fade over weeks

/**
 * Mounts the art behind `home`. Essays are `[data-essay]` in order, each with a `[data-title]`
 * the axon dot sits beside; `[data-intro]` is the bio block; `[data-text]` blocks are kept
 * clear of ink; `related[i]` lists the essays a signal from essay i travels on to.
 */
export function mountInk({
	home,
	base,
	overlay,
	related
}: {
	home: HTMLElement;
	base: HTMLCanvasElement;
	overlay: HTMLCanvasElement;
	related: number[][];
}) {
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const essays = [...home.querySelectorAll<HTMLElement>('[data-essay]')];
	const octx = overlay.getContext('2d')!;
	const worker = new Worker(new URL('./plate.worker.ts', import.meta.url), { type: 'module' });
	let meta: PlateMeta | undefined;
	let groups: Group[] = [];
	let colors: string[] = [];
	let termD: number[] = []; // distance from the soma to each axon dot
	let xy: Float32Array = new Float32Array(0),
		dotXY: Float32Array = new Float32Array(0);
	let halo: number[][] = [];
	let paintId = 0,
		w = 0,
		h = 0,
		dpr = 1,
		k = 1,
		size = '',
		raf = 0,
		last = 0,
		drawn = 0,
		hovered = -1,
		idle = 0,
		repaint = 0,
		resize = 0;
	let waves: Wave[] = [];
	let timers: number[] = [];
	let lastPaint: Omit<Extract<PlateRequest, { type: 'paint' }>, 'id' | 'boost'> | undefined;
	const lit = essays.map(() => 0);

	// Learned path strength per essay, decayed by time since the last visit.
	const learned = (() => {
		try {
			const s: { w: number[]; t: number } = JSON.parse(localStorage.getItem(STORE) ?? '');
			const f = 0.5 ** ((Date.now() - s.t) / HALF_LIFE);
			return essays.map((_, i) => (s.w[i] ?? 0) * f);
		} catch {
			return essays.map(() => 0);
		}
	})();
	const boost = () => [...learned.map((v) => 1 + 0.45 * v), 1];
	const strengthen = (i: number, amount: number) => {
		learned[i] = Math.min(1, learned[i] + amount);
		localStorage.setItem(STORE, JSON.stringify({ w: learned, t: Date.now() }));
		clearTimeout(repaint);
		repaint = window.setTimeout(
			() => lastPaint && post({ ...lastPaint, id: ++paintId, boost: boost() }),
			1500
		);
	};

	const post = (m: PlateRequest) => worker.postMessage(m);

	/** Measures the page (reads only) and asks the worker for a plate that fits it. */
	const layout = () => {
		if (!meta) return;
		const { W, H, plateDots } = meta;
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		w = home.clientWidth;
		const box = home.getBoundingClientRect();
		const intro = home.querySelector('[data-intro]')!.getBoundingClientRect();
		let warp: PlateWarp, top: number;
		if (w < 760) {
			// Phones: the soma and its branches as a figure in the gap above the essay list. CSS
			// places and sizes the canvas (so nothing shifts when the art arrives); fit the crop to it.
			top = base.getBoundingClientRect().top - box.top;
			k = w / ((PHONE_CROP.x1 - PHONE_CROP.x0) * W);
			h = base.clientHeight;
			warp = { x0: PHONE_CROP.x0 * W, y0: PHONE_CROP.y0 * H };
		} else {
			top = 0;
			h = home.clientHeight;
			const targets = essays.map((el) => {
				const r = el.querySelector('[data-title]')!.getBoundingClientRect();
				return [r.left - box.left - 20, (r.top + r.bottom) / 2 - box.top] as Pt;
			});
			const dx = Math.min(...targets.map((d) => d[0]));
			const il = intro.left - box.left;
			const soma: Pt = [
				il + (dx - il) * 0.39,
				// At least one dendrite length (~125 plate px) below the bio, so the tree clears the links.
				Math.min(h * 0.85, Math.max(intro.bottom - box.top + (125 * h) / H, h * 0.678))
			];
			// The plate's empty zones (beside the trunk, left of the corner cells) are pinned
			// just outside the real bio and essay text, so the ink flows around the words. The
			// bio zone is pinned on its whole bottom edge: pinning only its right end let the left
			// river rise under the last lines, where the halo then visibly cut the fibres.
			const textRight =
				Math.max(...essays.map((el) => el.querySelector('a')!.getBoundingClientRect().right)) -
				box.left;
			const ir = intro.right - box.left + 24;
			const ib = intro.bottom - box.top + 28;
			const right = Math.max(textRight + 28, 0.9 * w);
			const zones = [
				[0.06, 0.06, il - 8, intro.top - box.top],
				[0.36, 0.06, ir, intro.top - box.top],
				[0.06, 0.47, il - 8, ib],
				[0.2, 0.49, (il + ir) / 2, ib],
				[0.36, 0.5, ir, ib],
				[0.9, 0.25, right, 0.25 * h],
				[0.9, 0.78, right, 0.78 * h]
			];
			k = h / H;
			warp = {
				src: [
					SOMA,
					...plateDots,
					...FRAME.map(([fx, fy]) => [fx * W, fy * H]),
					...zones.map(([fx, fy]) => [fx * W, fy * H])
				],
				dst: [
					soma,
					...targets,
					...FRAME.map(([fx, fy]) => [fx * w, fy * h]),
					...zones.map(([, , x, y]) => [x, y])
				],
				cells: [[...SOMA, 90], ...plateDots.map(([x, y]) => [x - 46, y, 60]), ...BACKGROUND_CELLS]
			};
		}
		halo = [];
		for (const el of home.querySelectorAll('[data-text]')) {
			const range = document.createRange();
			range.selectNodeContents(el);
			for (const r of range.getClientRects())
				if (r.width > 0) halo.push([r.left - box.left, r.top - box.top - top, r.width, r.height]);
		}
		lastPaint = { type: 'paint', w, h, dpr, k, warp, feather: top ? 48 : 0, halo };
		post({ ...lastPaint, id: ++paintId, boost: boost() });
	};

	const onMeta = (m: PlateMeta) => {
		meta = m;
		colors = Array.from({ length: 16 }, (_, q) => inkColor(m.pal, q / 15));
		const segs: number[][] = Array.from({ length: GROUPS }, () => []);
		for (let s = 0; s + 1 < m.start.length; s++)
			for (let i = m.start[s]; i < m.start[s + 1] - 1; i++) {
				if (m.d[i] < 0) continue;
				segs[m.c[i] === 0 ? m.b[i] : 5 + m.c[i]].push(i);
			}
		groups = segs.map((list) => {
			list.sort((p, q) => m.d[p] - m.d[q]);
			return { seg: Uint32Array.from(list), d: Float32Array.from(list, (i) => m.d[i]), dots: [] };
		});
		termD = essays.map(() => 0);
		for (let j = 0; j < m.dots.length / 7; j++) {
			const [c, d, b] = [m.dots[j * 7 + 4], m.dots[j * 7 + 5], m.dots[j * 7 + 6]];
			if (d < 0) continue;
			groups[c === 0 ? b : 5 + c].dots.push(j);
			if (c === 0 && b < 5) termD[b] = Math.max(termD[b], d);
		}
		layout();
	};

	worker.addEventListener('message', (e: MessageEvent<PlateMeta | PlatePainted>) => {
		const m = e.data;
		if (m.type === 'meta') return onMeta(m);
		if (m.id !== paintId) return m.bitmap.close(); // a newer layout is already on its way
		// transferFromImageBitmap leaves the canvas size alone; match it so the plate stays 1:1.
		base.width = overlay.width = m.bitmap.width;
		base.height = overlay.height = m.bitmap.height;
		base.getContext('bitmaprenderer')!.transferFromImageBitmap(m.bitmap);
		base.dataset.painted = overlay.dataset.painted = '';
		xy = m.xy;
		dotXY = m.dotXY;
		if (!reduce && !idle) {
			idle = window.setTimeout(tick, 1200);
		}
		wake();
	});

	/** Starts the frame loop if idle; it stops itself once nothing is moving. */
	const wake = () => {
		if (!raf && !reduce) raf = requestAnimationFrame(frame);
	};

	// Spontaneous activity: one cell fires every 8–20 s, scheduled off the frame loop.
	function tick() {
		idle = window.setTimeout(tick, 8000 + Math.random() * 12000);
		if (document.hidden) return;
		const c = Math.random() < 0.4 ? 0 : 1 + Math.floor(Math.random() * 3);
		waves.push({
			groups: c === 0 ? [0, 1, 2, 3, 4, 5] : [5 + c],
			t0: performance.now(),
			v: V_IDLE,
			inward: false,
			D: 0,
			maxD: 900,
			strength: 0.6,
			hover: false
		});
		wake();
	}

	/** Essay i fires: its signal runs back to the soma, the rings darken, then it travels out to the related essays. */
	const fire = (i: number) => {
		cancel();
		const now = performance.now();
		lit[i] = 1;
		strengthen(i, 0.05);
		waves.push({
			groups: [i],
			t0: now,
			v: V_SIGNAL,
			inward: true,
			D: termD[i],
			maxD: termD[i],
			strength: 1,
			hover: true
		});
		timers.push(
			window.setTimeout(() => {
				const t0 = performance.now();
				waves.push({
					groups: [5],
					t0,
					v: V_RINGS,
					inward: false,
					D: 0,
					maxD: 110,
					strength: 0.9,
					hover: true
				});
				for (const r of related[i]) {
					waves.push({
						groups: [r],
						t0,
						v: V_SIGNAL,
						inward: false,
						D: 0,
						maxD: termD[r],
						strength: 0.55 + 0.45 * learned[r],
						hover: true
					});
					timers.push(window.setTimeout(() => (lit[r] = 1), termD[r] / V_SIGNAL));
					strengthen(r, 0.02);
				}
				wake();
			}, termD[i] / V_SIGNAL)
		);
		wake();
	};

	/** Leaving an essay fades its signal out at once rather than letting it play on. */
	const cancel = () => {
		for (const id of timers) clearTimeout(id);
		timers = [];
		const now = performance.now();
		for (const wv of waves) if (wv.hover && wv.fadeAt === undefined) wv.fadeAt = now;
	};

	function frame(now: number) {
		raf = 0;
		const dt = Math.min(now - (last || now), 100);
		last = now;
		const decay = Math.exp(-dt / 1100);
		let moving = false;
		lit.forEach((v, i) => {
			lit[i] = i === hovered ? 1 : v * decay < 0.01 ? 0 : v * decay;
			if (lit[i] > 0 && i !== hovered) moving = true;
			essays[i].style.setProperty('--lit', lit[i].toFixed(3));
		});
		if (now - drawn >= FRAME_MS || !waves.length) {
			drawn = now;
			drawWaves(now);
		}
		if (moving || waves.length) raf = requestAnimationFrame(frame);
	}

	/** Redraws only the segments inside each travelling front, darker and thicker than the plate. */
	const drawWaves = (now: number) => {
		const m = meta!;
		octx.setTransform(dpr, 0, 0, dpr, 0, 0);
		octx.clearRect(0, 0, w, h);
		// Batch segments by quantised ink and width: a few dozen paths per frame, not thousands.
		const buckets = new Map<number, number[]>();
		const dotsToDraw: number[] = [];
		waves = waves.filter((wv) => {
			const front = wv.v * (now - wv.t0);
			const s =
				wv.strength * (wv.fadeAt === undefined ? 1 : Math.max(0, 1 - (now - wv.fadeAt) / 180));
			if (s <= 0 || front - wv.v * SPAN > (wv.inward ? wv.D : wv.maxD)) return false;
			const lo = wv.inward ? wv.D - front : Math.max(0, front - wv.v * SPAN);
			const hi = wv.inward ? wv.D - front + wv.v * SPAN : Math.min(front, wv.maxD);
			const shape = (d: number) => {
				const phi = (front - (wv.inward ? wv.D - d : d)) / wv.v;
				return phi < 0 ? 0 : s * (1 - Math.exp(-phi / RISE)) * Math.exp(-phi / TAIL);
			};
			for (const gi of wv.groups) {
				const g = groups[gi];
				let a = 0,
					b = g.d.length;
				while (a < b) {
					const mid = (a + b) >> 1;
					if (g.d[mid] < lo) a = mid + 1;
					else b = mid;
				}
				for (let j = a; j < g.d.length && g.d[j] <= hi; j++) {
					const q = shape(g.d[j]);
					if (q < 0.04) continue;
					const i = g.seg[j];
					const ink = (m.a[i] + m.a[i + 1]) / 2,
						width = ((m.w[i] + m.w[i + 1]) / 2) * k * (1 + 0.7 * q);
					const lw = Math.max(width, 0.7);
					const key =
						Math.round(Math.min(1, ((ink + (1 - ink) * 0.85 * q) * width) / lw) * 15) * 64 +
						Math.min(63, Math.round(lw * 4));
					let list = buckets.get(key);
					if (!list) buckets.set(key, (list = []));
					list.push(xy[2 * i], xy[2 * i + 1], xy[2 * i + 2], xy[2 * i + 3]);
				}
				for (const j of g.dots) {
					const q = shape(m.dots[j * 7 + 5]);
					if (q >= 0.04) dotsToDraw.push(j, q);
				}
			}
			return true;
		});
		octx.globalCompositeOperation = 'darken';
		octx.lineCap = 'round';
		for (const [key, list] of buckets) {
			octx.strokeStyle = colors[key >> 6];
			octx.lineWidth = (key & 63) / 4;
			octx.beginPath();
			for (let n = 0; n < list.length; n += 4) {
				octx.moveTo(list[n], list[n + 1]);
				octx.lineTo(list[n + 2], list[n + 3]);
			}
			octx.stroke();
		}
		for (let n = 0; n < dotsToDraw.length; n += 2) {
			const j = dotsToDraw[n],
				q = dotsToDraw[n + 1];
			const ink = m.dots[j * 7 + 3];
			octx.fillStyle = colors[Math.round((ink + (1 - ink) * q) * 15)];
			octx.beginPath();
			octx.arc(
				dotXY[2 * j],
				dotXY[2 * j + 1],
				m.dots[j * 7 + 2] * k * (1 + 0.3 * q),
				0,
				Math.PI * 2
			);
			octx.fill();
		}
		// Signals pass under text too; keep the same paper halo as the plate.
		octx.globalCompositeOperation = 'destination-out';
		octx.fillStyle = 'rgba(0,0,0,0.4)';
		for (const [x, y, rw, rh] of halo)
			for (let e = 0; e < 5; e++)
				octx.fillRect(x - 2 - e * 3, y - e * 2, rw + 4 + e * 6, rh + e * 4);
		octx.globalCompositeOperation = 'source-over';
	};

	const ro = new ResizeObserver(() => {
		const next = `${home.clientWidth}x${home.clientHeight}`;
		if (next === size) return;
		size = next;
		clearTimeout(resize);
		resize = window.setTimeout(layout, 120);
	});
	// The trace is decoration: fetch it only once the text has painted (an idle callback asked
	// for inside a frame runs after that frame is drawn) so it never competes with first paint.
	let dead = false;
	const start = () => {
		if (dead) return;
		size = `${home.clientWidth}x${home.clientHeight}`;
		post({ type: 'load', url: traceUrl });
		ro.observe(home);
	};
	document.fonts.ready.then(() =>
		requestAnimationFrame(() =>
			'requestIdleCallback' in window
				? requestIdleCallback(start, { timeout: 1000 })
				: setTimeout(start, 100)
		)
	);

	return {
		hover(i: number, on: boolean) {
			hovered = on ? i : -1;
			if (reduce) essays[i].style.setProperty('--lit', on ? '1' : '0');
			else if (on && meta) fire(i);
			else {
				cancel();
				wake(); // let the title fade out
			}
		},
		/** Following an essay link strengthens its path for next time. */
		visit(i: number) {
			strengthen(i, 0.2);
		},
		destroy() {
			dead = true;
			cancelAnimationFrame(raf);
			for (const id of [...timers, idle, repaint, resize]) clearTimeout(id);
			ro.disconnect();
			worker.terminate();
		}
	};
}
