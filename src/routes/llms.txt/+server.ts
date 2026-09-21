import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/seo/site';
import { publishedBlogPosts } from '$lib/blog/posts';
import { BLOG_META } from '$lib/blog/meta';

// llms.txt: a plain index for AI crawlers (https://llmstxt.org).
export const GET: RequestHandler = async () => {
	const posts = [...publishedBlogPosts].sort((a, b) => b.date.localeCompare(a.date));
	const lines = [
		'# Seth Morton',
		'',
		'> Personal site and essays by Seth Morton on machine learning, biology, memory, attention, and building things.',
		'',
		'## Essays',
		'',
		...posts.map((p) => {
			const meta = BLOG_META[p.slug];
			const url = new URL(`/blog/${p.slug}`, SITE_URL).toString();
			return `- [${meta?.title ?? p.title}](${url}): ${meta?.description ?? ''} (${p.date})`.trimEnd();
		}),
		'',
		'## Other pages',
		'',
		`- [About](${new URL('/about', SITE_URL)})`,
		`- [Built](${new URL('/built', SITE_URL)})`,
		`- [RSS](${new URL('/rss.xml', SITE_URL)})`,
		''
	];
	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'max-age=0, s-maxage=3600' }
	});
};
