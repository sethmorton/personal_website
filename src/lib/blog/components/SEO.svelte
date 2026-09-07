<script lang="ts">
	import { page } from '$app/stores';
	import {
		DEFAULT_KEYWORDS,
		SITE_DESCRIPTION,
		SITE_IMAGE,
		SITE_IMAGE_ALT,
		SITE_NAME,
		SITE_URL,
		TWITTER_HANDLE
	} from '$lib/seo/site';

	type TwitterCard = 'summary' | 'summary_large_image';
	type OpenGraphType = 'article' | 'profile' | 'website';
	type Props = {
		title?: string;
		description?: string;
		type?: OpenGraphType;
		keywords?: string[];
		url?: string;
		image?: string;
		imageAlt?: string;
		imageWidth?: number;
		imageHeight?: number;
		publishedTime?: string;
		robots?: string;
		twitterCard?: TwitterCard;
	};

	const {
		title = SITE_NAME,
		description = SITE_DESCRIPTION,
		type = 'website' as OpenGraphType,
		keywords = DEFAULT_KEYWORDS,
		url = undefined as string | undefined,
		image = SITE_IMAGE,
		imageAlt = SITE_IMAGE_ALT,
		imageWidth = image === SITE_IMAGE ? 471 : undefined,
		imageHeight = image === SITE_IMAGE ? 510 : undefined,
		publishedTime,
		robots = 'index, follow, max-image-preview:large',
		twitterCard = 'summary_large_image' as TwitterCard
	}: Props = $props();

	const toAbsoluteUrl = (value: string) =>
		value.startsWith('http://') || value.startsWith('https://')
			? value
			: new URL(value, SITE_URL).toString();

	const canonicalUrl = () => toAbsoluteUrl(url ?? $page.url.pathname);
	const imageUrl = () => (image ? toAbsoluteUrl(image) : undefined);
	const articleSchema = () =>
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			'@id': `${canonicalUrl()}#article`,
			headline: title,
			description,
			url: canonicalUrl(),
			mainEntityOfPage: canonicalUrl(),
			image: imageUrl(),
			datePublished: publishedTime,
			inLanguage: 'en',
			author: {
				'@type': 'Person',
				'@id': `${SITE_URL}/#person`,
				name: SITE_NAME,
				url: `${SITE_URL}/about`
			},
			publisher: { '@id': `${SITE_URL}/#person` },
			isPartOf: { '@id': `${SITE_URL}/#website` }
		}).replace(/</g, '\\u003c');
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={robots} />
	<meta name="author" content={SITE_NAME} />
	{#if keywords.length > 0}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}
	<link rel="canonical" href={canonicalUrl()} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:url" content={canonicalUrl()} />
	{#if imageUrl()}
		<meta property="og:image" content={imageUrl()} />
		<meta property="og:image:alt" content={imageAlt} />
		{#if imageWidth && imageHeight}
			<meta property="og:image:width" content={String(imageWidth)} />
			<meta property="og:image:height" content={String(imageHeight)} />
		{/if}
	{/if}

	{#if type === 'article' && publishedTime}
		<meta property="article:published_time" content={publishedTime} />
		<meta property="article:author" content={`${SITE_URL}/about`} />
		{@html `<script type="application/ld+json">${articleSchema()}</script>`}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:creator" content={TWITTER_HANDLE} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if imageUrl()}
		<meta name="twitter:image" content={imageUrl()} />
		<meta name="twitter:image:alt" content={imageAlt} />
	{/if}
</svelte:head>
