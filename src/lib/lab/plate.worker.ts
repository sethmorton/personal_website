// Paints the static ink plate off the main thread. It fetches and decodes the trace once,
// sends the per-point attributes the signal overlay needs, and for every layout warps each
// point once (thin-plate spline), draws the plate into an OffscreenCanvas and hands back
// the bitmap plus the warped points.

import { decode, draw, rigidTps, type Packed, type Trace, type Warp } from './ink';

/** Warp in plate px: a rigid-cell TPS (desktop) or a plain crop window scaled by k (phones). */
export type PlateWarp =
	| { src: number[][]; dst: number[][]; cells: number[][] }
	| { x0: number; y0: number };
export type PlateRequest =
	| { type: 'load'; url: string }
	| {
			type: 'paint';
			id: number;
			w: number;
			h: number;
			dpr: number;
			/** Canvas px per plate px. */
			k: number;
			warp: PlateWarp;
			/** Fade this many px at the top and bottom into the paper (phone figure), or 0. */
			feather: number;
			/** Text line boxes [x, y, w, h] in canvas px to keep clear of ink. */
			halo: number[][];
			/** Width multiplier per main-cell terminal 0..4 and 5 (other fibres). */
			boost: number[];
	  };
/** Flattened per-point attributes; `start[s]` is stroke s's first point, `dots` is stride 7. */
export type PlateMeta = {
	type: 'meta';
	W: number;
	H: number;
	pal: number[][];
	plateDots: number[][];
	start: Uint32Array;
	w: Float32Array;
	a: Float32Array;
	c: Int8Array;
	d: Int16Array;
	b: Int8Array;
	dots: Float32Array;
};
export type PlatePainted = {
	type: 'plate';
	id: number;
	bitmap: ImageBitmap;
	xy: Float32Array;
	dotXY: Float32Array;
};

let trace: Trace | undefined;

addEventListener('message', async (e: MessageEvent<PlateRequest>) => {
	const m = e.data;
	if (m.type === 'load') {
		trace = decode((await (await fetch(m.url, { priority: 'low' })).json()) as Packed);
		const t = trace;
		const n = t.strokes.reduce((s, st) => s + st.w.length, 0);
		const start = new Uint32Array(t.strokes.length + 1);
		const w = new Float32Array(n),
			a = new Float32Array(n),
			c = new Int8Array(n),
			d = new Int16Array(n),
			b = new Int8Array(n);
		let p = 0;
		t.strokes.forEach((s, i) => {
			start[i] = p;
			w.set(s.w, p);
			a.set(s.a, p);
			c.set(s.c, p);
			d.set(s.d, p);
			b.set(s.b, p);
			p += s.w.length;
		});
		start[t.strokes.length] = p;
		const meta: PlateMeta = {
			type: 'meta',
			W: t.W,
			H: t.H,
			pal: t.pal,
			// Each terminal's pulse paths end on its axon dot.
			plateDots: t.branches.map((paths) => [
				paths[0][paths[0].length - 2] * t.W,
				paths[0][paths[0].length - 1] * t.H
			]),
			start,
			w,
			a,
			c,
			d,
			b,
			dots: Float32Array.from(t.dots.flat())
		};
		postMessage(meta, {
			transfer: [start.buffer, w.buffer, a.buffer, c.buffer, d.buffer, b.buffer, meta.dots.buffer]
		});
		return;
	}
	const t = trace;
	if (!t) return;
	const { warp, k } = m;
	const map: Warp =
		'src' in warp
			? rigidTps(warp.src, warp.dst, warp.cells, k)
			: (x, y) => [(x - warp.x0) * k, (y - warp.y0) * k];
	const xy = new Float32Array(t.strokes.reduce((s, st) => s + st.pts.length, 0));
	let p = 0;
	for (const s of t.strokes)
		for (let i = 0; i < s.pts.length; i += 2) {
			const [x, y] = map(s.pts[i] * t.W, s.pts[i + 1] * t.H);
			xy[p++] = x;
			xy[p++] = y;
		}
	const dotXY = new Float32Array(t.dots.length * 2);
	t.dots.forEach(([x, y], i) => dotXY.set(map(x * t.W, y * t.H), i * 2));

	const canvas = new OffscreenCanvas(Math.round(m.w * m.dpr), Math.round(m.h * m.dpr));
	const g = canvas.getContext('2d')!;
	g.setTransform(m.dpr, 0, 0, m.dpr, 0, 0);
	draw(g, t, xy, dotXY, k, m.boost);
	g.globalCompositeOperation = 'destination-out';
	if (m.feather > 0)
		for (const [from, to] of [
			[0, m.feather],
			[m.h, m.h - m.feather]
		]) {
			const grad = g.createLinearGradient(0, from, 0, to);
			grad.addColorStop(0, 'rgba(0,0,0,1)');
			grad.addColorStop(1, 'rgba(0,0,0,0)');
			g.fillStyle = grad;
			g.fillRect(0, Math.min(from, to), m.w, m.feather);
		}
	// Soft paper halo under every line of text: five growing rects at low alpha stack into a
	// feathered edge (canvas `filter` blur is not in Safari).
	g.fillStyle = 'rgba(0,0,0,0.4)';
	for (const [x, y, rw, rh] of m.halo)
		for (let e = 0; e < 5; e++) g.fillRect(x - 2 - e * 3, y - e * 2, rw + 4 + e * 6, rh + e * 4);
	const bitmap = canvas.transferToImageBitmap();
	const done: PlatePainted = { type: 'plate', id: m.id, bitmap, xy, dotXY };
	postMessage(done, { transfer: [bitmap, xy.buffer, dotXY.buffer] });
});
