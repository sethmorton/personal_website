<script lang="ts">
	import ContentLink from '$lib/components/ContentLink.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import SEO from '$lib/blog/components/SEO.svelte';

	const writing = [
		{
			title: 'The Shape of Inference',
			description:
				'How new evidence changes what came before, and why reasoning needs a persistent, revisable state.',
			href: '/blog/the_shape_of_inference'
		},
		{
			title: 'The Geometry of Surprise',
			description:
				'Why curiosity methods collapse prediction error into one number, what that costs for continual learning, and how a settling substrate could preserve the shape of surprise.',
			href: '/blog/the_geometry_of_surprise'
		},
		{
			title: 'On Growth and the Low-Hanging Fruit of Immortality',
			description:
				"Achieving immortality is closer than you might think, and what does growth mean when it's no longer constrained by time?",
			href: '/blog/on_growth_and_the_low_hanging_fruit_of_immortality'
		},
		{
			title: 'What You Attend To Cannot Be Static',
			description:
				'Why fixed attention keeps models from learning continuously, and how thermodynamic computing could let them adapt in real time.',
			href: '/blog/what_you_attend_to_cannot_be_static'
		},
		{
			title: 'The Black Box of Biology',
			description:
				'The differences in building software for biology vs software for everything else.',
			href: '/blog/the_black_box_of_biology'
		}
	];
</script>

<SEO
	title="Seth Morton"
	description="Seth Morton — founder and engineer exploring AI, biology, continual learning, and thermodynamic computation. Essays, projects, and research."
	type="website"
	twitterCard="summary_large_image"
/>

