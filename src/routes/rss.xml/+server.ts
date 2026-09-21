import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/seo/site';
import { publishedBlogPosts } from '$lib/blog/posts';
import { BLOG_META } from '$lib/blog/meta';

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

const item = (post: (typeof publishedBlogPosts)[number]) => {
	const url = new URL(`/blog/${post.slug}`, SITE_URL).toString();
	const meta = BLOG_META[post.slug];
	return (
		'<item>' +
		`<title>${escapeXml(meta?.title ?? post.title)}</title>` +
		`<link>${escapeXml(url)}</link>` +
		`<guid isPermaLink="true">${escapeXml(url)}</guid>` +
		`<pubDate>${new Date(post.date).toUTCString()}</pubDate>` +
		(meta?.description ? `<description>${escapeXml(meta.description)}</description>` : '') +
		'</item>'
	);
};

export const GET: RequestHandler = async () => {
	const posts = [...publishedBlogPosts].sort((a, b) => b.date.localeCompare(a.date));
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>' +
		'<title>Seth Morton</title>' +
		`<link>${escapeXml(SITE_URL)}</link>` +
		'<description>Essays by Seth Morton.</description>' +
		'<language>en</language>' +
		`<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` +
		`<atom:link href="${escapeXml(new URL('/rss.xml', SITE_URL).toString())}" rel="self" type="application/rss+xml"/>` +
		posts.map(item).join('') +
		'</channel></rss>';

	return new Response(body, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
