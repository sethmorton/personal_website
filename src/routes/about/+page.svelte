<script>
	import { goto } from '$app/navigation';
</script>

<div class="mx-auto max-w-3xl bg-gradient-to-br from-blue-50 to-white p-8">
	<div class="mb-6 flex justify-start">
		<button
			class="flex items-center gap-2 font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
			on:click={() => goto('/')}
		>
			<span class="text-xl">←</span>
			<span>Back</span>
		</button>
	</div>

	<div class="space-y-8 text-lg leading-relaxed">
		<div class="animate-fade-in">
			<h1 class="mb-6 text-3xl font-bold text-blue-900">Hey, I'm Seth! 👋</h1>

			<p class="text-gray-800">
				I'm a passionate software engineer who started my journey at age 12 by building my own
				photography website (because who wants to pay for Wix?). That spark of creation hasn't
				stopped since - I've gone on to build 40+ projects that tackle meaningful challenges in
				unique ways.
			</p>
		</div>

		<div class="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
			<p class="text-gray-800">
				Currently, I'm crafting solutions at Renavest to make financial therapy more accessible and
				help people build healthier relationships with money. When I'm not coding, you'll find me
				exploring Boston's neighborhoods on my bike, diving deep into geothermal energy research
				(it's fascinating!), or working through new ideas that keep my mind racing.
			</p>
		</div>

		<div class="text-gray-800">
			<p>
				I believe in the power of both code and philosophy to solve complex challenges - that's why
				I'm studying both at Tufts. My experience spans the full development stack, with particular
				expertise in Node.js ecosystems. But what really drives me? Creating technology that makes a
				genuine difference in people's lives.
			</p>
		</div>

		<div class="mt-8 flex flex-wrap gap-3">
			<span class="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800"
				>Full Stack Development</span
			>
			<span class="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800"
				>Sustainability</span
			>
			<span class="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800"
				>Philosophy</span
			>
			<span class="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800"
				>Financial Tech</span
			>
		</div>
	</div>
</div>
