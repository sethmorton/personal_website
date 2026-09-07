// Vite fingerprints these files; the SvelteKit adapter serves them from Vercel's
// immutable CDN asset path. A new render gets a new URL without stale playback.
export const figureVideos = import.meta.glob<string>('./media/*/*.mp4', {
	eager: true,
	query: '?url',
	import: 'default'
});
export const figurePosters = import.meta.glob<string>('./media/*/*.png', {
	eager: true,
	query: '?url',
	import: 'default'
});
