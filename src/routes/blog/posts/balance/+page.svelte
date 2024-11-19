<script lang="ts">
  import { goto } from '$app/navigation';
  const publishDate = new Date('2024-03-21');

  function goBack() {
    goto('/blog');
  }
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/computer-modern-font@1.0.1/fonts/Serif/cmun-serif.css">

<div class="h-full overflow-y-auto">
    <div class="flex justify-start p-8">
        <button class="text-blue-600 hover:text-blue-800" onclick={() => goto('/blog')}>Back</button>
      </div>
  <article class="prose prose-lg mx-auto max-w-3xl px-4 py-8 text-black">

    <header class="mb-8">
      <time datetime={publishDate.toISOString()} class="text-sm text-gray-500">
        {publishDate.toLocaleDateString()}
      </time>
      <h1 class="mt-2 text-4xl font-bold">Balance</h1>
    </header>

    <section class="space-y-6">
      <p>Yin-yang, unity of opposites.</p>

      <p>I've found myself consumed in a battle to achieve ideal balance. 
      The more I grow the more I realize that balance is essential - for the good, you need the bad, and vice versa. 
      Balance means two contradictory forces interconnected forming a dynamic whole.</p>

      <p>Balance presents itself in every waking moment of my life:</p>

      <p>Balancing my side projects, school, health, relationships, and money;<br>
      Balancing my drives, needs, and wants;<br>
      Balancing what I give to the world and what I take.</p>

      <div class="my-4">
        <p>Balance seems like a concept akin to infinity - a limit we approach but we'll never fully get there. 
        That's how I feel about a lot of things… if <span class="latex">f(t)</span> is our journey towards balance as a function of time <span class="latex">t</span>, 
        this feels like a good equation that summarizes life:</p>

        <div class="math-display latex">
          <span class="limit-notation">
            <span>lim</span>
            <span class="limit-text">t→∞</span>
          </span>
          <span>f(t) = L</span>
        </div>

        <p>where <span class="latex">L</span> is the ideal balance, the end goal that we'll never meet.</p>
      </div>

      <p>Perhaps there's something beautiful about that. In striving for an ideal balance, 
      we further ourselves, create a positive lasting impact on the world.</p>

      <p>Ideal balance relates to the concept of perfection. In my philosophy classes, 
      I've argued that the state of perfection doesn't exist. Perhaps the balance limit equation should go more like this:</p>

      <div class="math-display latex">
        <span class="limit-notation">
          <span>lim</span>
          <span class="limit-text">t→∞</span>
        </span>
        <span>f(t) = DNE</span>
      </div>

      <p>Why does balance never manifest in its ideal state? This brings us into the idea of some higher power, 
      some universal energy that seems to enforce these laws of balance - something I think I've been aware of 
      since I was young but not as acutely as I am now.</p>

      <p>The meeting point between harmony and disharmony, two forces of opposite direction tugging back and forth 
      so that we're in a constant state of neutrality.</p>

      <p>Where would we be without the yin? Without the struggle?</p>

      <p>Working to embrace pain, to utilize it as a tool to improve and to strive to struggle less, 
      or struggle on more pleasurable struggles.</p>

      <p>Pain makes the highs feel higher.</p>

      <p>I feel as if over my life, I've had to endure a lot of pain. Then, I take a step back and recognize my blessings, 
      my privilege to be alive, to have a mind, the freedom of thought and the capability to exercise it.</p>
    </section>
  </article>
</div>

<style>
  :global(.latex) {
    font-family: "Times New Roman", Times, serif;
    line-height: 1.8;
    text-align: justify;
    hyphens: auto;
    font-feature-settings: "kern" 1, "liga" 1;
    text-rendering: optimizeLegibility;
  }

  .math-display {
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 1rem 0;
  }

  .limit-notation {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.9em;
  }

  .limit-text {
    font-size: 0.8em;
  }
</style>
