<script lang="ts">
  type TwitterCard = 'summary' | 'summary_large_image';

  const {
    title = 'Seth Morton',
    description = 'Engineering builder focused on reliable, scalable systems and clean design.',
    type = 'website',
    keywords = ['Seth Morton', 'Seth M', 'software engineer', 'personal website'],
    url = undefined as string | undefined,
    image = '/favicon.png',
    twitterCard = 'summary_large_image' as TwitterCard
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
  {#if url}
    <meta property="og:url" content={url} />
    <link rel="canonical" href={url} />
  {/if}
  {#if image}
    <meta property="og:image" content={image} />
  {/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
  {#if image}
    <meta name="twitter:image" content={image} />
  {/if}
</svelte:head>

