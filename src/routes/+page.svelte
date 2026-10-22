<script lang="ts">
	import { onMount } from 'svelte';
	import SEO from '$lib/blog/components/SEO.svelte';
	import Bio from '$lib/lab/Bio.svelte';
	import { selectedWriting, socialLinks } from '$lib/data/writing';
	import { mountInk } from '$lib/lab/inkNeurons';

	const RELATED = [[1, 3], [0, 3], [4], [0, 1], [2]];
	let home: HTMLElement;
	let base: HTMLCanvasElement;
	let overlay: HTMLCanvasElement;
	let ink: ReturnType<typeof mountInk> | undefined;

	const essayHover = (e: PointerEvent | FocusEvent, on: boolean) => {
		const li = (e.target as Element).closest<HTMLElement>('[data-essay]');
		if (!li || li.contains(e.relatedTarget as Node | null)) return;
		ink?.hover(Number(li.dataset.essay), on);
	};
	const enter = (e: PointerEvent | FocusEvent) => essayHover(e, true);
	const leave = (e: PointerEvent | FocusEvent) => essayHover(e, false);
	onMount(() => {
		ink = mountInk({ home, base, overlay, related: RELATED });
		return () => ink?.destroy();
	});
</script>

<SEO
	title="Seth Morton"
	description="Seth Morton — founder and engineer exploring AI, biology, continual learning, and thermodynamic computation. Essays, projects, and research."
	type="website"
	twitterCard="summary_large_image"
/>

