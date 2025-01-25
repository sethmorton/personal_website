<script lang="ts">
	import { Github, ExternalLink } from 'lucide-svelte';

	interface Project {
		title: string;
		description: string;
		image?: string;
		technologies: string[];
		github?: string;
		link?: string;
	}

	const projects: Project[] = [
		{
			title: 'Digestible Text',
			description:
				'A tool that helps users better understand and   retain what they read through AI-powered summaries and insights.',
			technologies: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind'],
			link: 'https://digestibletext.com'
		},
		{
			title: 'Weather Dash',
			description:
				'A minimalist weather dashboard with beautiful visualizations and detailed forecasts.',
			image: '/api/placeholder/800/400',
			technologies: ['Svelte', 'D3.js', 'Weather API', 'CSS'],
			github: 'https://github.com/username/weather-dash',
			link: 'https://weather-dash.demo'
		},
		{
			title: 'Task Flow',
			description: 'A keyboard-first task management system focused on developer productivity.',
			image: '/api/placeholder/800/400',
			technologies: ['React', 'Redux', 'Node.js', 'PostgreSQL'],
			github: 'https://github.com/username/task-flow'
		}
	];

	let hoveredProject = $state(null);
</script>

<svelte:head>
	<title>Portfolio - Seth Morton</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col">
	<nav
		class="sticky top-0 flex flex-row justify-center gap-5 border-b border-gray-100 bg-white/80 py-4 backdrop-blur"
	>
		<a href="/" class="cursor-pointer p-2.5 hover:text-gray-500">home</a>
		<a href="/about" class="cursor-pointer p-2.5 hover:text-gray-500">about</a>
		<a href="/blog" class="cursor-pointer p-2.5 hover:text-gray-500">blog</a>
	</nav>

	<main class="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16">
		<h1 class="mb-4 text-3xl font-bold">Projects</h1>
		<p class="mb-12 text-gray-600">Here are some things I've built.</p>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			{#each projects as project, i}
				<div
					class="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg"
					on:mouseenter={() => (hoveredProject = i)}
					on:mouseleave={() => (hoveredProject = null)}
				>
					{#if project.image}
						<div class="aspect-video w-full overflow-hidden">
							<img
								src={project.image}
								alt={project.title}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
					{:else}
						<div class="aspect-video flex w-full items-center justify-center bg-gray-100">
							<span class="text-gray-400">No image available</span>
						</div>
					{/if}

					<div class="flex flex-1 flex-col p-6">
						<h2 class="text-xl font-semibold">{project.title}</h2>
						<p class="mt-2 text-gray-600">{project.description}</p>

						<div class="mt-4 flex flex-wrap gap-2">
							{#each project.technologies as tech}
								<span class="rounded-full bg-gray-100 px-3 py-1 text-sm">
									{tech}
								</span>
							{/each}
						</div>

						<div class="mt-6 flex gap-4">
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
	</main>
</div>
