<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';
	import SEO from '$lib/blog/components/SEO.svelte';
</script>

<SEO
  title="Things I've Built – Seth Morton"
  description="A few of the products, tools, and systems I've shipped."
  type="website"
  twitterCard="summary_large_image"
/>

<div class="min-h-screen bg-stone-50 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
	<div class="max-w-4xl w-full">
		<!-- Header -->
		<div class="mb-8 sm:mb-12 animate-fade-in-up">
			<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Things I've built</h1>
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				A snapshot of some products and tools I've worked on recently.
			</p>
		</div>

		<!-- Selected work -->
		<div class="mb-8 sm:mb-16 animate-fade-in-up animation-delay-200">
			<h2 class="text-lg font-medium text-gray-900 mb-4 sm:mb-6">Selected work</h2>
			<div class="space-y-4 text-gray-700">
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-300">
					<div class="flex-1 min-w-0">
						<div class="font-medium">Geneloop</div>
						<div class="text-sm text-gray-600">AI-powered sequence design platform.</div>
					</div>
					<a	
						href="https://geneloop.bio"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-400">
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
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-500">
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
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-600">
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
				<div class="flex justify-between items-start gap-4 animate-fade-in-up animation-delay-700">
					<div class="flex-1 min-w-0">
						<div class="font-medium">Quantitative tooling</div>
						<div class="text-sm text-gray-600">Quantitative tools for retail quant community</div>
					</div>
					<a
						href="https://backtestextender.vercel.app"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex-shrink-0"
					>
						<ExternalLink size={16} />
					</a>
				</div>
			</div>
		</div>

		<!-- Back link -->
		<div class="animate-fade-in-up animation-delay-400">
			<p class="text-sm text-gray-500 mb-3">
				I've built over 50 projects; this is just a small sample.
			</p>
			<a
				href="/"
				class="text-blue-600 hover:text-blue-800 text-sm sm:text-base underline decoration-1 underline-offset-2"
			>
				← Back to home
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

	.animation-delay-300 {
		animation-delay: 0.3s;
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
</style>
