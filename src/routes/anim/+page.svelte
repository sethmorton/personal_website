<script lang="ts">
	let { data } = $props();
	// Iframes only run while near the viewport, same as the post, so a page of
	// twenty canvases stays cheap.
	function lazy(node: HTMLIFrameElement, src: string) {
		const io = new IntersectionObserver(
			([e]) => {
				node.src = e.isIntersecting ? src : 'about:blank';
			},
			{ rootMargin: '200px 0px' }
		);
		io.observe(node);
		return { destroy: () => io.disconnect() };
	}
</script>

<svelte:head><title>Figures</title></svelte:head>

<main>
	<h1>Figures</h1>
	<p class="lede">
		Every page under <code>static/anim</code>. Bold names are registered in <code>ANIMS</code>,
		first one is the default chip.
	</p>
	{#each data.groups as { group, pages }}
		<section>
			<h2>{group}</h2>
			<div class="grid">
				{#each pages as { name, caption }}
					<figure>
						<div class="stage">
							<iframe use:lazy={`/anim/${group}/${name}.html`} title={name}></iframe>
						</div>
						<figcaption>
							<a href={`/anim/${group}/${name}.html`} target="_blank" class:reg={caption !== null}
								>{name}</a
							>
							{#if caption}<span>{caption}</span>{:else}<span class="un">unregistered</span>{/if}
						</figcaption>
					</figure>
				{/each}
			</div>
		</section>
	{/each}
</main>

<style>
	main {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem 1.5rem 5rem;
		background: var(--paper);
		color: var(--ink);
	}
	h1 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 2rem;
		margin: 0 0 0.4rem;
	}
	.lede {
		color: var(--muted);
		margin: 0 0 2.5rem;
		font-family: var(--font-ui);
	}
	h2 {
		font-family: var(--font-ui);
		font-size: 0.72rem;
		color: var(--muted);
		margin: 3rem 0 1rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 2rem 1.5rem;
	}
	figure {
		margin: 0;
	}
	.stage {
		aspect-ratio: 640 / 400;
		overflow: hidden;
		position: relative;
	}
	iframe {
		position: absolute;
		inset: 0;
		width: 640px;
		height: 400px;
		border: 0;
		transform-origin: top left;
		transform: scale(var(--s, 1));
	}
	.stage {
		container-type: inline-size;
	}
	@container (min-width: 0) {
		iframe {
			--s: calc(100cqw / 640);
		}
	}
	figcaption {
		margin-top: 0.6rem;
		font-size: 0.86rem;
		line-height: 1.45;
		color: var(--muted);
		font-family: var(--font-ui);
		font-style: italic;
	}
	figcaption a {
		font-family: var(--font-ui);
		font-style: normal;
		font-size: 0.7rem;
		color: var(--muted);
		text-decoration: none;
		margin-right: 0.6rem;
	}
	figcaption a.reg {
		color: var(--blue);
		font-weight: 600;
	}
	.un {
		color: var(--muted);
	}
</style>
