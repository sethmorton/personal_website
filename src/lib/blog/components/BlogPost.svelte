<script lang="ts">
	import MarkdownIt from 'markdown-it';
	import katex from 'katex';
	import { ANIMS } from '$lib/blog/anim';
	import VariantFigure from '$lib/blog/anim/VariantFigure.svelte';
	let { publishDate, content, onClose, title = '', image = '', teaser = '' } = $props();

	// If the post opens with a markdown heading, use it as the hero title (so the
	// casing stays in the author's voice) and strip that line from the body so it
	// is not rendered twice. Anchored to the start: posts that open with prose
	// keep their full body and fall back to the passed-in title.
	const headingMatch = $derived(content.match(/^\s*#{1,6}\s+(.+?)\s*#*\s*(?:\r?\n|$)/));
	const heroTitle = $derived(headingMatch ? headingMatch[1].trim() : (title ?? ''));
	const bodyContent = $derived(
		headingMatch ? content.slice(headingMatch[0].length).replace(/^\s+/, '') : content
	);

	const MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const formatDate = (value: string) => {
		const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');
		if (!m) return value ?? '';
		return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
	};
	const formattedDate = $derived(formatDate(publishDate));
	// Initialize markdown-it without the katex plugin
	// Enable `breaks: true` so single newlines in the source are
	// converted to <br> like GitHub-flavored markdown.
	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
		breaks: true
	});
	// Every link, including linkified bare URLs, opens in a new tab.
	md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
		tokens[idx].attrSet('target', '_blank');
		tokens[idx].attrSet('rel', 'noopener');
		return self.renderToken(tokens, idx, options);
	};

	// Define the delimiters for math expressions
	const mathDelimiters = [
		{ left: '$$', right: '$$', display: true },
		{ left: '$', right: '$', display: false },
		{ left: '\\(', right: '\\)', display: false },
		{ left: '\\[', right: '\\]', display: true },
		{ left: '\\begin{equation}', right: '\\end{equation}', display: true },
		{ left: '\\begin{align}', right: '\\end{align}', display: true },
		{ left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
		{ left: '\\begin{gather}', right: '\\end{gather}', display: true },
		{ left: '\\begin{CD}', right: '\\end{CD}', display: true }
	];

	// Function to escape regex special characters
	const escapeRegex = (str: string) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

	// Function to create regex for finding math expressions
	const createMathRegex = (delim: { left: string; right: string }) => {
		const left = escapeRegex(delim.left);
		const right = escapeRegex(delim.right);
		// Use [\s\S]*? so the regex matches across newlines as well
		// (the dot does not match newlines by default).
		return new RegExp(`${left}([\\s\\S]*?)${right}`, 'g');
	};

	// Function to render math expressions
	const renderMath = (content: string, display: boolean) => {
		try {
			return katex.renderToString(content, {
				displayMode: display,
				throwOnError: false,
				errorColor: '#cc0000'
			});
		} catch (error) {
			console.error('KaTeX error:', error);
			return `<span class="katex-error">${content}</span>`;
		}
	};

	// Rendered body, split at [[anim: name]] markers so live canvas figures can be
	// mounted between {@html} segments (scripts never run inside {@html}).
	type Segment = { html: string } | { anim: string };
	let filmOpen = $state(false);
	const segments = $derived.by((): Segment[] => {
		// First pass: Replace math expressions with placeholders
		let processedContent = bodyContent;
		const mathExpressions: Array<{ placeholder: string; math: string; display: boolean }> = [];
		let placeholderCounter = 0;

		mathDelimiters.forEach((delimiter) => {
			const regex = createMathRegex(delimiter);
			processedContent = processedContent.replace(regex, (match = '', math = '') => {
				const placeholder = `MATH_PLACEHOLDER_${placeholderCounter++}`;
				mathExpressions.push({
					placeholder,
					math,
					display: delimiter.display
				});
				return placeholder;
			});
		});

		// Expandable notes share one renderer. Gray dots carry short definitions.
		let sidenoteCounter = 0;
		processedContent = processedContent.replace(
			/\[\[sn(-gray)?:([\s\S]*?)\]\]/g,
			(_match: string, gray: string | undefined, body: string = '') => {
				const n = ++sidenoteCounter;
				const inner = md.renderInline(String(body).trim());
				return (
					`<span class="sn${gray ? ' sn-gray' : ''}">` +
					`<input type="checkbox" id="sn-${n}" class="sn-toggle" aria-label="Toggle sidenote ${n}" />` +
					`<label for="sn-${n}" class="sn-dot" aria-label="Toggle sidenote ${n}">${n}</label>` +
					`<span class="sn-body">${inner}</span>` +
					`</span>`
				);
			}
		);

		// Anim pass: [[anim: name]] becomes a block-level placeholder markdown-it
		// passes through verbatim (html: true); split on it after rendering.
		processedContent = processedContent.replace(
			/\[\[anim:\s*([a-z]+)\s*\]\]/g,
			(_m: string, name: string) => (name in ANIMS ? `\n\n<div data-anim="${name}"></div>\n\n` : '')
		);

		// Second pass: Render markdown
		let html = md.render(processedContent);

		// Third pass: Replace placeholders with rendered math
		mathExpressions.forEach(({ placeholder, math, display }) => {
			const renderedMath = renderMath(math, display);
			html = html.replace(placeholder, renderedMath);
		});

		return html
			.split(/<div data-anim="([a-z]+)"><\/div>/)
			.map((part, i) => (i % 2 ? { anim: part } : { html: part }));
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.min.css"
		integrity="sha384-veTAhWILPOotXm+kbR5uY7dRamYLJf58I7P+hJhjeuc7hsMAkJHTsPahAl0hBST0"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="post-shell">
	<div class="post-nav page-nav">
		<button class="text-link" onclick={() => onClose()}> Back </button>
	</div>
	<article class="post-content">
		<header class="blog-hero">
			{#if image}
				<div class="hero-figure">
					<img src={image} alt="" />
				</div>
			{/if}
			<span class="hero-rule" aria-hidden="true"></span>
			<h1 class="hero-title">{heroTitle}</h1>
			<p class="hero-meta"><time>{formattedDate}</time></p>
			<span class="hero-rule" aria-hidden="true"></span>
			{#if teaser}
				<details class="film" bind:open={filmOpen}>
					<summary>Watch the film <span>18 seconds</span></summary>
					{#if filmOpen}
						<video
							src={teaser}
							muted
							controls
							playsinline
							preload="metadata"
							aria-label="The Shape of Inference: the horn antenna transforms into a new instrument"
						></video>
					{/if}
				</details>
			{/if}
		</header>

		<div class="blog-prose">
			{#each segments as seg}
				{#if 'anim' in seg}
					<VariantFigure group={seg.anim} />
				{:else}
					{@html seg.html}
				{/if}
			{/each}
		</div>
	</article>
</div>

<style>
	.post-nav {
		max-width: var(--page-width);
		margin: 0 auto;
		padding: var(--space-page) 24px 0;
	}
	.post-content {
		width: 100%;
		max-width: var(--reading-width);
		margin: 0 auto;
		padding: 16px 24px 96px;
	}

	/* Centered article header: existing specimen image, theme rule, serif title, sans date.
	   Entrance is a single orchestrated sequence: specimen surfaces, rules draw
	   outward, title rises, meta fades. Runs once per post view. */
	.blog-hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin: 1.5rem 0 4.5rem;
	}

	.hero-figure {
		margin: 0 0 3rem;
		display: flex;
		justify-content: center;
		animation: hero-surface 0.9s var(--ease-out) both;
	}

	.hero-figure img {
		display: block;
		width: auto;
		max-width: 70%;
		max-height: 300px;
		/* Images are pre-processed to a transparent-background indigo duotone, so
		   the specimen floats on the page with no frame and needs no filtering. */
		animation: hero-drift 14s ease-in-out 1.2s infinite;
	}

	.film {
		width: 100%;
		margin-top: 1.5rem;
		font-family: var(--font-ui);
		font-size: var(--text-ui);
		color: var(--blue);
	}
	.film summary {
		width: fit-content;
		min-height: 44px;
		margin: 0 auto;
		padding: 10px 0;
		cursor: pointer;
	}
	.film summary span {
		margin-left: 0.5rem;
		color: var(--muted);
	}
	.film summary:focus-visible {
		outline: 2px solid var(--blue);
		outline-offset: 4px;
	}
	.film video {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		margin-top: 0.75rem;
	}

	.hero-rule {
		display: block;
		width: 60px;
		height: 1px;
		background: var(--rule);
		opacity: 0.9;
		animation: hero-rule-draw 0.7s var(--ease-out) 0.25s both;
	}

	.hero-title {
		margin: 2.5rem 0 0;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(1.9rem, 4.4vw, 2.6rem);
		line-height: 1.14;
		letter-spacing: -0.005em;
		color: var(--ink);
		text-wrap: balance;
		animation: hero-rise 0.8s var(--ease-out) 0.35s both;
	}

	.hero-meta {
		margin: 1.85rem 0 2.5rem;
		font-family: var(--font-ui);
		font-size: var(--text-meta);
		color: var(--muted);
		animation: hero-rise 0.8s var(--ease-out) 0.5s both;
	}

	@keyframes hero-surface {
		from {
			opacity: 0;
			transform: translateY(10px) scale(0.985);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes hero-rule-draw {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	@keyframes hero-rise {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* The radiolarian drifts, barely: it is a specimen suspended in fluid. */
	@keyframes hero-drift {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-figure,
		.hero-figure img,
		.hero-rule,
		.hero-title,
		.hero-meta {
			animation: none;
		}
	}

	@media (max-width: 640px) {
		.blog-hero {
			margin-bottom: 3.5rem;
		}

		.hero-figure {
			margin-bottom: 2.25rem;
		}

		.hero-figure img {
			max-height: 230px;
			max-width: 70%;
		}

		.hero-meta {
			margin: 1.5rem 0 2rem;
		}
	}

	:global(.katex) {
		font-size: 1.1em;
	}

	:global(.katex-display) {
		overflow-x: auto;
		overflow-y: hidden;
		padding: 1em 0;
	}

	:global(.katex-error) {
		color: #cc0000;
		background-color: #ffebeb;
		padding: 0.2em 0.4em;
		border-radius: 0.2em;
	}

	:global(.markdown-body) {
		color: inherit;
	}

	.blog-prose {
		color: var(--ink);
		font-family: var(--font-body);
		font-size: var(--text-body);
		line-height: 1.62;
		font-weight: 400;
		font-kerning: normal;
		font-optical-sizing: auto;
	}

	.blog-prose :global(h1),
	.blog-prose :global(h2),
	.blog-prose :global(h3) {
		color: var(--ink);
		font-family: var(--font-display);
		font-weight: 400;
		line-height: 1.15;
		letter-spacing: -0.005em;
		text-wrap: balance;
	}

	.blog-prose :global(h1) {
		margin: 0 0 2rem;
		font-size: clamp(1.9rem, 4.4vw, 2.5rem);
	}

	.blog-prose :global(h2) {
		margin: 4rem 0 1.35rem;
		font-size: clamp(1.4rem, 2.6vw, 1.65rem);
	}

	.blog-prose :global(h3) {
		margin: 3rem 0 1rem;
		font-size: 1.2rem;
	}

	.blog-prose :global(p),
	.blog-prose :global(ul),
	.blog-prose :global(ol),
	.blog-prose :global(blockquote),
	.blog-prose :global(pre) {
		margin: 0 0 1.75rem;
	}

	.blog-prose :global(strong) {
		color: var(--ink);
		font-weight: 600;
	}

	.blog-prose :global(a) {
		color: var(--blue);
		text-decoration: underline;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.14em;
		transition:
			color var(--motion-fast) ease,
			text-decoration-color var(--motion-fast) ease;
		overflow-wrap: anywhere;
		text-decoration-color: color-mix(in srgb, var(--blue) 45%, transparent);
	}

	.blog-prose :global(a:hover) {
		color: var(--accent-hover);
		text-decoration-color: currentColor;
	}

	.blog-prose :global(hr) {
		margin: 2.75rem 0;
		border: 0;
		border-top: 1px solid var(--rule);
	}

	.blog-prose :global(blockquote) {
		padding-left: 1.25rem;
		border-left: 2px solid var(--rule);
		color: var(--muted);
		font-style: normal;
		font-weight: 400;
	}

	.blog-prose :global(ul),
	.blog-prose :global(ol) {
		padding-left: 1.4rem;
	}

	.blog-prose :global(ul) {
		list-style-type: disc;
	}

	.blog-prose :global(ol) {
		list-style-type: decimal;
	}

	.blog-prose :global(li + li) {
		margin-top: 0.75rem;
	}

	.blog-prose :global(img) {
		display: block;
		width: 100%;
		margin: 2.25rem 0;
		border-radius: 0.25rem;
	}

	.blog-prose :global(pre) {
		max-width: 100%;
		overflow-x: auto;
	}

	.blog-prose :global(code) {
		font-family: var(--font-code);
		font-size: 0.88em;
	}

	/* Expandable notes remain keyboard-operable inside rendered markdown. */
	.blog-prose :global(.sn-toggle) {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.blog-prose :global(.sn-dot) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.3em;
		height: 1.3em;
		margin: 0 0.18em;
		vertical-align: 0.25em;
		border-radius: 9999px;
		background: var(--blue);
		color: var(--paper);
		font-family: var(--font-code);
		font-size: 0.68em;
		font-weight: 600;
		line-height: 1;
		cursor: pointer;
		user-select: none;
		transition:
			background var(--motion-fast) ease,
			transform var(--motion-fast) ease;
	}

	.blog-prose :global(.sn-dot:hover) {
		background: var(--accent-hover);
		transform: scale(1.12);
	}

	.blog-prose :global(.sn-toggle:checked + .sn-dot) {
		background: var(--accent-hover);
	}

	.blog-prose :global(.sn-toggle:focus-visible + .sn-dot) {
		outline: 2px solid var(--blue);
		outline-offset: 3px;
	}

	.blog-prose :global(.sn-gray .sn-dot) {
		background: var(--muted);
	}

	.blog-prose :global(.sn-gray .sn-dot:hover),
	.blog-prose :global(.sn-gray .sn-toggle:checked + .sn-dot) {
		background: var(--ink);
	}

	.blog-prose :global(.sn-body) {
		display: none;
		margin: 0.85em 0;
		padding: 0.8em 1.05em;
		background: var(--accent-soft);
		border-left: 2px solid var(--blue);
		border-radius: 0.25rem;
		color: var(--muted);
		font-size: 0.92em;
		line-height: 1.58;
	}

	.blog-prose :global(.sn-toggle:checked ~ .sn-body) {
		display: block;
	}

	.blog-prose :global(.sn-gray .sn-body) {
		background: var(--accent-soft);
		border-left-color: var(--rule);
	}

	@media (max-width: 640px) {
		.blog-prose {
			font-size: 1.02rem;
			line-height: 1.66;
		}

		.blog-prose :global(h1) {
			margin-bottom: 1.5rem;
		}

		.blog-prose :global(p),
		.blog-prose :global(ul),
		.blog-prose :global(ol),
		.blog-prose :global(blockquote),
		.blog-prose :global(pre) {
			margin-bottom: 1.45rem;
		}
	}
</style>
