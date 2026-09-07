<script lang="ts">
	import SEO from '$lib/blog/components/SEO.svelte';
</script>

<SEO
	title="About Seth Morton"
	description="Background, work, and interests spanning software engineering, systems thinking, and frontier science."
	type="profile"
	twitterCard="summary_large_image"
/>

<main class="site-page reveal">
	<nav class="page-nav" aria-label="Back"><a class="text-link" href="/">← Home</a></nav>
	<header class="page-header"><h1 class="page-title">About</h1></header>

	<div class="about-prose">
		<p>
			I'm Seth Morton, a software engineer from San Diego now studying in Boston. My journey started
			at 12 when I built my first photography website to bypass expensive hosting fees - a small
			decision that sparked a lifelong passion for creating meaningful technology.
		</p>

		<p>
			Since then, I've built over 40 projects and worked with fantastic teams at Smart Border
			Coalition, BajaBound, and now Renavest, where I'm working to make financial therapy more
			accessible. What drives me? Using technology to solve real problems that matter.
		</p>

		<p>
			At Tufts, I'm combining Computer Science with Philosophy because I believe the biggest
			challenges need both technical skills and deep thinking. When I'm not coding, you'll find me
			cycling through Boston, researching geothermal energy innovations, or listening to Prof G
			Markets while planning my next project.
		</p>
	</div>
</main>

<style>
	.about-prose {
		max-width: var(--reading-width);
		font: var(--text-body) / 1.7 var(--font-body);
	}
	.about-prose p + p {
		margin-top: var(--space-section);
	}
</style>
