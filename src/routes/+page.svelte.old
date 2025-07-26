<script lang="ts">
	import Hackathons from '$lib/components/Hackathons.svelte';
	import {
		Github,
		ExternalLink,
		Mail,
		Linkedin,
		Bike,
		Coffee,
		Book,
		Code,
		Trophy,
		Lightbulb,
		X,
		Menu,
		FileText,
		Brain,
		Zap,
		Target,
		Users,
		TrendingUp,
		MessageCircle
	} from 'lucide-svelte';
	import WorkExperience from '$lib/components/WorkExperience.svelte';
	import { projects, type Project } from '$lib/data/projects';

	let hoveredIcon = $state(null as string | null);
	let hoveredProject = $state(null as number | null);
	let isOpen = $state(false);
</script>

<div class="flex min-h-screen flex-col">
	<nav class="border-b border-gray-100 bg-white/80 backdrop-blur">
		<!-- Mobile menu button -->
		<div class="flex justify-between px-4 py-4 md:hidden">
			<button onclick={() => (isOpen = !isOpen)} class="p-2">
				{#if isOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>

		<!-- Desktop nav -->
		<div class="hidden justify-center gap-5 py-4 md:flex">
			<a href="#about" class="p-2.5 hover:text-gray-500">about</a>
			<a href="#services" class="p-2.5 hover:text-gray-500">ai consulting</a>
			<a href="#experience" class="p-2.5 hover:text-gray-500">experience</a>
			<a href="#projects" class="p-2.5 hover:text-gray-500">projects</a>
			<a href="/blog" class="p-2.5 hover:text-gray-500">blog</a>
		</div>

		<!-- Mobile menu -->
		{#if isOpen}
			<div class="px-4 py-2 md:hidden">
				<a href="#about" class="block py-2 hover:text-gray-500">about</a>
				<a href="#services" class="block py-2 hover:text-gray-500">ai consulting</a>
				<a href="#experience" class="block py-2 hover:text-gray-500">experience</a>
				<a href="#projects" class="block py-2 hover:text-gray-500">projects</a>
				<a href="/blog" class="block py-2 hover:text-gray-500">blog</a>
			</div>
		{/if}
	</nav>

	<main class="flex flex-1 flex-col items-center px-4">
		<div class="w-full max-w-4xl">
			<!-- Hero Section -->
			<section
				class="flex min-h-[80vh] flex-col items-center justify-center px-4 py-8 md:px-0 md:py-16"
			>
				<div class="flex flex-col items-center space-y-4 md:space-y-6">
					<!-- Profile Image -->
					<div class="mb-4 overflow-hidden rounded-full border-4 border-gray-100 shadow-lg md:mb-6">
						<img
							src="/seth_image.webp"
							alt="Seth Morton"
							class="h-24 w-24 object-cover md:h-32 md:w-32"
						/>
					</div>

					<!-- Main Text -->
					<div class="text-center">
						<h1
							class="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl"
						>
							Hi, I'm Seth Morton
						</h1>
						<div class="mt-4 space-y-2 md:mt-6 md:space-y-3">
							<p class="text-base font-medium text-gray-800 md:text-lg">
								CTO & Automation Expert | I love helping people and businesses work smarter, not harder
							</p>
							<p class="text-base text-gray-600 md:text-lg">
								Tired of hearing how everyone's using AI but you don't see the hype? 
								I totally get it. Most people think it's just ChatGPT, but there's so much more we can do together.
							</p>
						</div>
					</div>

					<!-- CTA Button -->
					<div class="mt-6 md:mt-8">
						<a
							href="mailto:seth@renavestapp.com?subject=Let's chat about automation for my business"
							class="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
						>
							<MessageCircle size={20} />
							<span>Let's chat about what's possible</span>
						</a>
					</div>

					<!-- Social Links -->
					<div class="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-6">
						<a
							href="mailto:seth@renavestapp.com"
							class="group flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 md:px-5"
							onmouseenter={() => (hoveredIcon = 'mail')}
							onmouseleave={() => (hoveredIcon = null)}
						>
							<Mail size={20} />
							<span class="text-xs font-medium md:text-sm">Email</span>
						</a>
						<a
							href="https://www.linkedin.com/in/seth-morton-118574242/"
							class="group flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 md:px-5"
							onmouseenter={() => (hoveredIcon = 'linkedin')}
							onmouseleave={() => (hoveredIcon = null)}
						>
							<Linkedin size={20} />
							<span class="text-xs font-medium md:text-sm">LinkedIn</span>
						</a>
					</div>
				</div>
			</section>

			<!-- AI Consulting Services Section -->
			<section id="services" class="py-16">
				<h2 class="mb-8 text-center text-3xl font-bold">How we can work together</h2>
				
				<!-- Workflow Diagram -->
				<div class="mb-12 flex justify-center">
					<div class="flex items-center gap-6 rounded-lg bg-gray-50 p-8 md:gap-10">
						<div class="flex flex-col items-center">
							<div class="mb-2 rounded-lg bg-indigo-100 p-4">
								<Brain class="text-indigo-600" size={32} />
							</div>
							<span class="text-sm font-medium text-gray-700">Model</span>
						</div>
						<div class="flex items-center justify-center text-gray-400">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="flex flex-col items-center">
							<div class="mb-2 rounded-lg bg-purple-100 p-4">
								<Code class="text-purple-600" size={32} />
							</div>
							<span class="text-sm font-medium text-gray-700">System Prompt</span>
						</div>
						<div class="flex items-center justify-center text-gray-400">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="flex flex-col items-center">
							<div class="mb-2 rounded-lg bg-green-100 p-4">
								<Zap class="text-green-600" size={32} />
							</div>
							<span class="text-sm font-medium text-gray-700">Tools</span>
						</div>
						<div class="flex items-center justify-center text-gray-400">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<div class="flex flex-col items-center">
							<div class="mb-2 rounded-lg bg-amber-100 p-4">
								<Users class="text-amber-600" size={32} />
							</div>
							<span class="text-sm font-medium text-gray-700">You</span>
						</div>
					</div>
				</div>

				<div class="text-center mb-12">
					<p class="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
						Most people think automation is just: Model → You. Ask ChatGPT a question, get an answer, done.
					</p>
					<p class="text-lg text-gray-600 max-w-3xl mx-auto">
						But this is what thoughtful automation actually looks like. Not just prompting, but building systems 
						that handle the tedious stuff so you can focus on what you love, whether that's growing your business or enjoying your life.
					</p>
				</div>

				<!-- Simple Service List -->
				<div class="max-w-2xl mx-auto space-y-8">
					<div class="flex items-start gap-4">
						<div class="rounded-full bg-indigo-100 p-2 mt-1">
							<Target class="text-indigo-600" size={20} />
						</div>
						<div>
							<h3 class="text-xl font-semibold mb-2">Strategy & Planning</h3>
							<p class="text-gray-600">Let's figure out where automation can save you the most time and energy. I'll help you spot the opportunities that will actually make a difference in your day.</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="rounded-full bg-purple-100 p-2 mt-1">
							<Zap class="text-purple-600" size={20} />
						</div>
						<div>
							<h3 class="text-xl font-semibold mb-2">Custom Implementation</h3>
							<p class="text-gray-600">We'll build intelligent systems that handle your repetitive tasks. From customer service automation to content creation, let's automate the stuff that's eating your time.</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="rounded-full bg-green-100 p-2 mt-1">
							<Users class="text-green-600" size={20} />
						</div>
						<div>
							<h3 class="text-xl font-semibold mb-2">Training & Support</h3>
							<p class="text-gray-600">I believe in teaching you to build these systems yourself, not just handing you solutions. I'll show you and your team how to create and maintain these workflows so you can be completely self-sufficient.</p>
						</div>
					</div>
				</div>

				<!-- CTA Section -->
				<div class="mt-16 text-center">
					<div class="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
						<h3 class="mb-4 text-2xl font-bold">Curious what this could look like for you?</h3>
						<p class="mb-6 text-gray-600">
							Every business and workflow is unique. Let's hop on a friendly call and explore 
							where you're spending time on stuff that could be automated.
						</p>
						<div class="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
							<a
								href="mailto:seth@renavestapp.com?subject=I'm curious about automation for my business"
								class="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white font-semibold transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
							>
								<Mail size={20} />
								<span>I'm curious - let's talk</span>
							</a>
							<a
								href="https://www.linkedin.com/in/seth-morton-118574242/"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full border border-indigo-600 px-6 py-3 text-indigo-600 font-semibold transition-all duration-300 hover:bg-indigo-600 hover:text-white"
							>
								<Linkedin size={20} />
								<span>Or connect on LinkedIn</span>
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- What I've Built Section -->
			<section id="glance" class="py-16">
				<h2 class="mb-12 text-center text-3xl font-bold">AI-Powered Solutions That Drive Results</h2>
				<div class="space-y-8">
					<a
						href="https://www.renavestapp.com/"
						target="_blank"
						rel="noopener noreferrer"
						class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
					>
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center">
								<img src="renavest-logo.png" alt="Renavest Logo" class="mr-4 h-8 w-8" />
								<h3 class="text-xl font-semibold group-hover:text-indigo-600">
									CTO @ Renavest
								</h3>
							</div>
							<span class="text-sm text-gray-500">May 2024 - Present (CTO since Mar 2025)</span>
						</div>
						<p class="mb-4 text-gray-600">
							Leading product and engineering for a marketplace connecting financial therapists with employees. 
							Built platform that secured 5 enterprise contracts and growing user base.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
								>React Native</span
							>
							<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
								>Next.js</span
							>
							<span class="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
								>AWS</span
							>
							<span class="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
								>AI Integration</span
							>
						</div>
						<div class="mt-4 flex items-center space-x-2 text-indigo-600">
							<span class="text-sm font-medium">View Website</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-1"
							>
								<path
									fill-rule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</div>
					</a>

					<a
						href="https://digestibletext.com"
						target="_blank"
						rel="noopener noreferrer"
						class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
					>
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-xl font-semibold group-hover:text-indigo-600">DigestibleText</h3>
							<span class="text-sm text-gray-500">Sep 2024 - Present</span>
						</div>
						<p class="mb-4 text-gray-600">
							AI-powered text processing tool serving 30+ active users. Transforms dense, complex content into 
							digestible formats while preserving meaning, solving real productivity challenges for students and professionals.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800"
								>AI/ML</span
							>
							<span class="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
								>SvelteKit</span
							>
							<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
								>PostgreSQL</span
							>
						</div>
						<div class="mt-4 flex items-center space-x-2 text-indigo-600">
							<span class="text-sm font-medium">View Website</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-1"
							>
								<path
									fill-rule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</div>
					</a>

					<a
						href="https://embeddit.vercel.app"
						target="_blank"
						rel="noopener noreferrer"
						class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
					>
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-xl font-semibold group-hover:text-indigo-600">Embeddit</h3>
							<span class="text-sm text-gray-500">Oct 2024, HackHarvard Winner</span>
						</div>
						<p class="mb-4 text-gray-600">
							Award-winning AI-powered Reddit analyzer using advanced RAG architecture. Makes community insights 
							accessible through natural language conversations, demonstrating practical applications of cutting-edge AI.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
								>RAG/Vector DB</span
							>
							<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
								>OpenAI</span
							>
							<span class="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
								>PineconeDB</span
							>
						</div>
						<div class="mt-4 flex items-center space-x-2 text-indigo-600">
							<span class="text-sm font-medium">View Website</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-1"
							>
								<path
									fill-rule="evenodd"
									d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</div>
					</a>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<a
							href="https://bajabound.com"
							target="_blank"
							rel="noopener noreferrer"
							class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
						>
							<div class="mb-4 flex items-center justify-between">
								<div class="flex items-center">
									<img src="bajabound-logo.png" alt="BajaBound Logo" class="mr-4 h-6 w-6" />
									<h3 class="text-xl font-semibold group-hover:text-indigo-600">
										SWE @ BajaBound
									</h3>
								</div>
								<span class="text-sm text-gray-500">Jan 2020 - Aug 2023</span>
							</div>
							<p class="mb-4 text-gray-600">
								Built analytics platform handling 150k+ monthly visits. Created automated testing framework 
								that cut QA cycle time from 3 weeks to 1 week, demonstrating measurable efficiency gains.
							</p>
							<div class="flex flex-wrap gap-2">
								<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
									>TypeScript</span
								>
								<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
									>GCP</span
								>
								<span class="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
									>Automation</span
								>
							</div>
							<div class="mt-4 flex items-center space-x-2 text-indigo-600">
								<span class="text-sm font-medium">View Website</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-1"
								>
									<path
										fill-rule="evenodd"
										d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
						</a>

						<a
							href="https://backtestextend.xyz"
							target="_blank"
							rel="noopener noreferrer"
							class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
						>
							<div class="mb-4 flex items-center justify-between">
								<h3 class="text-xl font-semibold group-hover:text-indigo-600">Backtest Extender</h3>
								<span class="text-sm text-gray-500">Jul 2024 - Present</span>
							</div>
							<p class="mb-4 text-gray-600">
								Automated ETF analytics tool serving 50+ algorithmic traders. Eliminates hours of manual research 
								with intelligent correlation analysis, turning tedious work into instant insights.
							</p>
							<div class="flex flex-wrap gap-2">
								<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
									>TypeScript</span
								>
								<span class="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800"
									>SvelteKit</span
								>
								<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
									>Financial ML</span
								>
							</div>
							<div class="mt-4 flex items-center space-x-2 text-indigo-600">
								<span class="text-sm font-medium">View Website</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-1"
								>
									<path
										fill-rule="evenodd"
										d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
						</a>
					</div>

					<div class="mt-12 text-center">
						<a
							href="mailto:seth@renavestapp.com?subject=Let's discuss automation for my business"
							class="inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold leading-5 text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Curious what automation could do for you? Let's chat!
						</a>
					</div>
				</div>
			</section>

			<!-- About Section -->
			<section id="about" class="py-16">
				<h2 class="mb-8 text-2xl font-bold">Why I love helping people work smarter</h2>
				<div class="space-y-4 text-gray-600">
					<p>
						Hello! I'm Seth, a software engineer from San Diego now studying in Boston. My journey started at 12 when I built my first photography website to bypass expensive hosting fees - a small decision that sparked a lifelong passion for creating meaningful technology.
					</p>
					<p>
						Since then, I've built over 40 projects and worked with fantastic teams at Smart Border Coalition, BajaBound, and now Renavest, where I'm working to make financial therapy more accessible. What drives me? Using technology to solve real problems that matter. I love being at the cutting edge of technology and figuring out what's possible before everyone else catches on.
					</p>
					<p>
						At Tufts, I'm combining Computer Science with Philosophy because I believe the biggest challenges need both technical skills and deep thinking. When I'm not coding, you'll find me running through Boston, watching economic and policy YT videos, or listening to Prof G Markets while planning my next project.
					</p>
				</div>
			</section>
			
			<!-- Experience Section - Reframed for Consultancy -->
			<section id="experience" class="py-16">
				<h2 class="mb-8 text-2xl font-bold">Proven track record of implementation</h2>
				<div class="mb-8 text-gray-600">
					<p>
						Here's how I've helped teams and companies leverage modern tools to solve real business problems 
						and drive measurable results:
					</p>
				</div>
				<WorkExperience />
			</section>

			<!-- Hackathons Section - Reframed as Innovation -->
			<section id="innovation" class="py-16">
				<h2 class="mb-8 text-2xl font-bold">Rapid prototyping & innovation</h2>
				<div class="mb-8 text-gray-600">
					<p>
						Hackathons are where I test cutting-edge concepts under pressure. These wins demonstrate 
						my ability to quickly identify opportunities and build working solutions that solve real problems:
					</p>
				</div>
				<Hackathons />
			</section>

			<!-- Projects Section -->
			<section id="projects" class="py-16">
				<h2 class="mb-8 text-2xl font-bold">Solutions that solve real problems</h2>
				<div class="mb-8 text-gray-600">
					<p>
						Each project demonstrates different aspects of practical implementation.
						From RAG architectures to ML-powered automation that delivers measurable business value:
					</p>
				</div>
				<div class="flex flex-col gap-8">
					{#each projects.sort((a, b) => {
						// Helper function to parse dates, handling "Present"
						const parseProjectDate = (dateStr: string) => {
							if (dateStr.includes('Present') || dateStr.includes('present')) {
								return new Date(); // Return current date for "Present"
							}
							// Handle single dates or date ranges without "Present"
							return new Date(dateStr.split('-')[0].trim());
						};

						const dateA = parseProjectDate(a.date);
						const dateB = parseProjectDate(b.date);
						return dateB.getTime() - dateA.getTime();
					}) as project, i}
						<div
							role="article"
							aria-label={project.title}
							aria-relevant="text"
							aria-live="polite"
							class="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg"
							onmouseenter={() => (hoveredProject = i)}
							onmouseleave={() => (hoveredProject = null)}
						>
							{#if project.image}
								<div class="aspect-video w-full overflow-hidden">
									<img
										src={project.image}
										alt={project.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
							{/if}
							<div class="flex flex-1 flex-col p-6">
								<div class="mb-2 flex justify-between">
									<h3 class="text-xl font-semibold">{project.title}</h3>
									<span class="text-sm text-gray-500">{project.date}</span>
								</div>
								<p class="mb-4 text-gray-600">{project.description}</p>

								{#if project.insight}
									<div class="mb-4 rounded-lg bg-gray-50 p-4">
										<div class="mb-2 flex items-center gap-2">
											<Lightbulb size={16} class="text-amber-500" />
											<span class="text-sm font-semibold text-gray-700">Technical Learning</span>
										</div>
										<p class="text-sm text-gray-600">{project.insight}</p>
									</div>
								{/if}

								<div class="mb-4 flex flex-wrap gap-2">
									{#each project.technologies as tech}
										<span class="rounded-full bg-gray-100 px-3 py-1 text-sm">
											{tech}
										</span>
									{/each}
								</div>

								<div class="mt-auto flex gap-4">
									{#if project.github}
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center gap-2 text-gray-600 transition-colors hover:text-black"
										>
											<Github size={20} />
											<span class="text-sm">View Source</span>
										</a>
									{/if}
									{#if project.link}
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											class="flex items-center gap-2 text-gray-600 transition-colors hover:text-black"
										>
											<ExternalLink size={20} />
											<span class="text-sm">Visit Site</span>
										</a>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Final CTA Section -->
			<section class="py-16">
				<div class="rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white md:p-12">
					<div class="text-center">
						<h2 class="mb-4 text-3xl font-bold">Ready to reclaim your time?</h2>
						<p class="mb-8 text-lg text-gray-300">
							Whether you're drowning in repetitive tasks or just curious about what's possible, 
							I'd love to help you figure out how to get your time back. No pressure, just a friendly conversation about what could work for you.
						</p>
						<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
							<a
								href="mailto:seth@renavestapp.com?subject=Help me automate my workflow"
								class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
							>
								<Mail size={20} />
								<span>I'd love to chat</span>
							</a>
							<a
								href="https://www.linkedin.com/in/seth-morton-118574242/"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-center gap-2 rounded-full border border-white px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900"
							>
								<Linkedin size={20} />
								<span>Connect on LinkedIn</span>
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>
</div>
