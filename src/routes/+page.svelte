<script>
  import { FileText, Linkedin, Mail } from 'lucide-svelte';
  
  let hoveredIcon = $state(null);
</script>

<div class="flex w-screen h-screen flex-col justify-center items-center">
  <nav class="absolute top-12 left-0 right-0 flex flex-row justify-center gap-5">
    <a href="/about" 
       class="p-2.5 cursor-pointer hover:underline hover:text-gray-500">about</a>
    <a href="/blog" 
       class="p-2.5 cursor-pointer hover:underline hover:text-gray-500">blog</a>
  </nav>

  <main class="flex-1 flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold">hi, i'm seth morton</h1>
    <p class="pt-2.5 text-lg">:)</p>
    <p class="pt-2.5 text-lg">
      I'm building <a href="https://digestibletext.com" class="text-black underline hover:text-gray-500">Digestible Text</a>, 
      a tool to help you understand what you read.
    </p>
    
    <div class="flex flex-row mt-5">
      <a href="mailto:sethmorton05@gmail.com" 
         class="p-2.5 mx-2.5 cursor-pointer transition-transform duration-200 hover:scale-110"
         onmouseenter={() => hoveredIcon = 'mail'}
         onmouseleave={() => hoveredIcon = null}>
        <Mail 
          size={24} 
          color={hoveredIcon === 'mail' ? '#808080' : '#000000'} 
        />
      </a>
      
      <a href="https://utfs.io/f/PZA8aODL9FcWrb6VCQ2eERJPZNBnCG4AvXr1k8H0poYyKQhV" 
         class="p-2.5 mx-2.5 cursor-pointer transition-transform duration-200 hover:scale-110"
         onmouseenter={() => hoveredIcon = 'resume'}
         onmouseleave={() => hoveredIcon = null}>
        <FileText 
          size={24} 
          color={hoveredIcon === 'resume' ? '#808080' : '#000000'} 
        />
      </a>
      
      <a href="https://www.linkedin.com/in/seth-morton-118574242" 
         class="p-2.5 mx-2.5 cursor-pointer transition-transform duration-200 hover:scale-110"
         onmouseenter={() => hoveredIcon = 'linkedin'}
         onmouseleave={() => hoveredIcon = null}>
        <Linkedin 
          size={24} 
          color={hoveredIcon === 'linkedin' ? '#808080' : '#000000'} 
        />
      </a>
    </div>
  </main>
</div>
