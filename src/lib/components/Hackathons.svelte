<script lang="ts">
	import { Trophy } from 'lucide-svelte';

	interface Hackathon {
		name: string;
		logo: string;
		date: string;
		project: string;
		achievement?: string;
	}

	const hackathons: Hackathon[] = [
		{
			name: 'HackHarvard',
			logo: '/hackharvard.png',
			date: 'October 2024',
			project: 'Embeddit - AI-powered Reddit knowledge explorer',
			achievement: 'SauceLabs Winner'
		},
		{
			name: 'Berkeley AI Hackathon',
			logo: '/berkeleyaihackathon.png',
			date: 'May 2024',
			project: 'Volta - ML-powered grid analysis tool'
		},
		{
			name: 'Tufts Producthon',
			logo: '/tuftsproducthon.png',
			date: 'May 2024',
			project: 'GeoDash - BeReal-style daily geography game'
		},
		{
			name: 'HackHarvard',
			logo: '/hackharvard.png',
			date: 'October 2023',
			project: 'SolarUp - Solar installation ROI calculator',
			achievement: '2nd Place, Earth & Space Track'
		},
		{
			name: 'HackMIT',
			logo: '/hackmit.png',
			date: 'September 2023',
			project: 'MedLingua - Medical notes transcription and centralization system'
		}
	];
</script>

<section class="py-16" id="hackathons">
	<h2 class="mb-8 text-2xl font-bold">Hackathons</h2>

	<div class="mb-8 space-y-4 text-gray-600">
		<h3 class="text-xl font-medium text-gray-800">i like building things</h3>
		<p>
			Hackathons have been one of my favorite parts of college - the rush of building something from
			scratch in 24 hours, fueled by passion (and maybe too much coffee). They're where I've met
			some of my closest friends, learned technologies I use every day, and discovered just how much
			you can create when you're surrounded by people who love building as much as you do.
		</p>
		<p>
			Each project has taught me something new, whether it was diving into ML for the first time at
			Berkeley, figuring out how to pitch at Harvard, or learning that pizza actually can be
			breakfast food. These experiences have shaped not just how I code, but how I think about
			turning ideas into reality.
		</p>
	</div>
	<div class="flex flex-col gap-4">
		{#each hackathons as hackathon}
			<div
				class="group flex items-center gap-6 rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:shadow-lg"
			>
				<div class="h-12 w-12 flex-shrink-0">
					<img
						src={hackathon.logo}
						alt={`${hackathon.name} logo`}
						class="h-full w-full object-contain"
					/>
				</div>

				<div class="flex flex-1 flex-col gap-1">
					<div class="flex items-center gap-3">
						<h3 class="font-medium text-gray-900">{hackathon.name}</h3>
						<span class="text-sm text-gray-500">{hackathon.date}</span>
					</div>
					<p class="text-sm text-gray-600">{hackathon.project}</p>
					{#if hackathon.achievement}
						<div class="flex items-center gap-1 text-amber-500">
							<Trophy size={14} />
							<span class="text-xs font-medium">{hackathon.achievement}</span>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>
