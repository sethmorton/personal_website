<script lang="ts">
	import { goto } from '$app/navigation';
	import BlogPost from '$lib/blog/components/BlogPost.svelte';
	import type { PageData } from './$types';
	import balanceContent from '$lib/blog/content/balance.txt?raw';
	import gratitudeContent from '$lib/blog/content/gratitude.txt?raw';
	import serendipityContent from '$lib/blog/content/serendipity.txt?raw';
	const blogPosts = $state([
		{
			title: 'balance',
			slug: 'balance',
			date: '2024-11-19',
			content: balanceContent
		},
		{
			title: 'gratitude & hyperbolic discounting',
			slug: 'gratitude_&_hyperbolic_discounting',
			date: '2024-12-18',
			content: gratitudeContent
		},
		{
			title: 'serendipity & the lonely generation',
			slug: 'serendipity_&_the_lonely_generation',
			date: '2025-01-31',
			content: serendipityContent
		}
	]);
	// $props returns { data : { slug: string }}
	const { data }: PageData = $props();
	let slug = data.slug;
	const findBlogPostBySlug = (
		blogPosts: { title: string; slug: string; date: string; content: string }[],
		slug: string
	) => {
		for (let blogPost of blogPosts) {
			if (blogPost.slug === slug) {
				return blogPost;
			}
		}
		return null;
	};
	const selectedBlogPost = findBlogPostBySlug(blogPosts, slug);
</script>

{#if selectedBlogPost === null}
	<p>Not found</p>
{:else}
	<BlogPost
		content={selectedBlogPost.content}
		publishDate={selectedBlogPost.date}
		onClose={() => goto('/blog')}
	/>
{/if}
