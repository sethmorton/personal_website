<script>
  import { goto } from '$app/navigation';
</script>
<div class="absolute top-0 left-0 p-8">
    <button class="text-blue-600 hover:text-blue-800" on:click={() => goto('/')}>Back</button>
  </div>
<div class="relative w-screen h-screen flex flex-col justify-center items-center">
  <h1>blog</h1>
  <p class="text-gray-500">coming soon</p>
</div>
