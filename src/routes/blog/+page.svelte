<script lang="ts">
  import { goto } from '$app/navigation';
  import BlogPost from '$lib/blog/components/BlogPost.svelte';
  import balance from '$lib/blog/content/balance.txt?raw';
  let posts = $state([
    {
      title: 'balance',
      description: 'Thoughts on finding equilibrium in life and work',
      slug: 'balance',
      date: '2024-11-19',
      content : balance
    }
  ]);
  let activePost : typeof posts[0] | null = $state(null);
</script>
{#if activePost === null}
<div class="flex flex-col w-screen h-screen justify-between">
  <div class="flex justify-start p-8">
    <button class="text-blue-600 hover:text-blue-800" onclick={() => goto('/')}>Back</button>
  </div>
  
  <div class="flex flex-col justify-center items-center space-y-8">
    <h1 class="text-2xl font-bold">blog</h1>
    <div class="flex flex-col items-center space-y-4">
      {#each posts as post}
        <button
          onclick={() => activePost = post}
          class="group flex flex-col items-center text-center transition-colors"
        >
          <h2 class="text-lg group-hover:text-gray-500">{post.title}</h2>
          <p class="text-sm text-gray-600">{post.date}</p>
    </button>
      {/each}
    </div>
  </div>
  <!-- This is for the justify between-->
  <div></div>
</div>
  {/if}
  {#if activePost !== null}
    <BlogPost content={activePost.content} publishDate={new Date(activePost.date)} onClose={() => activePost = null} />
  {/if}


