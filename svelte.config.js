import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x'
		}),
		paths: {
			relative: false // Required for PostHog session replay to work correctly
		}
	}
};

export default config;
