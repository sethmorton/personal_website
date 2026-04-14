<script lang="ts">
	import { Mail, ExternalLink } from 'lucide-svelte';
	import SEO from '$lib/blog/components/SEO.svelte';
</script>

<SEO
	title="Seth Morton"
	description="Infovore, pursuing exoplanets and eudamonia."
	type="website"
	twitterCard="summary_large_image"
/>

<div class="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-10 sm:px-6 sm:py-16">
	<div class="w-full max-w-4xl">
		<!-- Header -->
		<div
			class="animate-fade-in-up mb-8 flex flex-col items-center gap-4 text-center sm:mb-16 sm:flex-row sm:gap-6 sm:text-left"
		>
			<div class="flex-shrink-0 overflow-hidden rounded-full">
				<img
					src="/seth_image.jpg"
					alt="Seth Morton"
					class="h-16 w-16 object-cover sm:h-20 sm:w-20"
				/>
			</div>
			<div>
				<h1 class="text-2xl font-bold text-gray-900 sm:text-4xl">Seth Morton</h1>
				<p class="text-sm text-gray-500">
					Founder of <a
						href="https://onfluxlabs.com"
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800"
						>Onflux</a
					>
				</p>
			</div>
		</div>

		<!-- Main content -->
		<div class="animate-fade-in-up animation-delay-200 mb-8 space-y-6 sm:mb-16 sm:space-y-8">
			<p class="text-base leading-relaxed text-gray-700 sm:text-lg">
				I love learning and systems thinking, especially when it comes to problems in AI and
				biology. I started my first company at 12, finished CS at Northeastern in my first year,
				left to study philosophy at Tufts, then dropped out to
				<a
					href="/built"
					class="font-medium text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800"
				>
					build
				</a>
				in SF’s biotech scene. My dream is to experience exoplanets and to be part of answering some
				of life’s biggest questions.
				<br /><br />
				I’m currently working on superintelligence with thermodynamic chips.
			</p>

			<p class="text-base leading-relaxed text-gray-700 sm:text-lg">
				I write about my experiences and thoughts on my
				<a
					href="/blog"
					class="font-medium text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800"
				>
					blog
				</a>.
			</p>
		</div>

		<!-- Selected writing -->
		<div class="animate-fade-in-up animation-delay-400 mb-8 sm:mb-16">
			<h3 class="mb-4 text-lg font-medium text-gray-900 sm:mb-6">Selected writing</h3>
			<div class="space-y-4 text-gray-700">
				<div class="animate-fade-in-up animation-delay-500 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">Memory Isn't Learning</div>
						<div class="text-sm text-gray-600">
							Why AI systems that don't change from experience can't keep up with the world.
							Thermodynamics and real learning.
						</div>
					</div>
					<a
						href="/blog/memory_isnt_learning"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-600 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">On Growth and the Low-Hanging Fruit of Immortality</div>
						<div class="text-sm text-gray-600">
							Achieving immortality is closer than you might think, and what does growth mean when
							it's no longer constrained by time?
						</div>
					</div>
					<a
						href="/blog/on_growth_and_the_low_hanging_fruit_of_immortality"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-700 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">Biotech has a Distribution Problem</div>
						<div class="text-sm text-gray-600">
							Why promising biotech work doesn't spread, and how to fix the barriers keeping
							frontier AI talent and young people out.
						</div>
					</div>
					<a
						href="/blog/biotech_has_a_distribution_problem"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-800 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">The Black Box of Biology</div>
						<div class="text-sm text-gray-600">
							The differences in building software for biology vs software for everything else.
						</div>
					</div>
					<a
						href="/blog/the_black_box_of_biology"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-900 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">Balance</div>
						<div class="text-sm text-gray-600">
							Why balance is a fallacy and why you should embrace the yin and yang of life.
						</div>
					</div>
					<a
						href="/blog/balance"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
			</div>
		</div>

		<!-- Contact -->
		<div
			class="animate-fade-in-up animation-delay-1000 flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
		>
			<a
				href="https://x.com/_sethmorton"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-gray-900 transition-colors duration-200 hover:text-blue-600 sm:text-base"
			>
				Twitter
			</a>
			<a
				href="https://www.linkedin.com/in/seth-morton-118574242"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-gray-900 transition-colors duration-200 hover:text-blue-600 sm:text-base"
			>
				LinkedIn
			</a>
			<a
				href="mailto:sethmorton05@gmail.com"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-gray-900 transition-colors duration-200 hover:text-blue-600 sm:text-base"
			>
				Email
			</a>
		</div>
	</div>
</div>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.8s ease-out forwards;
		opacity: 0;
	}

	.animation-delay-200 {
		animation-delay: 0.2s;
	}

	.animation-delay-400 {
		animation-delay: 0.4s;
	}

	.animation-delay-500 {
		animation-delay: 0.5s;
	}

	.animation-delay-600 {
		animation-delay: 0.6s;
	}

	.animation-delay-700 {
		animation-delay: 0.7s;
	}

	.animation-delay-800 {
		animation-delay: 0.8s;
	}

	.animation-delay-900 {
		animation-delay: 0.9s;
	}

	.animation-delay-1000 {
		animation-delay: 1s;
	}

	/* Ensure animations work on mobile */
	@media (prefers-reduced-motion: reduce) {
		.animate-fade-in-up {
			animation: none;
			opacity: 1;
		}
	}

	/* Lock page scroll on large screens only */
	@media (min-width: 1024px) and (min-height: 900px) {
		:global(body) {
			overflow-y: hidden;
		}
	}
</style>