<main class="home" bind:this={home}>
	<canvas bind:this={base} class="ink" aria-hidden="true"></canvas>
	<canvas bind:this={overlay} class="ink" aria-hidden="true"></canvas>
	<div class="content">
		<section class="intro" data-intro aria-labelledby="name">
			<header>
				<img class="portrait" src="/seth_image.jpg" alt="" width="56" height="56" />
				<h1 id="name" data-text>Seth Morton</h1>
			</header>
			<div class="bio" data-text><Bio /></div>
			<footer data-text>
				{#each socialLinks as link}
					<a href={link.href} target="_blank" rel="noopener noreferrer"
						><span class="pen-link">{link.label}</span></a
					>
				{/each}
			</footer>
		</section>

		<section class="writing" aria-labelledby="writing-label">
			<div class="writing-heading" data-text>
				<h2 id="writing-label">Selected writing</h2>
				<a href="/blog"
					><span class="pen-link"
						>All writing <span class="outbound" aria-hidden="true">↗</span></span
					></a
				>
			</div>
			<ul onpointerover={enter} onpointerout={leave} onfocusin={enter} onfocusout={leave}>
				{#each selectedWriting as post, i}
					<li data-essay={i}>
						<a href={post.href} data-text onclick={() => ink?.visit(i)}>
							<span class="essay-title" data-title
								><span class="title-words">{post.title}</span></span
							>
							<span class="essay-description">{post.description}</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>

<style>
	.home {
		position: relative;
		height: 100svh;
		overflow: hidden;
		color: var(--ink);
		/* A small uneven stroke, not a glow or a shadow. Shared by every link. */
		--pen: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='7' viewBox='0 0 160 7' preserveAspectRatio='none'%3E%3Cpath d='M1 5 Q46 2 83 4 T159 3' fill='none' stroke='%2328617a' stroke-width='1.3' stroke-linecap='round'/%3E%3C/svg%3E");
	}
	.ink {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.content {
		position: relative;
		height: 100%;
		max-width: 160svh;
		margin: 0 auto;
		container-type: inline-size;
	}
	.intro {
		position: absolute;
		left: 5%;
		top: 9%;
		width: 32%;
	}
	header {
		display: flex;
		align-items: flex-end;
		gap: clamp(14px, 1.3cqw, 48px);
		margin-bottom: clamp(24px, 2.5cqw, 80px);
	}
	.portrait {
		width: clamp(48px, 4.2cqw, 160px);
		height: clamp(48px, 4.2cqw, 160px);
		margin-bottom: 0.3cqw;
		border-radius: 50%;
		object-fit: cover;
	}
	/* One line: sized so name plus portrait fit the bio column at every width. */
	h1 {
		font: 400 clamp(48px, 4.7cqw, 172px) / 0.91 var(--font-display);
		letter-spacing: -0.045em;
		white-space: nowrap;
	}
	.bio {
		font: 400 clamp(15px, 1.13cqw, 44px) / 1.6 var(--font-body);
	}
	.bio :global(p + p) {
		margin-top: 1em;
	}
	.bio :global(p:first-child)::first-line {
		font-weight: 450;
	}
	.home :global(a) {
		color: var(--blue);
		cursor: pointer;
		touch-action: manipulation;
		-webkit-tap-highlight-color: rgb(40 97 122 / 12%);
		text-decoration: none;
	}
	.bio :global(a),
	.pen-link {
		background: var(--pen) no-repeat left bottom / 30% 5px;
		padding-bottom: 4px;
		font-variation-settings:
			'wght' 400,
			'opsz' 16;
		transition:
			background-size 180ms ease-out,
			font-variation-settings 180ms ease-out;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}
	.bio :global(a) {
		background-size: 100% 4px;
	}
	.bio :global(a:is(:hover, :focus-visible, :active)),
	footer a:is(:hover, :focus-visible, :active) .pen-link,
	.writing-heading a:is(:hover, :focus-visible, :active) .pen-link {
		background-size: 100% 6px;
		font-variation-settings:
			'wght' 450,
			'opsz' 18;
	}
	footer {
		display: flex;
		gap: 1.65em;
		margin-top: clamp(10px, 0.75cqw, 28px);
		font: 400 clamp(16px, 1.18cqw, 44px) / 1.5 var(--font-body);
	}
	footer a {
		display: inline-flex;
		align-items: center;
		min-height: 36px;
	}
	.writing {
		position: absolute;
		left: 61%;
		top: 9%;
		bottom: 13%;
		width: 32%;
		display: flex;
		flex-direction: column;
	}
	.writing-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: clamp(22px, 2.4cqw, 80px);
	}
	h2 {
		color: color-mix(in srgb, var(--ink) 65%, var(--paper));
		font: italic 400 clamp(15px, 1.08cqw, 40px) / 1.4 var(--font-body);
	}
	.writing-heading a {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		font: 400 clamp(13px, 0.9cqw, 34px) / 1.4 var(--font-body);
	}
	.outbound {
		display: inline-block;
		margin-left: 0.2em;
	}
	ul {
		flex: 1;
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	li a {
		display: block;
		padding: 6px 0 6px 32px;
		margin: -6px 0 -6px -32px;
	}
	.essay-title {
		position: relative;
		display: block;
		font: 400 clamp(18px, 1.55cqw, 58px) / 1.25 var(--font-body);
		font-variation-settings:
			'wght' calc(400 + var(--lit, 0) * 55),
			'opsz' 36;
		letter-spacing: -0.035em;
		color: color-mix(in srgb, var(--ink) calc(var(--lit, 0) * 100%), var(--blue));
	}
	/* This ring surrounds the existing canvas terminal, centered exactly 20px left. */
	.essay-title::before {
		content: '';
		position: absolute;
		box-sizing: border-box;
		left: -27px;
		top: calc(50% - 7px);
		width: 14px;
		height: 14px;
		border: 1px solid var(--blue);
		border-radius: 48% 52% 46% 54%;
		opacity: calc(0.2 + var(--lit, 0) * 0.8);
		transform: scale(calc(0.8 + var(--lit, 0) * 0.2));
	}
	.title-words {
		padding-bottom: 4px;
		background: var(--pen) no-repeat left bottom / calc(var(--lit, 0) * 100%) 7px;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
		transition: background-size 180ms ease-out;
	}
	li a:is(:hover, :focus-visible, :active) .title-words {
		background-size: 100% 7px;
	}
	li a:is(:focus-visible, :active) .essay-title {
		color: var(--ink);
	}
	.essay-description {
		display: block;
		margin-top: 0.6em;
		font: 400 clamp(12px, 0.85cqw, 31px) / 1.5 var(--font-ui);
		color: color-mix(in srgb, var(--ink) 70%, var(--paper));
	}
	.home :global(a:focus-visible) {
		outline: 2px solid var(--blue);
		outline-offset: 5px;
		border-radius: 2px;
	}
	@media (min-width: 761px) and (max-height: 780px) {
		.intro {
			top: 8%;
		}
		.writing {
			top: 8%;
			bottom: 8%;
		}
		.writing-heading {
			margin-bottom: 20px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.home :global(a),
		.pen-link,
		.title-words {
			transition: none;
		}
	}
	/* The mobile canvases share an in-flow figure row, not a layer behind the copy. */
	@media (max-width: 760px) {
		.home {
			display: grid;
			grid-template-areas: 'intro' 'art' 'list';
			align-content: start;
			height: auto;
			min-height: 100svh;
			padding: 32px 0 56px;
		}
		.content {
			display: contents;
		}
		.ink {
			grid-area: art;
			position: relative;
			height: auto;
			aspect-ratio: 1 / 0.7233;
		}
		.intro,
		.writing {
			position: static;
			width: auto;
			margin: 0 24px;
		}
		.intro {
			grid-area: intro;
		}
		.writing {
			grid-area: list;
		}
		header {
			align-items: flex-end;
			gap: 18px;
			margin-bottom: 26px;
		}
		h1 {
			font-size: clamp(40px, 12.5vw, 64px);
		}
		.portrait {
			margin-bottom: 4px;
		}
		.bio {
			font-size: 16px;
		}
		footer {
			margin-top: 10px;
			gap: 30px;
		}
		footer a {
			min-height: 44px;
		}
		.writing-heading {
			margin-bottom: 28px;
		}
		.writing-heading a {
			min-height: 36px;
		}
		h2 {
			font-size: 16px;
		}
		ul {
			gap: 32px;
		}
		li a {
			padding-left: 0;
			margin-left: 0;
		}
		.essay-title {
			font-size: 22px;
		}
		.essay-title::before {
			display: none;
		}
		.essay-description {
			font-size: 13px;
		}
	}
</style>
