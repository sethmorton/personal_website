<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import BlogPost from '$lib/blog/components/BlogPost.svelte';
	import SEO from '$lib/blog/components/SEO.svelte';
	import content from '$lib/blog/content/aligned_acceleration.txt?raw';

	let article: HTMLDivElement;
	let headings = $state<{ id: string; label: string; level: string }[]>([]);
	let current = $state('introduction');
	let expanded = $state(true);
	const editUrl =
		'https://github.com/sethmorton/personal_website/edit/draft/aligned-acceleration/src/lib/blog/content/aligned_acceleration.txt';

	onMount(() => {
		expanded = window.matchMedia('(min-width: 1000px)').matches;
		const elements = Array.from(article.querySelectorAll<HTMLElement>('h1, h2, h3'));
		headings = elements.map((element, index) => {
			const label = element.textContent?.trim() ?? '';
			element.id = index === 0 ? 'introduction' : `section-${index}`;
			return {
				id: element.id,
				label: index === 0 ? 'Introduction' : label,
				level: element.tagName
			};
		});
		function update() {
			current = elements[0]?.id ?? 'introduction';
			for (const element of elements) {
				if (element.getBoundingClientRect().top <= 120) current = element.id;
			}
		}
		const target = elements.find((element) => `#${element.id}` === window.location.hash);
		target?.scrollIntoView();
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});
</script>

<SEO
	title="Aligned Acceleration (Draft)"
	description="Technological progress that gives people greater command over their own lives."
	type="article"
	robots="noindex, nofollow"
/>

<div class="draft-tools">
	<span>Draft. Citations not yet verified.</span>
	<a href={editUrl} target="_blank" rel="noopener noreferrer">Edit draft in GitHub</a>
</div>
<div class="reading-layout">
	<aside>
		<details bind:open={expanded}>
			<summary>Contents</summary>
			<nav aria-label="Article contents">
				{#each headings as heading}
					<a
						href={`#${heading.id}`}
						class:subsection={heading.level === 'H3'}
						aria-current={current === heading.id ? 'location' : undefined}>{heading.label}</a
					>
				{/each}
			</nav>
		</details>
	</aside>
	<div class="article" bind:this={article}>
		<BlogPost
			{content}
			title="Aligned Acceleration"
			publishDate="Draft, September 2026"
			onClose={() => goto('/blog')}
		/>
	</div>
</div>

<style>
	.draft-tools {
		max-width: 1100px;
		margin: 0 auto;
		padding: 24px 24px 0;
		display: flex;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
		color: var(--muted);
		font: var(--text-ui) / 1.5 var(--font-ui);
	}
	.draft-tools a {
		color: var(--blue);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.reading-layout {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 24px;
		display: grid;
		grid-template-columns: 240px minmax(0, 1fr);
		gap: 48px;
		align-items: start;
	}
	aside {
		position: sticky;
		top: 40px;
		margin-top: 64px;
		padding-right: 28px;
		border-right: 1px solid var(--rule);
		max-height: calc(100dvh - 80px);
		overflow-y: auto;
	}
	summary {
		width: fit-content;
		border-top: 1px solid var(--ink);
		padding: 12px 0;
		margin-bottom: 10px;
		font: 500 15px / 1.4 var(--font-body);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	nav {
		display: grid;
		gap: 14px;
		padding-bottom: 16px;
	}
	nav a {
		font: 400 18px / 1.4 var(--font-body);
		color: var(--muted);
		text-decoration: none;
	}
	nav a:hover,
	nav a[aria-current] {
		color: var(--ink);
	}
	nav a[aria-current] {
		font-weight: 600;
	}
	nav .subsection {
		padding-left: 14px;
		font-size: 16px;
	}
	a:focus-visible,
	summary:focus-visible {
		outline: 2px solid var(--blue);
		outline-offset: 4px;
	}
	.article {
		min-width: 0;
	}
	.article :global(h1),
	.article :global(h2),
	.article :global(h3) {
		scroll-margin-top: 40px;
	}
	@media (max-width: 999px) {
		.reading-layout {
			display: block;
			max-width: 720px;
			padding: 0;
		}
		.draft-tools {
			max-width: 720px;
		}
		aside {
			position: static;
			margin: 24px;
			border-right: 0;
			border-bottom: 1px solid var(--rule);
			max-height: none;
			padding-right: 0;
		}
		summary {
			margin-bottom: 0;
		}
	}
</style>
