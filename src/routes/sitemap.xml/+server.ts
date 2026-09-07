import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/seo/site';

import { publishedBlogPosts } from '$lib/blog/posts';

const routes = [
	'/',
	'/about',
	'/built',
	'/blog',
	...publishedBlogPosts.map((post) => `/blog/${post.slug}`)
];

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

const toXml = (path: string) => {
	const url = new URL(path, SITE_URL).toString();
	return `<url><loc>${escapeXml(url)}</loc></url>`;
};

export const GET: RequestHandler = async () => {
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		routes.map(toXml).join('') +
		'</urlset>';

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
