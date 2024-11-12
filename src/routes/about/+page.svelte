<script>
  import { goto } from '$app/navigation';
</script>

<div class="p-8 max-w-3xl">
  <div class="flex justify-start mb-4">
    <button class="text-blue-600 hover:text-blue-800" on:click={() => goto('/')}>Back</button>
  </div>
  
  <div class="space-y-6 text-lg leading-relaxed">
    <p>
      Hi! I'm Seth Morton, a software engineer from San Diego, going to school in
      Boston. I've been programming since I was 12, starting with my own
      photography website to avoid expensive Wix fees.
    </p>

    <p>
      Since then, I've worked for Smart Border Coalition, BajaBound, Renavest, and
      built over 30 websites and apps. I've had the fortune to work with a lot of amazing people, and I've learned a lot. My favorite thing? Creating things with real value.
    </p>

    <p>
      On the side, I enjoy coffee, GeoGuessr, cycling, geothermal energy, New
      Zealand, the Prof G Markets podcast, and Bennet Coast.
    </p>
  </div>
</div>
