<script lang="ts">
	// Pen-and-ink cursor for mice, drawn in the plate's own ink: a small blot that spreads when
	// pressed, a serifed caret the height of the line under it over text, and the portrait's pen
	// loop drawn around links. It follows the pointer exactly (no easing), and the native
	// cursor is hidden only while it is mounted.
	import { onMount } from 'svelte';

	let el: HTMLDivElement;

	/** Height of the rendered text line under (x, y), or 0 if the point is not on text. */
	const lineAt = (x: number, y: number) => {
		const pos = document.caretPositionFromPoint?.(x, y);
		const node = pos ? pos.offsetNode : document.caretRangeFromPoint?.(x, y)?.startContainer;
		if (node?.nodeType !== Node.TEXT_NODE) return 0;
		const range = document.createRange();
		range.selectNodeContents(node);
		for (const r of range.getClientRects())
			if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return r.height;
		return 0;
	};

	onMount(() => {
		if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
		const root = document.documentElement;
		const move = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') return;
			root.classList.add('ink-cursor');
			el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
			const link = (e.target as Element).closest('a, button');
			const h = link ? 0 : lineAt(e.clientX, e.clientY);
			el.dataset.mode = link ? 'link' : h ? 'text' : 'dot';
			if (h) el.style.setProperty('--h', `${h}px`);
			el.dataset.on = '';
		};
		const hide = () => delete el.dataset.on;
		const down = () => (el.dataset.down = '');
		const up = () => delete el.dataset.down;
		addEventListener('pointermove', move, { passive: true });
		addEventListener('pointerdown', down);
		addEventListener('pointerup', up);
		root.addEventListener('mouseleave', hide);
		return () => {
			root.classList.remove('ink-cursor');
			removeEventListener('pointermove', move);
			removeEventListener('pointerdown', down);
			removeEventListener('pointerup', up);
			root.removeEventListener('mouseleave', hide);
		};
	});
</script>

<div class="cursor" bind:this={el} aria-hidden="true">
	<span class="blot"></span>
	<span class="caret"></span>
	<svg class="loop" viewBox="0 0 100 100"
		><path
			pathLength="1"
			d="M78 14C62 2 24 4 9 30-4 54 10 88 44 95 74 101 97 80 96 50 95 26 80 10 56 7"
		/></svg
	>
</div>

<style>
	/* !important: links set their own cursor and would otherwise show through. */
	:global(html.ink-cursor),
	:global(html.ink-cursor *) {
		cursor: none !important;
	}
	.cursor {
		/* The plate's full-coverage ink (trace.json pal), so the cursor reads as part of the drawing. */
		--c: rgb(0 53 102);
		/* A bracketed serif, as a mask so it takes --c. */
		--serif: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 4'%3E%3Cpath d='M.6 .8Q3.6 .8 5 3.6 6.4 .8 9.4 .8' fill='none' stroke='%23000' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E");
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		pointer-events: none;
		opacity: 0;
		/* The same soft paper halo the plate keeps around text, so the ink stays legible over ink. */
		filter: drop-shadow(0 0 1.5px var(--paper));
		transition: opacity 150ms;
	}
	/* Attributes are set from script, so Svelte cannot see them: :global keeps these rules. */
	.cursor:global([data-on]) {
		opacity: 1;
	}
	.cursor > * {
		position: absolute;
		translate: -50% -50%;
		opacity: 0;
		transition:
			opacity 90ms,
			scale 140ms ease-out;
	}
	.blot {
		width: 9px;
		height: 9px;
		border-radius: 54% 46% 58% 42% / 48% 56% 44% 52%;
		background: var(--c);
	}
	.caret {
		width: 9px;
		height: var(--h);
		background: linear-gradient(var(--c), var(--c)) center / 1.3px calc(100% - 5px) no-repeat;
	}
	.caret::before,
	.caret::after {
		content: '';
		position: absolute;
		left: 0;
		width: 9px;
		height: 4px;
		background: var(--c);
		mask: var(--serif) 0 0 / 100% 100%;
	}
	.caret::before {
		top: 0;
	}
	.caret::after {
		bottom: 0;
		scale: 1 -1;
	}
	.loop {
		width: 36px;
		height: 36px;
		overflow: visible;
		fill: none;
		stroke: var(--blue);
		stroke-width: 1.4px;
		stroke-linecap: round;
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		transition:
			opacity 90ms,
			stroke-dashoffset 120ms ease-in,
			scale 140ms ease-out;
	}
	.loop path {
		vector-effect: non-scaling-stroke;
	}
	.cursor:not(:global([data-mode])) .blot,
	.cursor:global([data-mode='dot']) .blot,
	.cursor:global([data-mode='text']) .caret,
	.cursor:global([data-mode='link']) .loop {
		opacity: 1;
	}
	/* Over a link the pen circles it, like the portrait. */
	.cursor:global([data-mode='link']) .loop {
		stroke-dashoffset: 0;
		transition:
			opacity 90ms,
			stroke-dashoffset 300ms cubic-bezier(0.6, 0, 0.2, 1),
			scale 140ms ease-out;
	}
	/* Pressing the pen spreads the ink. */
	.cursor:global([data-down]) .blot {
		scale: 1.4;
	}
	.cursor:global([data-down]) .loop {
		scale: 0.9;
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor > *,
		.cursor:global([data-mode]) .loop {
			transition: none;
		}
	}
</style>
