<script lang="ts">
	import { goto } from '$app/navigation';
	import BlogPost from '$lib/blog/components/BlogPost.svelte';
	import SEO from '$lib/blog/components/SEO.svelte';
	import { BLOG_META } from '$lib/blog/meta';
	import { getBlogPostBySlug, publishedBlogPosts } from '$lib/blog/posts';
	import type { PageData } from './$types';
	// $props returns { data : { slug: string }}
	// @ts-ignore
	const { data }: PageData = $props();
	const slug = data.slug;
	const selectedBlogPost = getBlogPostBySlug(publishedBlogPosts, slug);
</script>

{#if selectedBlogPost === null}
	<p>Not found</p>
{:else}
	<div class="min-h-screen bg-stone-50">
		{#if BLOG_META[slug]}
			<SEO
				title={BLOG_META[slug].title}
				description={BLOG_META[slug].description}
				type={BLOG_META[slug].type ?? 'article'}
				image={BLOG_META[slug].image}
				twitterCard="summary_large_image"
			/>
		{:else}
			<SEO title={selectedBlogPost.title} type="article" />
		{/if}
		<BlogPost
			content={selectedBlogPost.content}
			publishDate={selectedBlogPost.date}
			title={selectedBlogPost.title}
			image={selectedBlogPost.image ?? `/blog/${slug}.webp`}
			onClose={() => goto('/blog')}
		/>
	</div>
{/if}
