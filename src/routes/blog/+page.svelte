<script>
  import { goto } from '$app/navigation';
  
  let posts = $state([
    {
      title: 'balance',
      description: 'Thoughts on finding equilibrium in life and work',
      slug: 'balance',
      date: '2024-11-19'
    }
  ]);
</script>

<div class="flex flex-col w-screen h-screen justify-between">
  <div class="flex justify-start p-8">
    <button class="text-blue-600 hover:text-blue-800" onclick={() => goto('/')}>Back</button>
  </div>
  
  <div class="flex flex-col justify-center items-center space-y-8">
    <h1 class="text-2xl font-bold">blog</h1>
    <div class="flex flex-col items-center space-y-4">
      {#each posts as post}
        <a 
          href={`/blog/posts/${post.slug}`}
          class="group flex flex-col items-center text-center transition-colors"
        >
          <h2 class="text-lg group-hover:text-gray-500">{post.title}</h2>
          <p class="text-sm text-gray-600">{post.date}</p>
        </a>
      {/each}
    </div>
  </div>
  
  <div></div>
</div>

