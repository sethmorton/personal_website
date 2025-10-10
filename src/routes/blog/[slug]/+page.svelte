<script lang="ts">
	import { goto } from '$app/navigation';
	import BlogPost from '$lib/blog/components/BlogPost.svelte';
  import SEO from '$lib/blog/components/SEO.svelte';
  import { BLOG_META } from '$lib/blog/meta';
	import type { PageData } from './$types';
	import balanceContent from '$lib/blog/content/balance.txt?raw';
	import gratitudeContent from '$lib/blog/content/gratitude.txt?raw';
	import serendipityContent from '$lib/blog/content/serendipity.txt?raw';
	import futureAiContent from '$lib/blog/content/future_ai.txt?raw';
	import onGrowthContent from '$lib/blog/content/on_growth_low_hanging_fruit_immortality.txt?raw';
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
		},
		{
			title: 'where we fit into the future of AI',
			slug: 'where_we_fit_into_the_future_of_ai',
			date: '2025-05-12',
			content: futureAiContent
		},
		{
			title: 'on growth and the low-hanging fruit of immortality',
			slug: 'on_growth_and_the_low_hanging_fruit_of_immortality',
			date: '2025-09-13',
			content: onGrowthContent
		}
	]);
	// $props returns { data : { slug: string }}
	// @ts-ignore
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
		onClose={() => goto('/blog')}
	/>
  </div>
{/if}
