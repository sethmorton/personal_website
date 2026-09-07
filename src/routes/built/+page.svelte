<script lang="ts">
	import SEO from '$lib/blog/components/SEO.svelte';
	import ContentLink from '$lib/components/ContentLink.svelte';
</script>

<SEO
	title="Things I've Built – Seth Morton"
	description="A few of the products, tools, and systems I've shipped."
	type="website"
	twitterCard="summary_large_image"
/>

<main class="site-page reveal">
	<nav class="page-nav" aria-label="Back"><a class="text-link" href="/">← Home</a></nav>
	<header class="page-header">
		<h1 class="page-title">Things I've built</h1>
		<p class="page-description">A snapshot of some products and tools I've worked on recently.</p>
	</header>
	<section aria-labelledby="work-heading">
		<h2 class="section-label" id="work-heading">Selected work</h2>
		<ul class="entry-list">
			<li>
				<ContentLink
					title="Geneloop"
					description="AI-powered sequence design platform."
					href="https://geneloop.bio"
					external
				/>
			</li>
			<li>
				<ContentLink
					title="DNA Tiny World"
					description="First benchmark for DNA foundational models"
					href="https://huggingface.co/datasets/sethmorton/dna-tiny-world"
					external
				/>
			</li>
			<li>
				<ContentLink
					title="FinTech platform"
					description="Led engineering team, 8 paying businesses"
					href="https://renavestapp.com"
					external
				/>
			</li>
			<li>
				<ContentLink
					title="Border analytics dashboard"
					description="Policy tool for regional head of CBP"
					href="https://borderdashboard.com"
					external
				/>
			</li>
			<li>
				<ContentLink
					title="Quantitative tooling"
					description="Quantitative tools for retail quant community"
					href="https://backtestextender.vercel.app"
					external
				/>
			</li>
		</ul>
	</section>
	<footer class="page-footer">
		<p class="page-description">I've built over 50 projects; this is just a small sample.</p>
	</footer>
</main>
