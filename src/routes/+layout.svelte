<script lang="ts">
	import SEO from '$lib/blog/components/SEO.svelte';
	import '../app.css';
	let { children } = $props();
</script>
<SEO />
{@render children()}
