<script lang="ts">
	import { goto } from '$app/navigation';
	import SEO from '$lib/blog/components/SEO.svelte';
	import { draftBlogPosts, publishedBlogPosts } from '$lib/blog/posts';

	const posts = publishedBlogPosts.map(({ title, slug, date }) => ({ title, slug, date }));
	const sortedPosts = [...posts].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
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
			<button
				class="font-mono text-xs uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-900"
				onclick={() => goto('/')}
			>
				Back
			</button>
		</div>

		<div class="flex flex-col items-center justify-center space-y-8">
			<h1 class="font-display text-3xl font-semibold tracking-[-0.005em] text-stone-900">blog</h1>
			<div class="flex flex-col items-center space-y-5">
				{#each sortedPosts as post, i}
					<button
						onclick={() => goto(`/blog/${post.slug}`)}
						class="post-item group flex flex-col items-center text-center"
						style="animation-delay: {80 + i * 60}ms"
					>
						<h2
							class="text-lg text-stone-800 transition-colors duration-150 group-hover:text-stone-500"
						>
							{post.title}
						</h2>
						<p class="mt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-stone-400">
							{post.date}
						</p>
					</button>
				{/each}
			</div>
			{#if draftBlogPosts.length > 0}
				<button
					class="font-mono text-xs uppercase tracking-[0.18em] text-stone-400 transition-colors hover:text-stone-700"
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

<style>
	.post-item {
		animation: list-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes list-rise {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.post-item {
			animation: none;
		}
	}
</style>
