<script lang="ts">
	// "Everywhere they pointed it, the ear picked up a loud hiss."
	// Behind the horn: the pointer sweeps up static. Until the reader reaches the
	// [data-hiss-reveal] paragraph it stays static; after that, lingering settles
	// it into Planck's all-sky CMB map. Both fade when the pointer leaves.
	let canvas: HTMLCanvasElement;

	const SCALE = 1; // canvas px per CSS px
	const RADIUS = 90; // brush radius, CSS px
	const FADE_MS = 900; // static decay time constant
	const SIGNAL_FADE_MS = 2400; // the map lingers longer than the static
	const SETTLE_PER_SEC = 4; // dwell alpha/sec added to the "signal" mask
	const COLD = [96, 124, 160]; // hero duotone blue
	const MAP = '/blog/planck_cmb.jpg'; // ESA/Planck Collaboration, 2018 all-sky CMB map
	const OVAL = 0.86; // map height as a fraction of the sky's height

	function layer(w: number, h: number) {
		const c = document.createElement('canvas');
		c.width = w;
		c.height = h;
		return { c, g: c.getContext('2d')! };
	}

	function paintStatic(g: CanvasRenderingContext2D, size: number) {
		const img = g.createImageData(size, size);
		for (let i = 0; i < size * size; i++) {
			img.data[i * 4] = COLD[0] - 40;
			img.data[i * 4 + 1] = COLD[1] - 40;
			img.data[i * 4 + 2] = COLD[2] - 30;
			img.data[i * 4 + 3] = Math.random() ** 3 * 230;
		}
		g.putImageData(img, 0, 0);
	}

	$effect(() => {
		if (
			!matchMedia('(hover: hover) and (pointer: fine)').matches ||
			matchMedia('(prefers-reduced-motion: reduce)').matches
		)
			return;
		const ctx = canvas.getContext('2d')!;
		let w = 0;
		let h = 0;
		let seen = layer(1, 1);
		let settled = layer(1, 1);
		let signal = layer(1, 1);
		let scratch = layer(1, 1);
		const grain = layer(128, 128);
		paintStatic(grain.g, 128);
		const grainPattern = ctx.createPattern(grain.c, 'repeat')!;

		// The map is fetched only once the reader reaches the reveal.
		let map: HTMLImageElement | null = null;
		const paintSignal = () => {
			signal.g.clearRect(0, 0, w, h);
			if (!map) return;
			const oh = h * OVAL;
			const ow = oh * 2; // Mollweide is exactly 2:1
			const x = (w - ow) / 2;
			const y = (h - oh) / 2;
			signal.g.save();
			signal.g.beginPath();
			// Inset past the JPEG's dark rim so no outline shows.
			signal.g.ellipse(w / 2, h / 2, (ow / 2) * 0.975, (oh / 2) * 0.96, 0, 0, Math.PI * 2);
			signal.g.clip();
			signal.g.drawImage(map, x, y, ow, oh);
			signal.g.restore();
		};
		const reveal = document.querySelector('[data-hiss-reveal]');
		const io = new IntersectionObserver((entries) => {
			if (!entries.some((e) => e.isIntersecting)) return;
			io.disconnect();
			const img = new Image();
			img.onload = () => {
				map = img;
				paintSignal();
			};
			img.src = MAP;
		});
		if (reveal) io.observe(reveal);

		const resize = () => {
			const r = canvas.getBoundingClientRect();
			w = Math.max(1, Math.round(r.width * SCALE));
			h = Math.max(1, Math.round(r.height * SCALE));
			canvas.width = w;
			canvas.height = h;
			[seen, settled, signal, scratch] = [layer(w, h), layer(w, h), layer(w, h), layer(w, h)];
			paintSignal();
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		const brush = (g: CanvasRenderingContext2D, x: number, y: number, alpha: number) => {
			const r = RADIUS * SCALE;
			const grad = g.createRadialGradient(x, y, 0, x, y, r);
			grad.addColorStop(0, `rgba(0,0,0,${alpha})`);
			grad.addColorStop(1, 'rgba(0,0,0,0)');
			g.fillStyle = grad;
			g.fillRect(x - r, y - r, r * 2, r * 2);
		};

		let pointer: { x: number; y: number } | null = null;
		let last: { x: number; y: number } | null = null;
		let lastInput = 0;
		let raf = 0;
		let prev = 0;

		const frame = (now: number) => {
			const dt = Math.min(64, now - (prev || now));
			prev = now;
			for (const [m, tau] of [
				[seen, FADE_MS],
				[settled, SIGNAL_FADE_MS]
			] as const) {
				m.g.globalCompositeOperation = 'destination-out';
				m.g.fillStyle = `rgba(0,0,0,${1 - Math.exp(-dt / tau)})`;
				m.g.fillRect(0, 0, w, h);
				m.g.globalCompositeOperation = 'source-over';
			}
			if (pointer) {
				brush(seen.g, pointer.x, pointer.y, 0.35);
				if (map)
					brush(settled.g, pointer.x, pointer.y, Math.min(1, (SETTLE_PER_SEC * dt) / 1000) * 2);
			}

			// Signal where it settled (only inside the map's oval).
			scratch.g.globalCompositeOperation = 'source-over';
			scratch.g.clearRect(0, 0, w, h);
			scratch.g.drawImage(signal.c, 0, 0);
			scratch.g.globalCompositeOperation = 'destination-in';
			scratch.g.drawImage(settled.c, 0, 0);

			// Static where the pointer has been, minus wherever signal replaced it.
			ctx.globalCompositeOperation = 'source-over';
			ctx.clearRect(0, 0, w, h);
			ctx.save();
			ctx.translate((Math.random() * 128) | 0, (Math.random() * 128) | 0);
			ctx.fillStyle = grainPattern;
			ctx.fillRect(-128, -128, w + 128, h + 128);
			ctx.restore();
			ctx.globalCompositeOperation = 'destination-in';
			ctx.drawImage(seen.c, 0, 0);
			ctx.globalCompositeOperation = 'destination-out';
			ctx.drawImage(scratch.c, 0, 0);
			ctx.globalCompositeOperation = 'source-over';
			ctx.drawImage(scratch.c, 0, 0);

			// 8-bit destination-out never quite reaches zero; hard-clear once idle.
			if (!pointer && now - lastInput > SIGNAL_FADE_MS * 4) {
				seen.g.clearRect(0, 0, w, h);
				settled.g.clearRect(0, 0, w, h);
				ctx.clearRect(0, 0, w, h);
				raf = 0;
				prev = 0;
				return;
			}
			raf = requestAnimationFrame(frame);
		};

		const onMove = (e: PointerEvent) => {
			const r = canvas.getBoundingClientRect();
			const inside =
				e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
			lastInput = performance.now();
			if (!inside) {
				pointer = last = null;
				return;
			}
			const p = { x: (e.clientX - r.left) * SCALE, y: (e.clientY - r.top) * SCALE };
			// Stamp along the path so fast sweeps leave a continuous trail.
			if (last) {
				const d = Math.hypot(p.x - last.x, p.y - last.y);
				const step = RADIUS * SCALE * 0.35;
				for (let s = step; s < d; s += step)
					brush(seen.g, last.x + ((p.x - last.x) * s) / d, last.y + ((p.y - last.y) * s) / d, 0.3);
			}
			pointer = last = p;
			if (!raf) raf = requestAnimationFrame(frame);
		};
		const onLeave = () => {
			pointer = last = null;
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		document.documentElement.addEventListener('pointerleave', onLeave);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			window.removeEventListener('pointermove', onMove);
			document.documentElement.removeEventListener('pointerleave', onLeave);
		};
	});
</script>

<canvas bind:this={canvas} class="hiss" aria-hidden="true"></canvas>

<style>
	.hiss {
		position: absolute;
		left: -45%;
		top: -56px;
		width: 190%;
		height: calc(100% + 112px);
		pointer-events: none;
		/* Soft elliptical sky so the field never shows a rectangular edge. */
		mask-image: radial-gradient(closest-side, #000 55%, transparent);
	}
</style>
