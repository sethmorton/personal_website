<script lang="ts">
	import SEO from '$lib/blog/components/SEO.svelte';
	import '../app.css';
	import { browser } from '$app/environment';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import posthog from 'posthog-js';

	let { children } = $props();

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}
</script>

<div class="min-h-screen bg-stone-50">
  <SEO />
  {@render children()}
</div>
