<script lang="ts">
    import { goto } from '$app/navigation';
    import MarkdownIt from 'markdown-it';
    import mk from 'markdown-it-katex';

    let {publishDate, content, onClose} = $props()
    
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    }).use(mk, {
      throwOnError: false,
      displayMode: true,
      strict: false
    });
    let renderedHTML = $state('');
    $effect(() => {
      renderedHTML = md.render(content);
      console.log(renderedHTML);
    });
    
  </script>
  
  <svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/computer-modern-font@1.0.1/fonts/Serif/cmun-serif.css">
  </svelte:head>
  
  <div class="h-full overflow-y-auto">
      <div class="flex justify-start p-8">
          <button class="text-blue-600 hover:text-blue-800" onclick={() => onClose()}>Back</button>
      </div>
      <article class="prose prose-lg mx-auto max-w-3xl px-4 py-8 text-black">
        <header class="mb-8">
          <time datetime={publishDate.toISOString()} class="text-sm text-gray-500">
            {publishDate.toLocaleDateString()}
          </time>
        </header>
        
        {@html renderedHTML}
      </article>
  </div>
  
  <style>
    :global(.katex) {
      font-size: 1.1em;
    }
    
    :global(.katex-display) {
      overflow-x: auto;
      overflow-y: hidden;
      padding: 1em 0;
    }
    
    :global(.markdown-body) {
      color: inherit;
    }
  </style>