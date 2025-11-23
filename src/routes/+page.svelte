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

<div class="min-h-screen bg-stone-50 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
	<div class="max-w-4xl w-full">
		<!-- Header -->
		<div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-16 text-center sm:text-left animate-fade-in-up">
			<div class="overflow-hidden rounded-full flex-shrink-0">
				<img
					src="/seth_image.jpg"
					alt="Seth Morton"
					class="h-16 w-16 sm:h-20 sm:w-20 object-cover"
				/>
			</div>
			<div>
				<h1 class="text-2xl sm:text-4xl font-bold text-gray-900">Seth Morton</h1>
				<p class="text-sm text-gray-500">
					Founder of <a href="https://strand.tools" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 font-medium underline decoration-1 underline-offset-2">Strand</a>
				</p>
			</div>
		</div>

		<!-- Main content -->
		<div class="space-y-6 sm:space-y-8 mb-8 sm:mb-16 animate-fade-in-up animation-delay-200">
			
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				I love learning and systems thinking, especially when it comes to problems in AI and biology. I started my first company at 12, finished CS at Northeastern in my first year, left to study philosophy at Tufts, then dropped out to
				<a
					href="/built"
					class="text-blue-600 hover:text-blue-800 font-medium underline decoration-1 underline-offset-2"
				>
					build
				</a>
				in SF’s biotech scene. My dream is to experience exoplanets and to be part of answering some of life’s biggest questions.
<br><br>
I’m currently working on Strand, an experiment design layer for complex perturbation campaigns. The vision behind Strand is a platform that makes it 100 times easier to design and validate multidimensional interventions for aging and age-related disease.
			</p>
			
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				I write about my experiences and thoughts on my 
				<a href="/blog" class="text-blue-600 hover:text-blue-800 font-medium underline decoration-1 underline-offset-2">
					blog
				</a>.
			</p>
		</div>

		<!-- Selected writing -->
		<div class="mb-8 sm:mb-16 animate-fade-in-up animation-delay-400">
			<h3 class="text-lg font-medium text-gray-900 mb-4 sm:mb-6">Selected writing</h3>
			<div class="space-y-4 text-gray-700">
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-500">
					<div class="flex-1 min-w-0">
						<div class="font-medium">On Growth and the Low-Hanging Fruit of Immortality</div>
						<div class="text-sm text-gray-600">
							Why achieving immortality is closer than you think, and the moral implications of doing so.
						</div>
					</div>
					<a
						href="/blog/on_growth_and_the_low_hanging_fruit_of_immortality"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-600">
					<div class="flex-1 min-w-0">
						<div class="font-medium">Balance</div>
						<div class="text-sm text-gray-600">
							Notes on balancing ambition, health, and relationships.
						</div>
					</div>
					<a
						href="/blog/balance"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-700">
					<div class="flex-1 min-w-0">
						<div class="font-medium">The Black Box of Biology</div>
						<div class="text-sm text-gray-600">
							The differences in building software for biology vs everything else.
						</div>
					</div>
					<a
						href="/blog/the_black_box_of_biology"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-800">
					<div class="flex-1 min-w-0">
						<div class="font-medium">Gratitude &amp; Hyperbolic Discounting</div>
						<div class="text-sm text-gray-600">
							Eescape short-termism and care about tomorrow.
						</div>
					</div>
					<a
						href="/blog/gratitude_&_hyperbolic_discounting"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
			</div>
		</div>

		<!-- Contact -->
		<div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center animate-fade-in-up animation-delay-900">
			<a href="x.com/_sethmorton"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-900 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base"
			>
				Twitter
			</a>
			<a
				href="https://www.linkedin.com/in/seth-morton-118574242"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-900 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base"
			>
				LinkedIn
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
