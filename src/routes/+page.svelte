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

<div class="min-h-screen bg-stone-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-0">
	<div class="max-w-3xl w-full">
		<!-- Header -->
		<div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 sm:mb-16 text-center sm:text-left animate-fade-in-up">
			<div class="overflow-hidden rounded-full flex-shrink-0">
				<img
					src="/seth_image.jpg"
					alt="Seth Morton"
					class="h-16 w-16 sm:h-20 sm:w-20 object-cover"
				/>
			</div>
		</div>

		<!-- Main content -->
		<div class="space-y-6 sm:space-y-8 mb-8 sm:mb-16 animate-fade-in-up animation-delay-200">
			
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				I love learning and systems thinking, especially when it comes to problems in AI and biology. I started my first company at 12, finished CS at Northeastern in year one, left for philosophy at Tufts, then dropped out to build in SF’s biotech scene. My mission is to see exoplanets and to be a part of answering some of life's biggest questions. I'm currently working on Strand, an experiment design layer for complex perturbation campaigns. My goal is to create a platform that makes it a 100x easier to design and validate multi-dimensional interventions for aging and age related disease.
			</p>
			
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				I write about my experiences and thoughts on my 
				<a href="/blog" class="text-blue-600 hover:text-blue-800 font-medium underline decoration-1 underline-offset-2">
					blog
				</a>.
			</p>
		</div>

		<!-- Selected work -->
		<div class="mb-8 sm:mb-16 animate-fade-in-up animation-delay-400">
			<h3 class="text-lg font-medium text-gray-900 mb-4 sm:mb-6">Selected work</h3>
			<div class="space-y-4 text-gray-700">
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-500">
					<div class="flex-1 min-w-0">
						<div class="font-medium">DNA Tiny World</div>
						<div class="text-sm text-gray-600">First benchmark for DNA foundational models</div>
					</div>
					<a
						href="https://huggingface.co/datasets/sethmorton/dna-tiny-world"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-600">
					<div class="flex-1 min-w-0">
						<div class="font-medium">FinTech platform</div>
						<div class="text-sm text-gray-600">Led engineering team, 8 paying businesses</div>
					</div>
					<a
						href="https://renavestapp.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-700">
					<div class="flex-1 min-w-0">
						<div class="font-medium">Border analytics dashboard</div>
						<div class="text-sm text-gray-600">Policy tool for regional head of CBP</div>
					</div>
					<a
						href="https://borderdashboard.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-800">
					<div class="flex-1 min-w-0">
						<div class="font-medium">Quantitative tooling</div>
						<div class="text-sm text-gray-600">Quantitative tools for retail quant community</div>
					</div>
					<a
						href="backtestextender.vercel.app"
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
</style>
