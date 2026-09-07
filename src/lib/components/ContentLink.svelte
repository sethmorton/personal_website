<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	let {
		href,
		title,
		description = '',
		date = '',
		external = false,
		heading = 'h3'
	}: {
		href: string;
		title: string;
		description?: string;
		date?: string;
		external?: boolean;
		heading?: 'h2' | 'h3';
	} = $props();
</script>

<a
	class="entry-link"
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
>
	<div>
		<svelte:element this={heading} class="entry-title">{title}</svelte:element>
		{#if description}<p class="entry-description">{description}</p>{/if}
		{#if date}<time class="entry-meta" datetime={date}>{date}</time>{/if}
	</div>
	<ArrowUpRight size={18} strokeWidth={1.5} />
</a>
