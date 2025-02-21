export interface Project {
	title: string;
	description: string;
	date: string;
	technologies: string[];
	github?: string;
	link?: string;
	image?: string;
	insight?: string;
}

export const projects: Project[] = [
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
