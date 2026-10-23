// Renders static/og.gif, the site-wide share card: the traced neuron plate (unwarped) with
// signals travelling along the fibres, and the name where the five axon terminals point.
// Frame 0 is what X/Facebook/LinkedIn show, so it starts with a signal mid-flight.
// Needs the dev server (imports src/lib/lab/ink.ts through Vite) and ffmpeg:
//   npm run dev -- --port 5287 & DEV_URL=http://localhost:5287 node scripts/render-og-card.mjs
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const FRAMES = 60;
const FRAME_MS = 80; // 12.5 fps; GIF delays are whole centiseconds
const origin = process.env.DEV_URL ?? 'http://localhost:5173';
const browser = await puppeteer.connect({
	browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:9229'
});
const page = await browser.newPage();
const dir = await mkdtemp(join(tmpdir(), 'og-card-'));
try {
	await page.goto(`${origin}/robots.txt`);
	await page.evaluate(setup, FRAMES * FRAME_MS);
	for (let f = 0; f < FRAMES; f++) {
		const url = await page.evaluate((ms) => window.__frame(ms), f * FRAME_MS);
		await writeFile(join(dir, `f${String(f).padStart(3, '0')}.png`), url.split(',')[1], 'base64');
	}
	// Flat paper and a 17-step ink palette: 64 colours, no dither, only changed rectangles stored.
	execFileSync('ffmpeg', [
		...['-v', 'error', '-y', '-framerate', String(1000 / FRAME_MS)],
		...['-i', join(dir, 'f%03d.png')],
		'-vf',
		'scale=1200:630:flags=lanczos,split[a][b];[a]palettegen=max_colors=64:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle',
		...['-loop', '0', 'static/og.gif']
	]);
} finally {
	await rm(dir, { recursive: true, force: true });
	await page.close();
	browser.disconnect();
}

