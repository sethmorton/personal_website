<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/blog/components/SEO.svelte';
	import { draftBlogPosts, publishedBlogPosts } from '$lib/blog/posts';

	const posts = publishedBlogPosts.map(({ title, slug, date }) => ({ title, slug, date }));
	const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	let activePost: (typeof posts)[0] | null = $state(null);
</script>

<SEO
	title="Blog – Seth Morton"
	description="Essays on engineering, systems, and building tools that scale."
	type="website"
	twitterCard="summary_large_image"
/>

{#if activePost === null}
	<div class="flex min-h-screen w-full flex-col justify-between bg-stone-50">
		<div class="flex justify-start p-8">
			<button class="text-blue-600 hover:text-blue-800" onclick={() => goto('/')}>Back</button>
		</div>

		<div class="flex flex-col items-center justify-center space-y-8">
			<h1 class="text-2xl font-bold">blog</h1>
			<div class="flex flex-col items-center space-y-4">
				{#each sortedPosts as post}
					<button
						onclick={() => goto(`/blog/${post.slug}`)}
						class="group flex flex-col items-center text-center transition-colors"
					>
						<h2 class="text-lg group-hover:text-gray-500">{post.title}</h2>
						<p class="text-sm text-gray-600">{post.date}</p>
					</button>
				{/each}
			</div>
			{#if draftBlogPosts.length > 0}
				<button
					class="text-sm font-medium uppercase tracking-[0.16em] text-stone-500 transition-colors hover:text-stone-800"
					onclick={() => goto('/blog/drafts')}
				>
					drafts
				</button>
			{/if}
		</div>

		<!-- This is for the justify between-->
		<div></div>
	</div>
{/if}
