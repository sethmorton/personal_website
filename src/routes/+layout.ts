import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';

// Initialize PostHog via our first‑party proxy set up in hooks.server.ts
export const load = async () => {
    if (browser) {
        posthog.init(PUBLIC_POSTHOG_KEY, {
            api_host: '/relay-VzfJ', // proxied ingestion endpoint
            ui_host: 'https://us.posthog.com', // change to EU UI if needed
            capture_pageview: false,
            capture_pageleave: false,
            capture_exceptions: true,
            persistence: 'localStorage',
            person_profiles: 'always'
        });
    }
    return;
};