/** Runs in the page: draws the plate once, then exposes `__frame(ms)` returning a PNG data URL. */
async function setup(P) {
	const ink = await import('/src/lib/lab/ink.ts');
	const t = ink.decode(await (await fetch('/src/lib/lab/trace.json')).json());
	const font = new FontFace('Literata', 'url(/fonts/literata-normal-400-700.woff2)', {
		weight: '400 700'
	});
	document.fonts.add(await font.load());

	const OUT_W = 1200,
		OUT_H = 630,
		S = 2; // supersampled; ffmpeg downscales
	const WGT = 1.45; // heavier than the site: the card is shown small in feeds
	const { W, H } = t;
	const k = OUT_W / W,
		y0 = (H - OUT_H / k) / 2,
		K = k * S;
	const map = (x, y) => [x * W * K, (y * H - y0) * K];

	const n = t.strokes.reduce((s, st) => s + st.w.length, 0);
	const xy = new Float32Array(2 * n),
		w = new Float32Array(n),
		a = new Float32Array(n),
		c = new Int8Array(n),
		d = new Int16Array(n),
		b = new Int8Array(n),
		last = new Uint8Array(n);
	let p = 0;
	for (const s of t.strokes) {
		for (let i = 0; i < s.w.length; i++, p++) {
			[xy[2 * p], xy[2 * p + 1]] = map(s.pts[2 * i], s.pts[2 * i + 1]);
			w[p] = s.w[i];
			a[p] = s.a[i];
			c[p] = s.c[i];
			d[p] = s.d[i];
			b[p] = s.b[i];
		}
		last[p - 1] = 1;
	}
	const dotXY = new Float32Array(t.dots.length * 2);
	t.dots.forEach(([x, y], i) => dotXY.set(map(x, y), 2 * i));

	const canvas = (cw, chh) =>
		Object.assign(document.createElement('canvas'), { width: cw, height: chh });
	const cv = canvas(OUT_W * S, OUT_H * S),
		g = cv.getContext('2d');
	const base = canvas(cv.width, cv.height),
		bg = base.getContext('2d');
	bg.fillStyle = `rgb(${t.bg.join(',')})`;
	bg.fillRect(0, 0, base.width, base.height);
	ink.draw(bg, t, xy, dotXY, K * WGT, [1.25, 1.25, 1.25, 1.25, 1.25, 1.1]);
	bg.fillStyle = ink.inkColor(t.pal, 1);
	bg.font = `500 ${62 * S}px Literata`;
	bg.fillText('Seth Morton', 765 * S, 318 * S);

	// Calcium-transient fronts as on the homepage (inkNeurons.ts), periodic over P so the loop is seamless.
	const RISE = 60,
		TAIL = 420,
		SPAN = 4 * TAIL;
	const maxD = (f) => {
		let m = 0;
		for (let j = 0; j < n; j++) if (f(j)) m = Math.max(m, d[j]);
		return m;
	};
	const sel = (ci, bs) => (j) => c[j] === ci && (!bs || bs.includes(b[j]));
	const termD = [0, 1, 2, 3, 4].map((i) => maxD(sel(0, [i])));
	const waves = [];
	// A signal arrives at terminal i, runs to the soma, rings it, then travels out to `out`.
	const essay = (i, t0, out) => {
		waves.push({ f: sel(0, [i]), t0, v: 0.9, inward: true, D: termD[i], s: 1 });
		const t1 = t0 + termD[i] / 0.9;
		waves.push({ f: sel(0, [5]), t0: t1, v: 0.18, inward: false, D: 110, s: 0.9 });
		for (const r of out)
			waves.push({ f: sel(0, [r]), t0: t1, v: 0.9, inward: false, D: termD[r], s: 0.85 });
	};
	essay(2, -700, [0, 1, 3, 4]);
	essay(4, 2300, [0, 1, 2]);
	for (const [ci, t0] of [
		[1, -1600],
		[2, 900],
		[3, 3000]
	])
		waves.push({ f: sel(ci), t0, v: 0.45, inward: false, D: maxD(sel(ci)), s: 0.8 });
	for (const wv of waves) wv.idx = [...Array(n).keys()].filter((j) => !last[j] && wv.f(j));

	const colors = Array.from({ length: 16 }, (_, i) => ink.inkColor(t.pal, i / 15));
	const shape = (wv, now, dd) => {
		let q = 0;
		for (const off of [-P, 0, P]) {
			const phi = (wv.v * (now - wv.t0 + off) - (wv.inward ? wv.D - dd : dd)) / wv.v;
			if (phi >= 0 && phi < SPAN) q += wv.s * (1 - Math.exp(-phi / RISE)) * Math.exp(-phi / TAIL);
		}
		return Math.min(q, 1);
	};
	window.__frame = (now) => {
		g.globalCompositeOperation = 'source-over';
		g.drawImage(base, 0, 0);
		g.globalCompositeOperation = 'darken';
		g.lineCap = 'round';
		// Batch segments by quantised ink and width, as the homepage overlay does.
		const buckets = new Map();
		for (const wv of waves)
			for (const i of wv.idx) {
				const q = shape(wv, now, d[i]);
				if (q < 0.04) continue;
				const iw = (a[i] + a[i + 1]) / 2,
					width = ((w[i] + w[i + 1]) / 2) * K * WGT * (1 + 0.9 * q),
					lw = Math.max(width, 0.7 * S);
				const key =
					Math.round(Math.min(1, ((iw + (1 - iw) * 0.9 * q) * width) / lw) * 15) * 256 +
					Math.min(255, Math.round(lw * 4));
				let list = buckets.get(key);
				if (!list) buckets.set(key, (list = []));
				list.push(xy[2 * i], xy[2 * i + 1], xy[2 * i + 2], xy[2 * i + 3]);
			}
		for (const [key, list] of buckets) {
			g.strokeStyle = colors[key >> 8];
			g.lineWidth = (key & 255) / 4;
			g.beginPath();
			for (let m = 0; m < list.length; m += 4) {
				g.moveTo(list[m], list[m + 1]);
				g.lineTo(list[m + 2], list[m + 3]);
			}
			g.stroke();
		}
		return cv.toDataURL('image/png');
	};
}
