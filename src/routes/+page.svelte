<script lang="ts">
	import { Mail, ExternalLink } from 'lucide-svelte';
</script>

<div class="h-screen bg-stone-50 flex items-center justify-center px-6">
	<div class="max-w-3xl w-full">
		<!-- Header -->
		<div class="flex items-center gap-6 mb-16">
			<div class="overflow-hidden rounded-full">
				<img
					src="/seth_image.webp"
					alt="Seth Morton"
					class="h-20 w-20 object-cover"
				/>
			</div>
			<div>
				<h1 class="text-4xl font-bold text-gray-900">Seth Morton</h1>
				<p class="text-gray-600 mt-1">CTO @ Geneloop</p>
			</div>
		</div>

		<!-- Main content -->
		<div class="space-y-8 mb-16">
			<p class="text-xl text-gray-800 leading-relaxed">
				I'm building 
				<a href="https://geneloop.bio" target="_blank" rel="noopener noreferrer" 
				   class="text-blue-600 hover:text-blue-800 font-medium underline decoration-1 underline-offset-2">
					Geneloop
				</a> 
				to automate synthetic biology.
			</p>
			
			<p class="text-lg text-gray-700 leading-relaxed">
				In the past, I've enjoyed working on government tech, AI/ML, fintech, edtech, and cleantech. I studied CS and Philosophy at various places but dropped out to focus on building.
			</p>
			
			<p class="text-lg text-gray-700 leading-relaxed">
				I also write about my experiences and thoughts on my 
				<a href="/blog" class="text-blue-600 hover:text-blue-800 font-medium underline decoration-1 underline-offset-2">
					blog
				</a>.
			</p>
		</div>

		<!-- Selected work -->
		<div class="mb-16">
			<h3 class="text-lg font-medium text-gray-900 mb-6">Selected work</h3>
			<div class="space-y-4 text-gray-700">
				<div class="flex justify-between items-start">
					<div>
						<div class="font-medium">Medical AI agent</div>
						<div class="text-sm text-gray-600">Solved a 4-year health issue when doctors couldn't</div>
					</div>
					<a
						href="https://lifelogic.sethmorton.xyz/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start">
					<div>
						<div class="font-medium">FinTech platform</div>
						<div class="text-sm text-gray-600">Led engineering team, 8 paying businesses</div>
					</div>
					<a
						href="https://renavestapp.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start">
					<div>
						<div class="font-medium">Border analytics dashboard</div>
						<div class="text-sm text-gray-600">Policy tool for CBP operations</div>
					</div>
					<a
						href="https://borderdashboard.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
					>
						<ExternalLink size={16} />
					</a>
				</div>
				<div class="flex justify-between items-start">
					<div>
						<div class="font-medium">Trading algorithms</div>
						<div class="text-sm text-gray-600">Quantitative tools for retail community</div>
					</div>
					<a
						href="https://66ec9beaa642520009159636--splendorous-basbousa-4eb04f.netlify.app/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
					>
						<ExternalLink size={16} />
					</a>
				</div>
			</div>
		</div>

		<!-- Contact -->
		<div class="flex gap-8 items-center">
			<a
				href="mailto:seth@geneloop.bio"
				class="inline-flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-200"
			>
				<Mail size={18} />
				seth@geneloop.bio
			</a>
			<a
				href="https://www.linkedin.com/in/seth-morton-118574242"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-900 hover:text-blue-600 transition-colors duration-200"
			>
				LinkedIn
			</a>
		</div>
	</div>
</div>
<style>
	
</style>