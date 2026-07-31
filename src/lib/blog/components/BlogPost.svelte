<script lang="ts">
	import MarkdownIt from 'markdown-it';
	import katex from 'katex';
	let { publishDate, content, onClose, title = '', image = '' } = $props();

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

	let renderedHTML = $state('');

	$effect(() => {
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

		// Second pass: Render markdown
		let html = md.render(processedContent);

		// Third pass: Replace placeholders with rendered math
		mathExpressions.forEach(({ placeholder, math, display }) => {
			const renderedMath = renderMath(math, display);
			html = html.replace(placeholder, renderedMath);
		});

		renderedHTML = html;
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

<div class="h-full overflow-y-auto">
	<div class="px-6 py-6 sm:px-8">
		<button
			class="font-mono text-xs uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-900"
			onclick={() => onClose()}
		>
			Back
		</button>
	</div>
	<article class="mx-auto w-full max-w-[42rem] px-6 pb-24 pt-4 sm:px-8">
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
		</header>

		<div class="blog-prose">
			{@html renderedHTML}
		</div>
	</article>
</div>

<style>
	/* Centered, airy hero header: specimen image, gold rule, display title, mono date.
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
		animation: hero-surface 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
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

	.hero-rule {
		display: block;
		width: 60px;
		height: 1px;
		background: #c2a877;
		opacity: 0.9;
		animation: hero-rule-draw 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
	}

	.hero-title {
		margin: 2.5rem 0 0;
		font-family: 'Archivo', system-ui, sans-serif;
		font-stretch: 122%;
		font-weight: 650;
		font-size: clamp(1.9rem, 4.4vw, 2.6rem);
		line-height: 1.14;
		letter-spacing: -0.005em;
		color: #1c1a17;
		text-wrap: balance;
		animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
	}

	.hero-meta {
		margin: 1.85rem 0 2.5rem;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 0.72rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: #8a8276;
		animation: hero-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
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
		color: #15120f;
		font-family: 'Literata', Georgia, 'Times New Roman', serif;
		font-size: 1.1rem;
		line-height: 1.62;
		font-weight: 400;
		font-kerning: normal;
		font-optical-sizing: auto;
	}

	.blog-prose :global(h1),
	.blog-prose :global(h2),
	.blog-prose :global(h3) {
		color: #171411;
		font-family: 'Archivo', system-ui, sans-serif;
		font-stretch: 122%;
		font-weight: 650;
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
		color: #171411;
		font-weight: 600;
	}

	.blog-prose :global(a) {
		color: #1f4f8f;
		text-decoration: underline;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.14em;
		transition:
			color 150ms ease,
			text-decoration-color 150ms ease;
		text-decoration-color: rgba(31, 79, 143, 0.45);
	}

	.blog-prose :global(a:hover) {
		color: #163b69;
		text-decoration-color: currentColor;
	}

	.blog-prose :global(hr) {
		margin: 2.75rem 0;
		border: 0;
		border-top: 1px solid rgba(120, 113, 108, 0.28);
	}

	.blog-prose :global(blockquote) {
		padding-left: 1.25rem;
		border-left: 2px solid rgba(120, 113, 108, 0.35);
		color: #44403c;
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

	.blog-prose :global(code) {
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 0.88em;
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
