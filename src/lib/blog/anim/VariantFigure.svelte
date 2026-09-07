<script lang="ts">
	import { onMount } from 'svelte';
	import { ANIMS } from './index';
	import { figureVideos, figurePosters } from './media';
	let { group }: { group: string } = $props();
	const [category, preferred] = $derived(group.split('/'));
	const variants = $derived(ANIMS[category]);
	const current = $derived(variants.find((v) => v.name === preferred) ?? variants[0]);
	let video = $state<HTMLVideoElement>();
	let visible = $state(false);
	let loaded = $state(false);
	let paused = $state(true);

	onMount(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		paused = motion.matches;
		const update = () => {
			paused = motion.matches;
		};
		motion.addEventListener('change', update);
		return () => motion.removeEventListener('change', update);
	});

	function observe(node: HTMLElement) {
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) loaded = true;
		});
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	$effect(() => {
		current;
		if (!video) return;
		if (visible && !paused)
			video.play().catch((error: DOMException) => {
				if (error.name !== 'AbortError') paused = true;
			});
		else video.pause();
	});
</script>

<figure class="anim">
	<div class="stage" use:observe>
		{#key current.name}
			<video
				bind:this={video}
				src={loaded ? figureVideos[`./media/${category}/${current.name}.mp4`] : undefined}
				poster={loaded ? figurePosters[`./media/${category}/${current.name}.png`] : undefined}
				aria-label={current.caption}
				width="640"
				height="400"
				muted
				loop
				playsinline
				preload="none"
			></video>
		{/key}
	</div>
	<button class="motion-control" onclick={() => (paused = !paused)}>
		{paused ? 'Play animation' : 'Pause animation'}
	</button>
	<figcaption>{current.caption}</figcaption>
</figure>

<style>
	.anim {
		margin: 2.4rem 0 2.6rem;
	}
	.stage {
		width: 100%;
		aspect-ratio: 640 / 400;
	}
	video {
		display: block;
		width: 100%;
		height: 100%;
	}
	.motion-control {
		display: block;
		margin: 0 auto;
		min-height: 44px;
		padding: 8px 12px;
		font: var(--text-meta) / 1.4 var(--font-ui);
		color: var(--blue);
	}
	figcaption {
		margin-top: 0.85rem;
		text-align: center;
		font-family: var(--font-ui);
		font-size: 0.92rem;
		line-height: 1.45;
		color: var(--muted);
	}
</style>
