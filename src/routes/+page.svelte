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
		FileText
	} from 'lucide-svelte';
	import WorkExperience from '$lib/components/WorkExperience.svelte';
	interface Project {
		title: string;
		description: string;
		date: string;
		technologies: string[];
		github?: string;
		link?: string;
		image?: string;
		insight?: string;
	}
	// TODO: export all data into a seperate file for better organization
	const projects: Project[] = [
		{
			title: 'DigestibleText',
			description:
				'Born from personal struggles with ADHD and dense text, created a tool that transforms walls of text into structured, readable formats while preserving every detail. Helps users who struggle with information processing maintain comprehension without sacrificing nuance.',
			insight:
				'Learned the intricacies of handling Stripe/Clerk webhooks and optimizing Tesseract.js accuracy with NLP - showed me the importance of robust payment and auth flows.',
			date: 'Oct 2024 - Present',
			technologies: ['SvelteKit', 'TypeScript', 'Tesseract.js', 'Neon DB', 'Stripe', 'Clerk'],
			link: 'https://digestibletext.com',

			image: '/digestibletext.png'
		},
		{
			title: 'Trading Algorithm Risk Classifier',
			description:
				'Enhanced trading strategies with ML classification to prevent false bullish signals on bearish days. Built to reduce drawdowns in leveraged ETF positions by combining traditional technical analysis with modern ML approaches for more robust market prediction.',
			insight:
				'Discovered that combining traditional technical analysis with ML classification could significantly reduce drawdowns while maintaining strategy returns.',
			date: 'Dec 2024 - Present',
			technologies: ['Python', 'XGBoost', 'Optuna', 'yfinance', 'Pandas'],
			image: '/tradingriskclassifier.png'
		},
		{
			title: 'Backtest Extender',
			description:
				'Automated solution for algorithmic traders to extend their backtest periods by finding historically-correlated ETF alternatives. Now used by over 50 traders in the Composer community to validate strategies across longer timeframes, eliminating hours of manual research.',
			insight:
				'Implementing smart caching was crucial - reduced API costs by 90% while maintaining data freshness, showing me the impact of thoughtful system design.',
			date: 'Jul 2024 - Present',
			technologies: ['TypeScript', 'SvelteKit', 'LRU Cache', 'DaisyUI'],
			link: 'https://backtestextend.xyz',
			github: 'https://github.com/sethmorton/ComposerTickerReplacer',
			image: '/backtestextender.png'
		},
		{
			title: 'Embeddit | SauceLabs Winner, HackHarvard 2024',
			description:
				'AI-powered tool that lets users have natural conversations with content from any subreddit, making community knowledge more accessible. Built after struggling to find reliable information about SIBO, realizing the wealth of community experience on Reddit needed better organization.',
			insight:
				'First experience implementing RAG with PineconeDB and OpenAI embeddings - learned how vector databases and semantic search transform information retrieval.',
			date: 'Oct 2024',
			technologies: ['Next.js', 'TypeScript', 'PineconeDB', 'OpenAI', 'Reddit API'],
			link: 'https://embeddit.vercel.app',
			github: 'https://github.com/sethmorton/embeddit',

			image: '/embeddit.png'
		},
		{
			title: 'Voltare',
			description:
				'Developed an intelligent system to optimize data center energy usage based on solar grid mix, maximizing government tax credits. Analyzes over 1M California power grid data points using KDE analysis to predict optimal energy consumption patterns.',
			insight:
				'Working with large time-series datasets revealed the power of specialized databases and KDE for real-world pattern analysis.',
			date: 'October 2023',
			technologies: ['Python', 'TimescaleDB', 'OpenWeatherMap API', 'NumPy', 'SciPy'],
			github: 'https://github.com/sethmorton/voltare'
		},
		{
			title: 'BorderDashboard',
			description:
				'Created the first historical wait-time database for California-Mexico border crossings, continuously scraping data from Google Maps and CBP. Analysis led to a presentation to the regional CBP head and contributed to policy changes. Includes a public analytics dashboard at borderdashboard.com.',
			insight:
				'Building automated scrapers for Google Maps and CBP taught me about robust data collection and database design for long-term data storage.',
			date: 'Mar 2020 - Present',
			technologies: ['Python', 'PostgreSQL', 'Svelte', 'Data Analysis'],
			github: 'https://github.com/sethmorton/BorderDashboard',
			link: 'https://borderdashboard.com',
			image: '/borderdashboard.png'
		},
		{
			title: 'Racket Formatter',
			description:
				'Code formatting tool built with Svelte and TypeScript that improves Racket code readability through careful string parsing and bracket matching. Created to solve the lack of modern formatting tools in the Racket ecosystem.',
			insight:
				'Building a parser from scratch showed me why tracking state and handling edge cases make parser development so challenging.',
			date: 'August 2023',
			technologies: ['Svelte', 'TypeScript', 'Parser Development'],
			github: 'https://github.com/sethmorton/RacketFormatter',
			link: 'astonishing-pithivier-ecd757.netlify.app',
			image: '/racketformatter.png'
		},
		{
			title: 'Volta | Berkeley AI Hackathon 2024',
			description:
				'Power consumption analysis tool for the Pacific Grid that uses ML to predict energy usage and environmental impact. Built to help organizations optimize their energy consumption patterns and reduce environmental footprint.',
			insight:
				'Configuring AWS Lambda to serve scikit-learn model predictions taught me a lot about ML deployment and cloud architecture.',
			date: 'May 2024',
			technologies: ['SvelteKit', 'AWS Lambda', 'scikit-learn', 'Python'],
			github: 'https://github.com/sethmorton/volta'
		},
		{
			title: 'SolarUp | Second Place in HackHarvard 2023 Earth & Space Track',
			description:
				'Developed a platform that helps businesses transform their parking lots into solar power generators. Built using real-time solar data to calculate potential earnings from solar panel installations, making sustainable energy decisions more accessible for property owners.',
			insight:
				'Integrating multiple energy APIs and handling complex calculations taught me about making technical data accessible to non-technical users.',
			date: 'October 2023',
			technologies: ['React', 'Python', 'FastAPI', 'NREL API', '1Build API'],
			github: 'https://github.com/sethmorton/solarup'
		}
	];

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
			<a href="#experience" class="p-2.5 hover:text-gray-500">experience</a>
			<a href="#hackathons" class="p-2.5 hover:text-gray-500">hackathons</a>
			<a href="#projects" class="p-2.5 hover:text-gray-500">projects</a>
			<a href="/blog" class="p-2.5 hover:text-gray-500">blog</a>
		</div>

		<!-- Mobile menu -->
		{#if isOpen}
			<div class="px-4 py-2 md:hidden">
				<a href="#about" class="block py-2 hover:text-gray-500">about</a>
				<a href="#experience" class="block py-2 hover:text-gray-500">experience</a>
				<a href="#hackathons" class="block py-2 hover:text-gray-500">hackathons</a>
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
							hi, i'm seth morton
						</h1>
						<div class="mt-4 space-y-2 md:mt-6 md:space-y-3">
							<p class="text-base font-medium text-gray-800 md:text-lg">
								TypeScript & AWS Expert | Full Stack Engineer
							</p>
							<p class="text-base text-gray-600 md:text-lg">
								5+ years building high-impact, large-scale applications. Proven experience in
								creating full-stack web applications, databases, and product leadership.
							</p>
						</div>
					</div>

					<!-- Social Links -->
					<div class="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-6">
						<a
							href="mailto:seth.morton@tufts.edu"
							class="group flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 md:px-5"
							onmouseenter={() => (hoveredIcon = 'mail')}
							onmouseleave={() => (hoveredIcon = null)}
						>
							<Mail size={20} />
							<span class="text-xs font-medium md:text-sm">Email</span>
						</a>
						<a
							href="https://github.com/sethmorton"
							class="group flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 md:px-5"
							onmouseenter={() => (hoveredIcon = 'github')}
							onmouseleave={() => (hoveredIcon = null)}
						>
							<Github size={20} />
							<span class="text-xs font-medium md:text-sm">GitHub</span>
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
						<a
						href="https://uph7p70lhd.ufs.sh/f/PZA8aODL9FcWkx8rP4nfIU1rsvxoTEZamGp4wJyAq5DcVznS"
						class="group flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 md:px-5"
						onmouseenter={() => (hoveredIcon = 'resume')}
						onmouseleave={() => (hoveredIcon = null)}
					>
						<FileText size={20} />
						<span class="text-xs font-medium md:text-sm">Resume</span>
					</a>
					</div>
				</div>
			</section>

			<section id="glance" class="py-16">
				<h2 class="mb-12 text-center text-3xl font-bold">What I've Shipped at a Glance</h2>
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
									Leading Product @ Renavest
								</h3>
							</div>
							<span class="text-sm text-gray-500">May 2024 - Present</span>
						</div>
						<p class="mb-4 text-gray-600">
							Led a team of 3 developers to create a mobile application using React Native and AWS,
							pivoted the company to a web application using Next.js and AWS, securing 5 enterprise
							contracts and $100k+ projected ARR.
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
						href="https://bajabound.com"
						target="_blank"
						rel="noopener noreferrer"
						class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
					>
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center">
								<img src="bajabound-logo.png" alt="BajaBound Logo" class="mr-4 h-6 w-6" />
								<h3 class="text-xl font-semibold group-hover:text-indigo-600">
									SWE @ BajaBound Insurance
								</h3>
							</div>
							<span class="text-sm text-gray-500">Jan 2020 - Aug 2023</span>
						</div>
						<p class="mb-4 text-gray-600">
							Built and shipped a TypeScript/GCP/PostgreSQL analytics platform for BajaBound,
							handling 150,000+ monthly visits. Created automated selenium testing framework for
							update pipeline, cutting QA cycle time from 3 weeks to 1 week.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
								>TypeScript</span
							>
							<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
								>GCP</span
							>
							<span class="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
								>PostgreSQL</span
							>
							<span class="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
								>Automated Testing</span
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
						href="https://www.smartbordercoalition.com/"
						target="_blank"
						rel="noopener noreferrer"
						class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
					>
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center">
								<img src="cbp-logo.png" alt="CBP Logo" class="mr-4 h-8 w-8" />
								<h3 class="text-xl font-semibold group-hover:text-indigo-600">
									Data Scientist @ Smart Border Coalition
								</h3>
							</div>
							<span class="text-sm text-gray-500">Mar 2020 - Jul 2023</span>
						</div>
						<p class="mb-4 text-gray-600">
							Created first ever PostgreSQL database of USA/Mexico border wait times scraping data
							from the CBP, Google Maps, and Apple Maps, collecting over 15,000 entries per month.
							Presented never before seen data-driven insights to the regional head of US CBP and
							created a public analytics dashboard.
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
								>PostgreSQL</span
							>
							<span class="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800"
								>Web Scraping</span
							>
							<span class="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
								>Data Analysis</span
							>
							<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
								>AWS</span
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
								Text restructuring tool with 30+ users, solving reading comprehension needs for
								philosophy students.
							</p>
							<div class="flex flex-wrap gap-2">
								<span class="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800"
									>Tesseract</span
								>
								<span
									class="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
									>Clerk</span
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
								HackHarvard-winning AI-powered Reddit analyzer, making community insights
								accessible.
							</p>
							<div class="flex flex-wrap gap-2">
								<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
									>TypeScript</span
								>
								<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
									>Next.js</span
								>
								<span
									class="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
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
						<a
							href="https://backtestextend.xyz"
							target="_blank"
							rel="noopener noreferrer"
							class="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg sm:col-span-2"
						>
							<div class="mb-4 flex items-center justify-between">
								<h3 class="text-xl font-semibold group-hover:text-indigo-600">Backtest Extender</h3>
								<span class="text-sm text-gray-500">Jul 2024 - Present</span>
							</div>
							<p class="mb-4 text-gray-600">
								ETF analytics tool for 50+ algorithmic traders, eliminating manual
								backtestingresearch.
							</p>
							<div class="flex flex-wrap gap-2">
								<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
									>TypeScript</span
								>
								<span class="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800"
									>SvelteKit</span
								>
								<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
									>Financial Data Analysis</span
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
							href="#experience"
							class="inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold leading-5 text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Read on to learn more about each experience
						</a>
					</div>
				</div>
			</section>

			<!-- About Section -->
			<section id="about" class="py-16">
				<h2 class="mb-8 text-2xl font-bold">About</h2>
				<div class="space-y-4 text-gray-600">
					<p>
						Hello! I'm Seth, a software engineer from San Diego now studying in Boston. My journey
						started at 12 when I built my first photography website to bypass expensive hosting fees
						- a small decision that sparked a lifelong passion for creating meaningful technology.
					</p>
					<p>
						Since then, I've built over 40 projects and worked with fantastic teams at Smart Border
						Coalition, BajaBound, and now Renavest, where I'm working to make financial therapy more
						accessible. What drives me? Using technology to solve real problems that matter.
					</p>
					<p>
						At Tufts, I'm combining Computer Science with Philosophy because I believe the biggest
						challenges need both technical skills and deep thinking. When I'm not coding, you'll
						find me running through Boston, watching economic and policy YT videos, or listening to
						Prof G Markets while planning my next project.
					</p>
				</div>
			</section>
			<WorkExperience />
			<Hackathons />
			<!-- Projects Section -->
			<section id="projects" class="py-16">
				<h2 class="mb-8 text-2xl font-bold">Favorite Personal Projects</h2>
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
											<span class="text-sm font-semibold text-gray-700">Key Learning</span>
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
		</div>
	</main>
</div>
