<script lang="ts">
	import { Mail, ExternalLink } from 'lucide-svelte';
  import SEO from '$lib/blog/components/SEO.svelte';
</script>

<SEO
  title="Seth Morton — CTO @ GeneLoop"
  description="I build reliable, scalable systems and tools for scientists. Currently CTO at GeneLoop, automating synthetic biology."
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
			<div>
				<h1 class="text-2xl sm:text-4xl font-bold text-gray-900">Seth Morton</h1>
				<p class="text-gray-600 mt-1">CTO @ GeneLoop</p>
			</div>
		</div>

		<!-- Main content -->
		<div class="space-y-6 sm:space-y-8 mb-8 sm:mb-16 animate-fade-in-up animation-delay-200">
			<p class="text-lg sm:text-xl text-gray-800 leading-relaxed">
				I'm building 
				<a href="https://geneloop.bio" target="_blank" rel="noopener noreferrer" 
				   class="text-blue-600 hover:text-blue-800 font-medium underline decoration-1 underline-offset-2">
					Geneloop
				</a> 
				to automate synthetic biology.
			</p>
			
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				In the past, I've enjoyed working on government tech, AI/ML, fintech, edtech, and cleantech. I studied CS and Philosophy at various places but dropped out to focus on building.
			</p>
			
			<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
				I also write about my experiences and thoughts on my 
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
						<div class="font-medium">Medical AI agent</div>
						<div class="text-sm text-gray-600">Solved a 4-year health issue when doctors couldn't</div>
					</div>
					<a
						href="https://lifelogic-git-main-seths-projects-9d8cfc69.vercel.app/"
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
						<div class="text-sm text-gray-600">Policy tool for CBP operations</div>
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
						<div class="font-medium">Trading algorithms</div>
						<div class="text-sm text-gray-600">Quantitative tools for retail community</div>
					</div>
					<a
						href="https://66ec9beaa642520009159636--splendorous-basbousa-4eb04f.netlify.app/"
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
			<a
				href="mailto:seth@geneloop.bio"
				class="inline-flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-200"
			>
				<Mail size={18} />
				<span class="text-sm sm:text-base">seth@geneloop.bio</span>
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
