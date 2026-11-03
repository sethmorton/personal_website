// Removes tracer debris from src/lib/lab/trace.json in place: faint "halo" strokes that only
// hug a darker fibre (the reference illustration's soft glow, traced as extra strands) and
// islands of strokes and dots not connected to the drawing. Idempotent: a second run drops nothing.
// Run: node scripts/prune-trace.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = new URL('../src/lib/lab/trace.json', import.meta.url);
const HALO_INK = 0.55; // a halo has at most this fraction of its neighbour's ink
const HALO_COVER = 0.8; // ...along at least this fraction of its points
const MIN_COMPONENT = 30; // plate px of connected fibre below which a cluster is debris
const TOUCH = 1; // plate px of slack when deciding two strokes touch

const j = JSON.parse(readFileSync(FILE, 'utf8'));
const { q: Q, W, H } = j;

const strokes = j.strokes.map(([p, w, a]) => {
	const pts = [];
	for (let i = 0, x = 0, y = 0; i < p.length; i += 2) {
		x += p[i];
		y += p[i + 1];
		pts.push([(x / Q) * W, (y / Q) * H, w[i / 2] / 5, a[i / 2] / 50]);
	}
	let len = 0;
	for (let i = 1; i < pts.length; i++)
		len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
	return { pts, len, ink: pts.reduce((s, q) => s + q[3], 0) / pts.length };
});
const dots = j.dots.map((d) => [(d[0] / Q) * W, (d[1] / Q) * H, d[2] / 10]);

// Spatial grid of stroke points: [stroke, point] per cell.
const CELL = 6;
const grid = new Map();
const key = (cx, cy) => cx * 100000 + cy;
strokes.forEach((s, si) =>
	s.pts.forEach(([x, y], pi) => {
		const k = key(Math.floor(x / CELL), Math.floor(y / CELL));
		if (!grid.has(k)) grid.set(k, []);
		grid.get(k).push([si, pi]);
	})
);
function near(x, y, r, visit) {
	const n = Math.ceil(r / CELL),
		cx = Math.floor(x / CELL),
		cy = Math.floor(y / CELL);
	for (let i = -n; i <= n; i++)
		for (let k = -n; k <= n; k++) for (const e of grid.get(key(cx + i, cy + k)) ?? []) visit(e);
}

const halo = strokes.map((s, si) => {
	let hugged = 0;
	for (const q of s.pts) {
		let hit = false;
		near(q[0], q[1], 12, ([sj, pj]) => {
			if (hit || sj === si) return;
			const o = strokes[sj].pts[pj];
			if (o[3] * HALO_INK < q[3] || strokes[sj].ink * HALO_INK < s.ink) return;
			hit = Math.hypot(o[0] - q[0], o[1] - q[1]) <= (o[2] + q[2]) / 2 + TOUCH;
		});
		if (hit) hugged++;
	}
	return hugged >= HALO_COVER * s.pts.length;
});

// Union-find over the remaining strokes, then dots, by touch.
const parent = Array.from({ length: strokes.length + dots.length }, (_, i) => i);
function find(i) {
	while (parent[i] !== i) i = parent[i] = parent[parent[i]];
	return i;
}
strokes.forEach((s, si) => {
	if (halo[si]) return;
	for (const q of s.pts)
		near(q[0], q[1], 8, ([sj, pj]) => {
			if (sj === si || halo[sj]) return;
			const o = strokes[sj].pts[pj];
			if (Math.hypot(o[0] - q[0], o[1] - q[1]) <= (o[2] + q[2]) / 2 + TOUCH)
				parent[find(si)] = find(sj);
		});
});
dots.forEach(([x, y, r], di) =>
	near(x, y, r + 8, ([sj, pj]) => {
		if (halo[sj]) return;
		const o = strokes[sj].pts[pj];
		if (Math.hypot(o[0] - x, o[1] - y) <= r + o[2] / 2 + TOUCH)
			parent[find(strokes.length + di)] = find(sj);
	})
);
const size = new Map();
strokes.forEach((s, si) => {
	if (!halo[si]) size.set(find(si), (size.get(find(si)) ?? 0) + s.len);
});
const kept = (i) => (size.get(find(i)) ?? 0) >= MIN_COMPONENT;

const before = [j.strokes.length, j.dots.length];
j.strokes = j.strokes.filter((_, si) => !halo[si] && kept(si));
j.dots = j.dots.filter((_, di) => kept(strokes.length + di));
writeFileSync(FILE, JSON.stringify(j));
console.log(`strokes ${before[0]} -> ${j.strokes.length}, dots ${before[1]} -> ${j.dots.length}`);
