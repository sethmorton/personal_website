<script lang="ts">
	const {
		title = 'Seth Morton - Full Stack',
		description = '5+ years building high-impact, large-scale applications. Proven experience in creating full-stack web applications, databases, and product leadership.',
		type = 'website',
		keywords = []
	} = $props();
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if keywords.length > 0}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="Seth Morton" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
