<script lang="ts">
	import {
		Github,
		ExternalLink,
		Mail,
		FileText,
		Linkedin,
		Bike,
		Coffee,
		Book,
		Code,
		Trophy,
		Lightbulb
	} from 'lucide-svelte';

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

	const projects: Project[] = [
		{
			title: 'Trading Algorithm Risk Classifier',
			description:
				'Enhanced trading strategies with ML classification to prevent false bullish signals on bearish days. Built to reduce drawdowns in leveraged ETF positions by combining traditional technical analysis with modern ML approaches for more robust market prediction.',
			insight:
				'Discovered that combining traditional technical analysis with ML classification could significantly reduce drawdowns while maintaining strategy returns.',
			date: 'Dec 2024 - Present',
			technologies: ['Python', 'XGBoost', 'Optuna', 'yfinance', 'Pandas'],
			github: 'https://github.com/yourusername/trading-risk-classifier'
		},
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
			title: 'Volta',
			description:
				'Power consumption analysis tool for the Pacific Grid that uses ML to predict energy usage and environmental impact. Built to help organizations optimize their energy consumption patterns and reduce environmental footprint.',
			insight:
				'Configuring AWS Lambda to serve scikit-learn model predictions taught me a lot about ML deployment and cloud architecture.',
			date: 'May 2024',
			technologies: ['SvelteKit', 'AWS Lambda', 'scikit-learn', 'Python'],
			github: 'https://github.com/sethmorton/volta'
		}
	];

	let hoveredIcon = $state(null as string | null);
	let hoveredProject = $state(null as number | null);
</script>

<div class="flex min-h-screen flex-col">
	<nav class="flex justify-center gap-5 border-b border-gray-100 bg-white/80 py-4 backdrop-blur">
		<a href="#about" class="cursor-pointer p-2.5 hover:text-gray-500">about</a>
		<a href="#projects" class="cursor-pointer p-2.5 hover:text-gray-500">projects</a>
		<a href="/blog" class="cursor-pointer p-2.5 hover:text-gray-500">blog</a>
	</nav>

	<main class="flex flex-1 flex-col items-center px-4">
		<div class="w-full max-w-4xl">
			<!-- Hero Section -->
			<section class="flex min-h-[80vh] flex-col items-center justify-center py-16">
				<div class="flex flex-col items-center space-y-6">
					<!-- Profile Image -->
					<div class="mb-6 overflow-hidden rounded-full border-4 border-gray-100 shadow-lg">
						<img src="/seth_image.webp" alt="Seth Morton" class="h-32 w-32 object-cover" />
					</div>

					<!-- Main Text -->
					<div class="text-center">
						<h1
							class="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent"
						>
							hi, i'm seth morton
						</h1>
						<div class="mt-6 space-y-3">
							<p class="text-lg font-medium text-gray-800">
								Software Engineer with 5+ years of professional expertise in Full Stack Development
								and Machine Learning. Currently working at <a
									href="https://www.renavestapp.com/"
									target="_blank"
									rel="noopener noreferrer"
									class="text-purple-600 transition-colors hover:text-black">Renavest</a
								>.
							</p>
							<p class="text-lg text-gray-600">
								Majoring in Philosophy at Tufts, minoring in 3 tech startups.
							</p>
						</div>
					</div>

					<!-- Social Links -->
					<div class="mt-8 flex items-center gap-6">
						<a
							href="mailto:seth.morton@tufts.edu"
							class="group flex items-center gap-2 rounded-full bg-gray-50 px-5 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
							onmouseenter={() => (hoveredIcon = 'mail')}
							onmouseleave={() => (hoveredIcon = null)}
						>
							<Mail size={20} />
							<span class="text-sm font-medium">Email</span>
						</a>
						<a
							href="https://github.com/sethmorton"
							class="group flex items-center gap-2 rounded-full bg-gray-50 px-5 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
							onmouseenter={() => (hoveredIcon = 'github')}
							onmouseleave={() => (hoveredIcon = null)}
						>
							<Github size={20} />
							<span class="text-sm font-medium">GitHub</span>
						</a>
						<a
							href="https://www.linkedin.com/in/seth-morton-118574242/"
							class="group flex items-center gap-2 rounded-full bg-gray-50 px-5 py-2 text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
							onmouseenter={() => (hoveredIcon = 'linkedin')}
							onmouseleave={() => (hoveredIcon = null)}
						>
							<Linkedin size={20} />
							<span class="text-sm font-medium">LinkedIn</span>
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

			<!-- Projects Section -->
			<section id="projects" class="py-16">
				<h2 class="mb-8 text-2xl font-bold">Personal Projects</h2>
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
