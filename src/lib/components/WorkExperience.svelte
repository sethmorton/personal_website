<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface TimelineEntry {
		year: string;
		title: string;
		company: string;
		date: string;
		why: string;
		what: string;
		impact: string;
		technical: {
			description: string;
			technologies: string[];
		};
		location: string;
		type: string;
		skills: string[];
	}

	const experiences: TimelineEntry[] = [
		{
			year: '2024',
			title: 'Head of Product',
			company: 'Renavest',
			date: 'May 2024 - Present',
			why: "Started as a financial literacy platform for students, but something wasn't clicking. After a 3-hour call with our CEO exploring why, we realized financial therapy could create deeper impact. Many people need more than just information – they need guidance from someone who understands both finance and emotional wellbeing.",
			what: 'Built and led our engineering team with a focus on creating tools therapists actually want to use. Spent time understanding their needs, shaped our product direction, and made tough calls on technical architecture to support our mission.',
			impact:
				"Now in talks with 4 companies to bring financial therapy to their employees as a health benefit. Growing recognition in Boston's fintech community as a platform that genuinely helps people achieve financial wellbeing.",
			technical: {
				description:
					'Built mobile app initially focused on video content delivery, pivoted to enterprise web platform for better market fit.',
				technologies: [
					'React Native',
					'Expo',
					'AWS Amplify',
					'DynamoDB',
					'AWS Lambda',
					'Next.js',
					'Tailwind',
					'DaisyUI'
				]
			},
			location: 'Boston, MA',
			type: 'Part-time',
			skills: ['Mission-Driven Product', 'Team Building', 'Technical Strategy', 'Healthcare Tech']
		},
		{
			year: '2023',
			title: 'Software Engineer',
			company: 'Baja Bound Insurance',
			date: 'Jan 2020 - Jun 2023',
			why: 'Needed robust analytics and testing infrastructure to support major site redesign and ensure reliable production deployment.',
			what: 'Built analytics platform for tracking site performance and user behavior. Created automated testing suite to validate new features before release.',
			impact:
				'Reduced QA cycle time from 2 weeks to 1 week. Analytics platform continues to drive insurance provider negotiations and product decisions.',
			technical: {
				description:
					'Built analytics platform for tracking key business metrics and automated testing infrastructure to support site redesign.',
				technologies: [
					'SvelteKit',
					'TypeScript',
					'PostgreSQL',
					'Docker',
					'GCP',
					'Auth0',
					'Selenium',
					'BrowserStack'
				]
			},
			location: 'San Diego, CA',
			type: 'Part-time',
			skills: ['Full-Stack Development', 'Data Analytics', 'Test Automation']
		},
		{
			year: '2020',
			title: 'Software Engineer',
			company: 'Smart Border Coalition',
			date: 'Mar 2020 - May 2023',
			why: 'Border crossers and policy makers needed accurate wait time data to make informed decisions about crossings and border management.',
			what: 'Created first historical wait time database by aggregating data from multiple sources. Presented findings directly to CBP leadership.',
			impact:
				'Tool now serves 1000+ monthly users with accurate crossing predictions. Data insights directly influenced CBP policy changes for more efficient border operations.',
			technical: {
				description:
					'Created data collection system integrating multiple border wait time sources, with focus on reliable parsing and storage.',
				technologies: ['SvelteKit', 'PostgreSQL', 'Aiven', 'Google Maps API', 'Regex']
			},
			location: 'San Diego, CA',
			type: 'Volunteer',
			skills: ['Data Engineering', 'Public Policy Tech', 'Stakeholder Management']
		}
	];

	let observer: IntersectionObserver;
	let visibleSections = new Set();
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections = new Set([...visibleSections, entry.target.id]);
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: '-10% 0px -10% 0px'
			}
		);

		document.querySelectorAll('.timeline-entry').forEach((section) => {
			observer.observe(section);
		});

		return () => observer.disconnect();
	});
</script>

<h2 class="px-4 text-xl font-bold md:px-0 md:text-2xl" id="experience">Work Experience</h2>
<div class="relative mx-auto max-w-7xl px-4 md:px-6">
	<!-- Timeline Line - Hidden on mobile, shown on larger screens -->
	<div
		class="absolute left-0 top-0 hidden h-full w-[2px] bg-[linear-gradient(to_bottom,transparent,rgb(229,231,235),transparent)] md:left-[7.5rem] md:block"
	></div>

	<!-- Timeline Entries -->
	{#each experiences as exp, i}
		<div
			class="timeline-entry relative flex flex-col py-8 md:flex-row md:gap-16 md:py-16"
			id={`entry-${i}`}
			in:fade={{ duration: 500, delay: i * 200 }}
		>
			<!-- Year - Repositioned for mobile -->
			<div class="mb-4 flex h-12 w-full md:sticky md:top-24 md:mb-0 md:h-16 md:w-28">
				<span class="text-3xl font-bold text-gray-300 md:text-5xl">{exp.year}</span>
			</div>

			<!-- Content -->
			<div
				class="flex-1 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:p-8"
				class:visible={visibleSections.has(`entry-${i}`)}
			>
				<div class="mb-6 flex flex-col gap-2 md:flex-row md:justify-between md:gap-0">
					<div>
						<h3 class="text-xl font-bold text-gray-900 md:text-2xl">{exp.title}</h3>
						<p class="text-base text-purple-600 md:text-lg">{exp.company}</p>
					</div>
					<div class="md:text-right">
						<p class="text-sm text-gray-600">{exp.date}</p>
						<p class="text-sm text-gray-500">{exp.location} · {exp.type}</p>
					</div>
				</div>

				<div class="mb-6 space-y-4">
					<div>
						<h4 class="mb-2 font-medium text-gray-700">Why</h4>
						<p class="text-sm text-gray-600 md:text-base">{exp.why}</p>
					</div>
					<div>
						<h4 class="mb-2 font-medium text-gray-700">What I Did</h4>
						<p class="text-sm text-gray-600 md:text-base">{exp.what}</p>
					</div>
					<div>
						<h4 class="mb-2 font-medium text-gray-700">Impact</h4>
						<p class="text-sm text-gray-600 md:text-base">{exp.impact}</p>
					</div>
					<div>
						<h4 class="mb-2 font-medium text-gray-700">Technical</h4>
						<p class="mb-3 text-sm text-gray-600 md:text-base">{exp.technical.description}</p>
						<div class="flex flex-wrap gap-2">
							{#each exp.technical.technologies as tech}
								<span
									class="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600 md:px-3 md:text-sm"
								>
									{tech}
								</span>
							{/each}
						</div>
					</div>
				</div>
				<div class="space-y-4">
					<h4 class="font-medium text-gray-700">Skills</h4>
					<div class="mt-6 flex flex-wrap gap-2">
						{#each exp.skills as skill}
							<span
								class="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600 md:px-3 md:text-sm"
							>
								{skill}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline-entry {
		transform-origin: left center;
	}

	.visible {
		animation: slide-in 0.5s ease-out forwards;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
