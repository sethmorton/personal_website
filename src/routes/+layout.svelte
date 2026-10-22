<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { beforeNavigate, afterNavigate, onNavigate } from '$app/navigation';
	import { PUBLIC_POSTHOG_KEY } from '$env/static/public';

	let { children } = $props();

	if (browser) {
		// PostHog (178 KB) loads after the page's load event and its next painted frame, so it never
		// competes with first paint. Events, and errors thrown before it arrives, queue in order.
		const early: unknown[] = [];
		const keep = (e: ErrorEvent | PromiseRejectionEvent) =>
			early.push('reason' in e ? e.reason : e.error);
		addEventListener('error', keep);
		addEventListener('unhandledrejection', keep);
		const loaded = new Promise<void>((r) => {
			const go = () => requestAnimationFrame(() => setTimeout(r));
			if (document.readyState === 'complete') go();
			else addEventListener('load', go, { once: true });
		})
			.then(() => import('posthog-js'))
			.then(({ default: posthog }) => {
				// Via our first-party proxy set up in hooks.server.ts.
				posthog.init(PUBLIC_POSTHOG_KEY, {
					api_host: '/relay-VzfJ', // proxied ingestion endpoint
					ui_host: 'https://us.posthog.com', // change to EU UI if needed
					capture_pageview: false,
					capture_pageleave: false,
					capture_exceptions: true,
					persistence: 'localStorage',
					person_profiles: 'always'
				});
				removeEventListener('error', keep);
				removeEventListener('unhandledrejection', keep);
				for (const err of early) posthog.captureException(err);
				return posthog;
			});
		// The URL is read now, not when PostHog arrives, so a queued event keeps its own page.
		const capture = (event: string) => {
			const url = location.href;
			loaded.then((posthog) => posthog.capture(event, { $current_url: url }));
		};
		beforeNavigate(() => capture('$pageleave'));
		afterNavigate(() => capture('$pageview'));
	}

	// Crossfade between pages via the View Transitions API (no-op where unsupported).
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="min-h-screen">
	{@render children()}
</div>
