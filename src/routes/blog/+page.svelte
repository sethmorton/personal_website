<script lang="ts">
	import SEO from '$lib/blog/components/SEO.svelte';
	import ContentLink from '$lib/components/ContentLink.svelte';
	import { draftBlogPosts, publishedBlogPosts } from '$lib/blog/posts';

	const sortedPosts = [...publishedBlogPosts].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
</script>

<SEO
	title="Blog – Seth Morton"
	description="Essays by Seth Morton on AI architectures, continual learning, biology, thermodynamic computation, and how we build and discover."
	type="website"
	twitterCard="summary_large_image"
/>

<main class="site-page reveal">
	<nav class="page-nav" aria-label="Back"><a class="text-link" href="/">← Home</a></nav>
	<header class="page-header">
		<h1 class="page-title">Writing</h1>
	</header>
	<ul class="entry-list">
		{#each sortedPosts as post}
			<li>
				<ContentLink href={`/blog/${post.slug}`} title={post.title} date={post.date} heading="h2" />
			</li>
		{/each}
	</ul>
	{#if draftBlogPosts.length > 0}
		<footer class="page-footer"><a class="text-link" href="/blog/drafts">Drafts →</a></footer>
	{/if}
</main>
