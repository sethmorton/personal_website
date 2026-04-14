<script lang="ts">
	import MarkdownIt from 'markdown-it';
	import katex from 'katex';
	let { publishDate, content, onClose } = $props();
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
		let processedContent = content;
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
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/computer-modern-font@1.0.1/fonts/Serif/cmun-serif.css"
	/>
</svelte:head>

<div class="h-full overflow-y-auto">
	<div class="px-6 py-6 sm:px-8">
		<button
			class="text-sm font-medium tracking-[0.02em] text-stone-600 transition-colors hover:text-stone-900"
			onclick={() => onClose()}
		>
			Back
		</button>
	</div>
	<article class="mx-auto w-full max-w-[42rem] px-6 pb-24 pt-4 sm:px-8">
		<div class="blog-prose">
			<header class="mb-10 border-b border-stone-200/80 pb-6">
				<time class="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
					{publishDate}
				</time>
			</header>

			{@html renderedHTML}
		</div>
	</article>
</div>

<style>
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
		color: #2b2620;
		font-size: 1.125rem;
		line-height: 1.9;
		font-weight: 400;
		font-kerning: normal;
	}

	.blog-prose :global(h1),
	.blog-prose :global(h2),
	.blog-prose :global(h3) {
		color: #171411;
		font-weight: 600;
		line-height: 1.18;
		letter-spacing: -0.03em;
		text-wrap: balance;
	}

	.blog-prose :global(h1) {
		margin: 0 0 2rem;
		font-size: clamp(2.2rem, 5vw, 3.15rem);
	}

	.blog-prose :global(h2) {
		margin: 4rem 0 1.35rem;
		font-size: clamp(1.55rem, 3vw, 1.95rem);
	}

	.blog-prose :global(h3) {
		margin: 3rem 0 1rem;
		font-size: 1.3rem;
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
	}

	.blog-prose :global(a:hover) {
		color: #163b69;
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

	.blog-prose :global(blockquote strong) {
		color: inherit;
		font-weight: 400;
	}

	.blog-prose :global(ul),
	.blog-prose :global(ol) {
		padding-left: 1.4rem;
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
		font-size: 0.95em;
	}

	@media (max-width: 640px) {
		.blog-prose {
			font-size: 1.03rem;
			line-height: 1.82;
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
