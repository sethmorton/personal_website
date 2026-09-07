<script lang="ts">
	import SEO from '$lib/blog/components/SEO.svelte';
	import ContentLink from '$lib/components/ContentLink.svelte';
	import { draftBlogPosts } from '$lib/blog/posts';

	const sortedPosts = [...draftBlogPosts].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
</script>

<SEO
	title="Drafts – Seth Morton"
	description="Draft essays and working notes."
	type="website"
	robots="noindex, nofollow"
	twitterCard="summary_large_image"
/>

<main class="site-page reveal">
	<nav class="page-nav" aria-label="Back"><a class="text-link" href="/blog">← All writing</a></nav>
	<header class="page-header">
		<h1 class="page-title">Drafts</h1>
		<p class="page-description">Working ideas that are still in motion.</p>
	</header>
	<ul class="entry-list">
		{#each sortedPosts as post}
			<li>
				<ContentLink
					href={`/blog/drafts/${post.slug}`}
					title={post.title}
					date={post.date}
					heading="h2"
				/>
			</li>
		{/each}
	</ul>
</main>
