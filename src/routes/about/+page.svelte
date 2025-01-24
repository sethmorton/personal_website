<script>
	import { goto } from '$app/navigation';
</script>

<div class="max-w-3xl p-8">
	<div class="mb-4 flex justify-start">
		<button class="text-blue-600 hover:text-blue-800" on:click={() => goto('/')}>Back</button>
	</div>

	<div class="space-y-6 text-lg leading-relaxed">
		<p>
			I'm Seth Morton, a software engineer from San Diego now studying in Boston. My journey started
			at 12 when I built my first photography website to bypass expensive hosting fees - a small
			decision that sparked a lifelong passion for creating meaningful technology.
		</p>

		<p>
			Since then, I've built over 40 projects and worked with fantastic teams at Smart Border
			Coalition, BajaBound, and now Renavest, where I'm working to make financial therapy more
			accessible. What drives me? Using technology to solve real problems that matter.
		</p>

		<p>
			At Tufts, I'm combining Computer Science with Philosophy because I believe the biggest
			challenges need both technical skills and deep thinking. When I'm not coding, you'll find me
			cycling through Boston, researching geothermal energy innovations, or listening to Prof G
			Markets while planning my next project.
		</p>
	</div>
</div>
