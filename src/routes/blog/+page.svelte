<script lang="ts">
	import { goto } from '$app/navigation';
  import SEO from '$lib/blog/components/SEO.svelte';
	let posts = $state([
		{
			title: 'balance',
			slug: 'balance',
			date: '2024-11-19'
		},
		{
			title: 'gratitude & hyperbolic discounting',
			slug: 'gratitude_&_hyperbolic_discounting',
			date: '2024-12-18'
		},
		{
			title: 'serendipity & the lonely generation',
			slug: 'serendipity_&_the_lonely_generation',
			date: '2025-01-31'
		},
		{
			title: 'where we fit into the future of AI',
			slug: 'where_we_fit_into_the_future_of_ai',
			date: '2025-05-12'
		},
		{
			title: 'on growth and the low-hanging fruit of immortality',
			slug: 'on_growth_and_the_low_hanging_fruit_of_immortality',
			date: '2025-09-13'
		}
	]);
	let activePost: (typeof posts)[0] | null = $state(null);
</script>

<SEO
  title="Blog – Seth Morton"
  description="Essays on engineering, systems, and building tools that scale."
  type="website"
  twitterCard="summary_large_image"
/>

{#if activePost === null}
	<div class="flex h-screen w-screen flex-col justify-between">
		<div class="flex justify-start p-8">
			<button class="text-blue-600 hover:text-blue-800" onclick={() => goto('/')}>Back</button>
		</div>

		<div class="flex flex-col items-center justify-center space-y-8">
			<h1 class="text-2xl font-bold">blog</h1>
			<div class="flex flex-col items-center space-y-4">
				{#each posts as post}
					<button
						onclick={() => goto(`/blog/${post.slug}`)}
						class="group flex flex-col items-center text-center transition-colors"
					>
						<h2 class="text-lg group-hover:text-gray-500">{post.title}</h2>
						<p class="text-sm text-gray-600">{post.date}</p>
					</button>
				{/each}
			</div>
		</div>

		<!-- This is for the justify between-->
		<div></div>
	</div>
{/if}
