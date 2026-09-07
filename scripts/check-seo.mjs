import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

const origin = process.env.PREVIEW_URL ?? 'http://localhost:5179';
const canonicalOrigin = 'https://www.sethmorton.com';
const browser = await puppeteer.connect({
	browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:9229'
});
const page = await browser.newPage();
const descriptions = new Set();
try {
	const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
	assert.equal(sitemapResponse.status, 200);
	const sitemap = await sitemapResponse.text();
	const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
		match[1].replaceAll('&amp;', '&')
	);
	assert(urls.length >= 16);
	assert.equal(new Set(urls).size, urls.length);
	assert(urls.every((url) => url.startsWith(canonicalOrigin) && !url.includes('/drafts/')));
	for (const url of urls) {
		const path = new URL(url).pathname;
		const response = await fetch(`${origin}${path}?utm_source=seo-check`);
		assert.equal(response.status, 200, path);
		const html = await response.text();
		const metadata = await page.evaluate((source) => {
			const document = new DOMParser().parseFromString(source, 'text/html');
			const content = (selector) => document.querySelector(selector)?.getAttribute('content');
			return {
				title: document.title,
				canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
				description: content('meta[name="description"]'),
				robots: content('meta[name="robots"]'),
				image: content('meta[property="og:image"]'),
				twitterImage: content('meta[name="twitter:image"]'),
				imageAlt: content('meta[property="og:image:alt"]'),
				width: content('meta[property="og:image:width"]'),
				height: content('meta[property="og:image:height"]'),
				h1: document.querySelectorAll('h1').length,
				structuredData: [...document.querySelectorAll('script[type="application/ld+json"]')].map(
					(script) => JSON.parse(script.textContent)
				)
			};
		}, html);
		assert(metadata.title && metadata.description && metadata.imageAlt, path);
		assert(!descriptions.has(metadata.description), `Duplicate description: ${path}`);
		descriptions.add(metadata.description);
		assert.equal(metadata.canonical, url, path);
		assert.equal(metadata.h1, 1, `Expected one H1: ${path}`);
		assert(!metadata.robots.includes('noindex'), path);
		assert.equal(metadata.twitterImage, metadata.image, path);
		assert(metadata.image.startsWith(canonicalOrigin), path);
		assert.equal(
			(await fetch(`${origin}${new URL(metadata.image).pathname}`)).status,
			200,
			metadata.image
		);
		assert(!JSON.stringify(metadata.structuredData).includes('sethmorton.xyz'), path);
		if (path.startsWith('/blog/')) {
			const article = metadata.structuredData.find((data) => data['@type'] === 'BlogPosting');
			assert(article?.datePublished && article?.author?.name === 'Seth Morton', path);
			assert.equal(article.url, url, path);
		}
		if (path.endsWith('/the_shape_of_inference')) {
			assert(metadata.image.endsWith('/social/the-shape-of-inference-blue-horn.png'));
			assert.equal(metadata.width, '1200');
			assert.equal(metadata.height, '630');
		}
	}
	for (const path of ['/blog/drafts', '/blog/drafts/paths_not_points']) {
		const html = await (await fetch(`${origin}${path}`)).text();
		assert(/name="robots" content="noindex, nofollow"/.test(html), path);
	}
	assert.equal((await fetch(`${origin}/blog/not-a-published-essay`)).status, 404);
	const robots = await (await fetch(`${origin}/robots.txt`)).text();
	assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
	console.log(
		`SEO passed: ${urls.length} public pages; canonical URLs, unique descriptions, article schema, social images, draft exclusions, and 404 status.`
	);
} finally {
	await page.close();
	browser.disconnect();
}
