// Renderer and warp for the traced neuron plate (src/lib/lab/trace.json, built from the
// reference illustration by /tmp/inktrace/trace.py). Strokes are centerlines with per-point
// width and ink level; a thin-plate spline bends the plate onto the live page layout.

/**
 * Per point: `c` cell (0 main soma, 1 lower-left, 2 top-right, 3 bottom-right, -1 none),
 * `d` distance along the fibres from that cell's soma in plate px (-1 none), `b` the axon
 * terminal it leads to (0..4 top to bottom, 5 other main-cell fibre, -1 not main cell).
 */
export type Stroke = {
	pts: number[];
	w: number[];
	a: number[];
	c: Int8Array;
	d: Int16Array;
	b: Int8Array;
};
/** Plate coordinates are 0..1; `pal` is the plate's RGB at each ink-coverage step. Dots are [x, y, r, a, c, d, b]. */
export type Trace = {
	W: number;
	H: number;
	bg: number[];
	pal: number[][];
	strokes: Stroke[];
	dots: number[][];
	branches: number[][][];
};
/** Plate coordinates in, canvas px out. */
export type Warp = (x: number, y: number) => [number, number];

/** A per-stroke field stored as one int when constant along the stroke. */
type Field = number | number[];
/**
 * File form: coords delta-coded ints over q, w in 0.2px, a in 1/50, d whole px delta-coded;
 * strokes [pts, w, a, c, d, b], dots [x, y, r*10, a*100, c, d, b].
 */
export type Packed = Omit<Trace, 'strokes' | 'dots' | 'branches'> & {
	q: number;
	strokes: [number[], number[], number[], Field, number[], Field][];
	dots: number[][];
	branches: number[][][];
};

export function decode(j: Packed): Trace {
	const Q = j.q;
	const undelta = (d: number[]) => {
		const o = new Array<number>(d.length);
		let x = 0,
			y = 0;
		for (let i = 0; i < d.length; i += 2) {
			x += d[i];
			y += d[i + 1];
			o[i] = x / Q;
			o[i + 1] = y / Q;
		}
		return o;
	};
	return {
		...j,
		strokes: j.strokes.map(([p, w, a, c, d, b]) => {
			const dist = new Int16Array(w.length);
			for (let i = 0, v = 0; i < w.length; i++) dist[i] = v += d[i];
			return {
				pts: undelta(p),
				w: w.map((v) => v / 5),
				a: a.map((v) => v / 50),
				c: Int8Array.from(Array.isArray(c) ? c : new Array<number>(w.length).fill(c)),
				d: dist,
				b: Int8Array.from(Array.isArray(b) ? b : new Array<number>(w.length).fill(b))
			};
		}),
		dots: j.dots.map((d) => [d[0] / Q, d[1] / Q, d[2] / 10, d[3] / 100, d[4], d[5], d[6]]),
		branches: j.branches.map((b) => b.map(undelta))
	};
}

/** The plate's own ink colour at coverage `a` (0 paper .. 1 full ink). */
export function inkColor(pal: number[][], a: number) {
	const n = pal.length - 1,
		f = Math.min(Math.max(a, 0), 1) * n,
		i = Math.min(f | 0, n - 1),
		u = f - i;
	const c = (j: number) => (pal[i][j] + (pal[i + 1][j] - pal[i][j]) * u) | 0;
	return `rgb(${c(0)},${c(1)},${c(2)})`;
}

/**
 * Draws every segment with its own width and ink, composited with 'darken' so joints never
 * bead. `xy` holds every stroke point already warped to canvas px (strokes concatenated),
 * `dotXY` the dots; `k` is canvas px per plate px. `boost[b]` thickens main-cell fibres
 * leading to terminal b (learned paths); 1 leaves them as traced.
 */
