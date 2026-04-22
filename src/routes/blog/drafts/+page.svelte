<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/blog/components/SEO.svelte';
	import { draftBlogPosts } from '$lib/blog/posts';

	const posts = draftBlogPosts.map(({ title, slug, date }) => ({ title, slug, date }));
	const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<SEO
	title="Drafts – Seth Morton"
	description="Draft essays and working notes."
	type="website"
	robots="noindex, nofollow"
	twitterCard="summary_large_image"
/>

<div class="flex min-h-screen w-full flex-col justify-between bg-stone-50">
	<div class="flex justify-start p-8">
		<button class="text-blue-600 hover:text-blue-800" onclick={() => goto('/blog')}>Back</button>
	</div>

	<div class="flex flex-col items-center justify-center space-y-8">
		<div class="flex flex-col items-center gap-2 text-center">
			<h1 class="text-2xl font-bold">drafts</h1>
			<p class="text-sm text-stone-500">Working ideas that are still in motion.</p>
		</div>

		<div class="flex flex-col items-center space-y-4">
			{#each sortedPosts as post}
				<button
					onclick={() => goto(`/blog/drafts/${post.slug}`)}
					class="group flex flex-col items-center text-center transition-colors"
				>
					<h2 class="text-lg group-hover:text-gray-500">{post.title}</h2>
					<p class="text-sm text-gray-600">{post.date}</p>
				</button>
			{/each}
		</div>
	</div>

	<div></div>
</div>
