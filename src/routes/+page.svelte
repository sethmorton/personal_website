<script lang="ts">
	import { FileText, Linkedin, Mail } from 'lucide-svelte';

	let hoveredIcon = $state(null);
</script>

<svelte:head>
	<title>Seth Morton</title>
</svelte:head>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<nav class="absolute left-0 right-0 top-12 flex flex-row justify-center gap-5">
		<a href="/about" class="cursor-pointer p-2.5 hover:text-gray-500 hover:underline">about</a>
		<a href="/blog" class="cursor-pointer p-2.5 hover:text-gray-500 hover:underline">blog</a>
	</nav>

	<main class="flex flex-1 flex-col items-center justify-center">
		<h1 class="text-center text-2xl font-bold">hi, i'm seth morton</h1>
		<p class="pt-2.5 text-center text-lg">:)</p>
		<p class="pt-2.5 text-center text-sm sm:text-lg">
			I'm building <a
				href="https://digestibletext.com"
				class="text-black underline hover:text-gray-500">Digestible Text</a
			>, a tool to help you understand what you read.
		</p>

		<div class="mt-5 flex flex-row">
			<a
				href="mailto:sethmorton05@gmail.com"
				class="mx-2.5 cursor-pointer p-2.5 transition-transform duration-200 hover:scale-110"
				onmouseenter={() => (hoveredIcon = 'mail')}
				onmouseleave={() => (hoveredIcon = null)}
			>
				<Mail size={24} color={hoveredIcon === 'mail' ? '#808080' : '#000000'} />
			</a>

			<a
				href="https://go.sethmorton.xyz/resume"
				class="mx-2.5 cursor-pointer p-2.5 transition-transform duration-200 hover:scale-110"
				onmouseenter={() => (hoveredIcon = 'resume')}
				onmouseleave={() => (hoveredIcon = null)}
			>
				<FileText size={24} color={hoveredIcon === 'resume' ? '#808080' : '#000000'} />
			</a>

			<a
				href="https://go.sethmorton.xyz/linkedin"
				class="mx-2.5 cursor-pointer p-2.5 transition-transform duration-200 hover:scale-110"
				onmouseenter={() => (hoveredIcon = 'linkedin')}
				onmouseleave={() => (hoveredIcon = null)}
			>
				<Linkedin size={24} color={hoveredIcon === 'linkedin' ? '#808080' : '#000000'} />
			</a>
		</div>
	</main>
</div>
