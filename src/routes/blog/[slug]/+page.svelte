<script lang="ts">
	import { goto } from '$app/navigation';
	import BlogPost from '$lib/blog/components/BlogPost.svelte';
	import SEO from '$lib/blog/components/SEO.svelte';
	import { BLOG_META } from '$lib/blog/meta';
	import { getBlogPostBySlug, publishedBlogPosts } from '$lib/blog/posts';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let slug = $derived(data.slug);
	let selectedBlogPost = $derived(getBlogPostBySlug(publishedBlogPosts, slug));
</script>

{#if selectedBlogPost === null}
	<p>Not found</p>
{:else}
	<div class="min-h-screen">
		{#if BLOG_META[slug]}
			<SEO
				title={BLOG_META[slug].title}
				description={BLOG_META[slug].description}
				type={BLOG_META[slug].type ?? 'article'}
				image={BLOG_META[slug].image}
				imageAlt={BLOG_META[slug].image ? selectedBlogPost.title : undefined}
				twitterCard="summary_large_image"
			/>
		{:else}
			<SEO title={selectedBlogPost.title} type="article" />
		{/if}
		<BlogPost
			content={selectedBlogPost.content}
			teaser={selectedBlogPost.teaser}
			publishDate={selectedBlogPost.date}
			title={selectedBlogPost.title}
			image={selectedBlogPost.image ?? `/blog/${slug}.webp`}
			onClose={() => goto('/blog')}
		/>
	</div>
{/if}
