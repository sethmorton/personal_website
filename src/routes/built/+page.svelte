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

<div class="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-10 sm:px-6 sm:py-16">
	<div class="w-full max-w-4xl">
		<!-- Header -->
		<div class="animate-fade-in-up mb-8 sm:mb-12">
			<h1 class="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">Things I've built</h1>
			<p class="text-base leading-relaxed text-gray-700 sm:text-lg">
				A snapshot of some products and tools I've worked on recently.
			</p>
		</div>

		<!-- Selected work -->
		<div class="animate-fade-in-up animation-delay-200 mb-8 sm:mb-16">
			<h2 class="mb-4 text-lg font-medium text-gray-900 sm:mb-6">Selected work</h2>
			<div class="space-y-4 text-gray-700">
				<div class="animate-fade-in-up animation-delay-300 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">Geneloop</div>
						<div class="text-sm text-gray-600">AI-powered sequence design platform.</div>
					</div>
					<a
						href="https://geneloop.bio"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-400 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">DNA Tiny World</div>
						<div class="text-sm text-gray-600">First benchmark for DNA foundational models</div>
					</div>
					<a
						href="https://huggingface.co/datasets/sethmorton/dna-tiny-world"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-500 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">FinTech platform</div>
						<div class="text-sm text-gray-600">Led engineering team, 8 paying businesses</div>
					</div>
					<a
						href="https://renavestapp.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-600 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">Border analytics dashboard</div>
						<div class="text-sm text-gray-600">Policy tool for regional head of CBP</div>
					</div>
					<a
						href="https://borderdashboard.com"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="animate-fade-in-up animation-delay-700 flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="font-medium">Quantitative tooling</div>
						<div class="text-sm text-gray-600">Quantitative tools for retail quant community</div>
					</div>
					<a
						href="https://backtestextender.vercel.app"
						target="_blank"
						rel="noopener noreferrer"
						class="flex-shrink-0 text-blue-600 transition-colors duration-200 hover:text-blue-800"
					>
						<ExternalLink size={16} />
					</a>
				</div>
			</div>
		</div>

		<!-- Back link -->
		<div class="animate-fade-in-up animation-delay-400">
			<p class="mb-3 text-sm text-gray-500">
				I've built over 50 projects; this is just a small sample.
			</p>
			<a
				href="/"
				class="text-sm text-blue-600 underline decoration-1 underline-offset-2 hover:text-blue-800 sm:text-base"
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