export function draw(
	ctx: OffscreenCanvasRenderingContext2D,
	t: Trace,
	xy: Float32Array,
	dotXY: Float32Array,
	k: number,
	boost: number[]
) {
	ctx.save();
	ctx.globalCompositeOperation = 'darken';
	ctx.lineCap = 'round';
	let p = 0;
	for (const s of t.strokes) {
		for (let i = 1; i < s.w.length; i++) {
			const g = s.c[i] === 0 && s.b[i] >= 0 ? boost[s.b[i]] : 1;
			const w = ((s.w[i - 1] + s.w[i]) / 2) * k * g,
				a = Math.min(1, ((s.a[i - 1] + s.a[i]) / 2) * (0.6 + 0.4 * g));
			// Sub-pixel strands keep their ink mass (width × alpha) but never go below 0.7px.
			const lw = Math.max(w, 0.7);
			ctx.strokeStyle = inkColor(t.pal, Math.min(1, (a * w) / lw));
			ctx.lineWidth = lw;
			ctx.beginPath();
			ctx.moveTo(xy[p + 2 * i - 2], xy[p + 2 * i - 1]);
			ctx.lineTo(xy[p + 2 * i], xy[p + 2 * i + 1]);
			ctx.stroke();
		}
		p += s.pts.length;
	}
	t.dots.forEach(([, , r, a], i) => {
		ctx.fillStyle = inkColor(t.pal, a);
		ctx.beginPath();
		ctx.arc(dotXY[2 * i], dotXY[2 * i + 1], r * k, 0, Math.PI * 2);
		ctx.fill();
	});
	ctx.restore();
}

/** Thin-plate spline (Bookstein 1989): exact at the anchors, minimal bending elsewhere. */
export function tps(src: number[][], dst: number[][]): Warp {
	const n = src.length,
		N = n + 3;
	const U = (r2: number) => (r2 === 0 ? 0 : r2 * Math.log(r2));
	const M: number[][] = Array.from({ length: N }, () => new Array<number>(N).fill(0));
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++)
			M[i][j] = U((src[i][0] - src[j][0]) ** 2 + (src[i][1] - src[j][1]) ** 2);
		M[i][n] = M[n][i] = 1;
		M[i][n + 1] = M[n + 1][i] = src[i][0];
		M[i][n + 2] = M[n + 2][i] = src[i][1];
	}
	// Gaussian elimination with partial pivoting.
	const solve = (b: number[]) => {
		const A = M.map((r, i) => [...r, b[i]]);
		for (let c = 0; c < N; c++) {
			let p = c;
			for (let r = c + 1; r < N; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
			[A[c], A[p]] = [A[p], A[c]];
			for (let r = 0; r < N; r++) {
				if (r === c) continue;
				const f = A[r][c] / A[c][c];
				for (let k = c; k <= N; k++) A[r][k] -= f * A[c][k];
			}
		}
		return A.map((r, i) => r[N] / r[i]);
	};
	const wx = solve([...dst.map((d) => d[0]), 0, 0, 0]),
		wy = solve([...dst.map((d) => d[1]), 0, 0, 0]);
	return (x, y) => {
		let X = wx[n] + wx[n + 1] * x + wx[n + 2] * y,
			Y = wy[n] + wy[n + 1] * x + wy[n + 2] * y;
		for (let i = 0; i < n; i++) {
			const u = U((x - src[i][0]) ** 2 + (y - src[i][1]) ** 2);
			X += wx[i] * u;
			Y += wy[i] * u;
		}
		return [X, Y];
	};
}

/**
 * TPS where each listed cell ([x, y, radius] in src units) moves as a rigid similarity with
 * scale k to where the plain warp sends its centre: somata stay round and arbors keep their
 * proportions, so only the space between cells stretches.
 */
export function rigidTps(src: number[][], dst: number[][], cells: number[][], k: number): Warp {
	const base = tps(src, dst),
		s = [...src],
		d = [...dst];
	for (const [cx, cy, r] of cells) {
		const [X, Y] = base(cx, cy);
		for (let a = 0; a < 6; a++) {
			const c = Math.cos((a * Math.PI) / 3) * r,
				sn = Math.sin((a * Math.PI) / 3) * r;
			s.push([cx + c, cy + sn]);
			d.push([X + c * k, Y + sn * k]);
		}
	}
	return tps(s, d);
}
