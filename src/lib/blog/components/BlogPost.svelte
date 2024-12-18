<script lang="ts">
	import MarkdownIt from 'markdown-it';
	import katex from 'katex';
	let { publishDate, content, onClose } = $props();

	// Initialize markdown-it without the katex plugin
	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: true
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
		// For inline and display math
		return new RegExp(`${left}(.*?)${right}`, 'g');
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
			processedContent = processedContent.replace(regex, (match, math) => {
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
	<div class="flex justify-start p-8">
		<button class="text-blue-600 hover:text-blue-800" onclick={() => onClose()}>Back</button>
	</div>
	<article class="prose prose-lg mx-auto max-w-3xl px-4 py-8 text-black">
		<header class="mb-8">
			<time class="text-sm text-gray-500">
				{publishDate}
			</time>
		</header>

		{@html renderedHTML}
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
</style>
