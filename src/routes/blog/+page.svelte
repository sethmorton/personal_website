<script>
  import { goto } from '$app/navigation';
</script>
<div class="flex flex-col w-screen h-screen justify-between">
    <div class="flex justify-start p-8">
        <button class="text-blue-600 hover:text-blue-800" on:click={() => goto('/')}>Back</button>
      </div>
    <div class="flex flex-col justify-center items-center">
      <h1>blog</h1>
      <p class="text-gray-500">coming soon</p>
    </div>
    <div></div>
</div>

