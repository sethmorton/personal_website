import type { Handle } from '@sveltejs/kit';

// Reverse proxy selected PostHog endpoints through a non-obvious path.
// This keeps analytics requests first‑party and helps with ad/tracker blockers.
// Note: hooks run only in SSR. If fully prerendered, this will not apply.
export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  // Use a unique prefix; avoid common names like /analytics or /posthog
  const relayPrefix = '/relay-VzfJ';

  if (pathname.startsWith(relayPrefix)) {
    // Choose ingestion/static hosts (switch to eu.* for EU Cloud if needed)
    const hostname = pathname.startsWith(`${relayPrefix}/static/`)
      ? 'us-assets.i.posthog.com'
      : 'us.i.posthog.com';

    // Build the external URL (preserve query string)
    const url = new URL(event.request.url);
    url.protocol = 'https:';
    url.hostname = hostname;
    url.port = '443';
    url.pathname = pathname.replace(/^\/relay-VzfJ\/?/, '');

    // Clone headers and adjust for proxying
    const headers = new Headers(event.request.headers);
    headers.set('Accept-Encoding', ''); // avoid compressed streaming issues on some runtimes
    headers.set('host', hostname); // may be ignored by fetch impl; safe to set

    const method = event.request.method;

    const init: RequestInit = {
      method,
      headers,
      body: method !== 'GET' && method !== 'HEAD' ? event.request.body : undefined
    };

    // Node/undici needs duplex specified when streaming a request body
    (init as any).duplex = 'half';

    const response = await fetch(url.toString(), init);
    return response;
  }

  return resolve(event);
};

