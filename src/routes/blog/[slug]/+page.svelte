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
		<SEO
			title={BLOG_META[slug]?.title ?? selectedBlogPost.title}
			description={BLOG_META[slug]?.description}
			type="article"
			image={BLOG_META[slug]?.image ?? selectedBlogPost.image ?? `/blog/${slug}.webp`}
			imageAlt={BLOG_META[slug]?.imageAlt ?? `Illustration for ${selectedBlogPost.title}`}
			imageWidth={BLOG_META[slug]?.imageWidth}
			imageHeight={BLOG_META[slug]?.imageHeight}
			publishedTime={selectedBlogPost.date}
			twitterCard="summary_large_image"
		/>
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
