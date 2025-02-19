<script lang="ts">
	import { onMount } from "svelte";

    let email = '';
    let subscribed = false;
    onMount(() => {
        const storedEmail = localStorage.getItem('email');
        const storedSubscribed = localStorage.getItem('subscribed');
        if (storedEmail) {
            email = storedEmail;
        }
        if (storedSubscribed === 'true') {
            subscribed = true;
        }
    });
    async function handleSubmit(e : Event) {
        e.preventDefault();
        let subject = 'New Subscriber for Your Blog';
        let body = `Email: ${email}`;
        let to = 'sethmorton05@gmail.com';
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: JSON.stringify({ subject, body, to }) 
            });
            if (response.ok) {
                subscribed = true; // Update from 'submitted' to 'subscribed'
                localStorage.setItem('email', email); // Store email in localStorage
                localStorage.setItem('subscribed', 'true'); // Store subscription status
            } else {
                console.error('Failed to subscribe:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

<div class="w-72 space-y-3">
    {#if !subscribed}
        <p class="text-sm text-gray-600">
            Get a reminder when I release a new post
        </p>
        <form onsubmit={handleSubmit} class="space-y-2">
            <input
                type="email"
                bind:value={email}
                placeholder="you@example.com"
                required
                aria-label="Email address"
                class="w-full rounded border border-gray-200 p-2 text-sm transition-colors focus:border-gray-400 focus:outline-none"
            />
            <button
                type="submit"
                class="w-full rounded bg-gray-900 p-2 text-sm text-white transition-colors hover:bg-gray-800"
            >
                Subscribe
            </button>
        </form>
    {:else}
        <div class="text-sm text-gray-600">
            Thank you for subscribing
        </div>
    {/if}
</div>