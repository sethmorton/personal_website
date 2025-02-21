<script lang="ts">
	import { Github, ExternalLink, Lightbulb } from 'lucide-svelte';

	export let project: {
		title: string;
		description: string;
		date: string;
		technologies: string[];
		github?: string;
		link?: string;
		image?: string;
		insight?: string;
	};
</script>

<div
	role="article"
	aria-label={project.title}
	class="group flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg"
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