<main class="home-shell">
	<div class="home-content">
		<section class="introduction" aria-labelledby="name">
			<div class="intro-copy">
				<header>
					<img class="portrait" src="/seth_image.jpg" alt="Seth Morton" width="56" height="56" />
					<h1 id="name">Seth Morton</h1>
				</header>
				<div class="bio">
					<p>
						I love learning and systems thinking, especially when it comes to problems in AI and
						biology. I started my first company at 12, finished CS at Northeastern in my first year,
						left to study philosophy at Tufts, then dropped out to <a href="/built">build</a>
						in SF’s biotech scene. My dream is to experience exoplanets and to be part of answering some
						of life’s biggest questions.
					</p>
					<p>
						I’m currently working on the next era of AI with
						<a href="https://extropic.ai" target="_blank" rel="noopener noreferrer"
							>thermodynamic chips</a
						>.
					</p>
					<p>
						I write about my experiences and thoughts on my <a href="/blog">blog</a>.
					</p>
				</div>
			</div>
			<div class="illustration" aria-hidden="true">
				<img
					src="/illustrations/branching-prussian.webp"
					alt=""
					width="1086"
					height="1448"
					fetchpriority="high"
				/>
			</div>
		</section>

		<section class="writing" aria-labelledby="writing-heading">
			<div class="section-heading">
				<h2 id="writing-heading">Selected writing</h2>
				<a href="/blog">All writing <ArrowUpRight size={14} strokeWidth={1.5} /></a>
			</div>
			<ul>
				{#each writing as article}
					<li>
						<ContentLink
							href={article.href}
							title={article.title}
							description={article.description}
							external
						/>
					</li>
				{/each}
			</ul>
		</section>

		<footer>
			<a href="https://x.com/_sethmorton" target="_blank" rel="noopener noreferrer">Twitter</a>
			<a
				href="https://www.linkedin.com/in/seth-morton-118574242"
				target="_blank"
				rel="noopener noreferrer">LinkedIn</a
			>
			<a
				href="https://mail.google.com/mail/?view=cm&fs=1&to=sethmorton05@gmail.com"
				target="_blank"
				rel="noopener noreferrer">Email</a
			>
		</footer>
	</div>
</main>

<style>
	.home-shell {
		min-height: 100svh;
		padding: 52px 40px 36px;
		background: var(--paper);
		color: var(--ink);
	}

	.home-content {
		max-width: var(--page-width);
		width: 100%;
		margin: 0 auto;
	}

	.introduction {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 170px;
		align-items: center;
		gap: 32px;
		margin-bottom: 44px;
	}

	header {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 32px;
	}

	.portrait {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		object-fit: cover;
	}

	h1 {
		font-family: var(--font-display);
		font-size: var(--text-home-title);
		font-weight: 400;
		line-height: 1.08;
		letter-spacing: -0.055em;
	}

	.bio {
		font-size: var(--text-home-body);
		line-height: 1.8;
	}

	.bio p + p {
		margin-top: 20px;
	}

	.bio a {
		color: var(--blue);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 4px;
	}

	.illustration {
		max-width: 170px;
		justify-self: end;
		mix-blend-mode: multiply;
	}

	.illustration img {
		display: block;
		width: 100%;
		height: auto;
	}

	.section-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding-bottom: 14px;
		border-bottom: 1px solid var(--rule);
		font-family: var(--font-ui);
		font-size: var(--text-ui);
	}

	h2 {
		font-size: inherit;
		font-weight: 500;
		color: var(--muted);
	}

	.section-heading a {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		color: var(--blue);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	footer a:hover,
	.bio a:hover {
		color: var(--blue);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	footer {
		display: flex;
		gap: 28px;
		padding-top: 26px;
		font-family: var(--font-ui);
		font-size: var(--text-ui);
	}

	@media (max-width: 800px) {
		.home-shell {
			padding: 48px 28px 32px;
		}
		.introduction {
			gap: 24px;
			grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
		}
		header {
			gap: 14px;
		}
		.portrait {
			width: 44px;
			height: 44px;
		}
		h1 {
			font-size: var(--text-home-title);
		}
		.bio {
			font-size: var(--text-home-body);
		}
	}

	@media (max-width: 600px) {
		.home-shell {
			padding: 36px 24px 28px;
		}
		.introduction {
			grid-template-columns: 1fr;
			gap: 26px;
			margin-bottom: 32px;
		}
		header {
			margin-bottom: 28px;
		}
		h1 {
			font-size: var(--text-home-title);
		}
		.illustration {
			width: 190px;
			justify-self: center;
		}
		.bio {
			font-size: var(--text-home-body);
			line-height: 1.8;
		}
	}

	.intro-copy {
		animation: site-enter var(--motion-enter) var(--ease-out) both;
	}
	.illustration {
		animation: site-enter var(--motion-enter) 80ms var(--ease-out) both;
	}
	.writing {
		animation: site-enter var(--motion-enter) 140ms var(--ease-out) both;
	}
	footer {
		animation: site-enter var(--motion-enter) 200ms var(--ease-out) both;
	}
	footer a,
	.bio a,
	.section-heading a {
		transition:
			color var(--motion-fast),
			text-decoration-color var(--motion-fast);
	}
	footer a {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 4px;
	}
	footer a:hover {
		text-decoration-color: var(--blue);
	}

	/* Fit desktop windows through spacing, while retaining natural scrolling on
	   phones, short windows, and zoomed layouts. Never clip content or lock body. */
	@media (min-width: 1024px) and (min-height: 700px) {
		.home-shell {
			display: grid;
			align-items: center;
			height: 100vh;
			padding: clamp(20px, 3vh, 44px) 40px;
		}
		.home-content {
			--entry-space: clamp(6px, 0.9vh, 12px);
			--entry-title-size: clamp(18px, 2.15vh, var(--text-entry));
			--entry-description-size: clamp(13px, 1.55vh, var(--text-ui));
			display: grid;
			grid-template-rows: auto auto auto;
			gap: clamp(16px, 2.5vh, 28px);
		}
		.introduction {
			margin-bottom: 0;
			grid-template-columns: minmax(0, 1fr) 170px;
			gap: 32px;
		}
		header {
			margin-bottom: clamp(14px, 2vh, 26px);
		}
		h1 {
			font-size: var(--text-home-title);
		}
		.bio {
			font-size: var(--text-home-body);
			line-height: 1.65;
		}
		.bio p + p {
			margin-top: clamp(12px, 1.8vh, 20px);
		}
		.illustration {
			width: min(100%, 23vh);
		}
		.section-heading {
			padding-bottom: clamp(10px, 1.2vh, 14px);
		}
		footer {
			padding-top: 0;
			align-self: end;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro-copy,
		.illustration,
		.writing,
		footer {
			animation: none;
		}
		footer a,
		.bio a,
		.section-heading a {
			transition: none;
		}
	}
</style>
