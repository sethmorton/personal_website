// CDP_URL=http://127.0.0.1:9229 BASE_URL=http://localhost:5179 node scripts/check-publication.mjs
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

const base = process.env.BASE_URL ?? 'http://localhost:5179';
const article = '/blog/the_shape_of_inference';
const html = await (await fetch(base + article)).text();
assert(html.includes('In 1964, two radio astronomers'), 'Article body must be server rendered');
assert(html.includes('September 7, 2026'), 'Publication date missing');
assert(!html.includes('(Draft)'), 'Published article still marked draft');
assert(html.includes('critical computational advantage'), 'Revised caching explanation missing');
assert(html.includes('Co-construction.'), 'Revised section heading missing');
assert(html.includes('The models of tomorrow'), 'Revised conclusion missing');
assert(
	(await (await fetch(base + '/sitemap.xml')).text()).includes(article),
	'Missing sitemap entry'
);
const redirect = await fetch(base + '/blog/drafts/the_shape_of_inference', { redirect: 'manual' });
assert.equal(redirect.status, 308);
assert.equal(redirect.headers.get('location'), article);
assert.equal((await fetch(base + '/blog/not-a-post')).status, 404);
assert.equal((await fetch(base + '/blog/drafts/not-a-post')).status, 404);

assert(process.env.CDP_URL, 'Set CDP_URL to a Chromium debugging URL');
const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
	for (const width of [320, 390, 768, 1440]) {
		await page.setViewport({ width, height: width === 1440 ? 900 : 844, deviceScaleFactor: 1 });
		for (const path of ['/', '/blog', '/about', '/built', '/blog/drafts', article]) {
			await page.goto(base + path, { waitUntil: 'networkidle0' });
			const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
			assert(overflow <= 1, `Horizontal overflow at ${width}px: ${path} (${overflow}px)`);
			if (path === '/blog') assert(await page.$(`a[href="${article}"]`), 'Missing published entry');
			if (path === '/blog/drafts')
				assert(!(await page.$(`a[href*="the_shape_of_inference"]`)), 'Still in drafts');
		}
		console.log(`PASS: pages fit ${width}px`);
	}
	assert.equal(await page.$$eval('figure.anim', (figures) => figures.length), 8);
	assert.equal(
		await page.$$eval(
			'figure.anim figcaption',
			(nodes) => nodes.filter((n) => n.textContent.includes('Six blocks share 15 springs')).length
		),
		1
	);
	assert.equal(
		await page.$$eval(
			'figure.anim figcaption',
			(nodes) => nodes.filter((n) => n.textContent.includes('One dense all-pairs sweep')).length
		),
		1
	);
	assert(
		await page.$$eval('figure.anim figcaption', (nodes) =>
			nodes.some((n) => n.textContent.includes('A flow metaphor'))
		),
		'Original stream not selected'
	);
	assert(
		await page.evaluate(() => {
			const paragraph = [...document.querySelectorAll('p')].find((p) =>
				p.textContent.startsWith('This is the broad intuition')
			);
			const springs = [...document.querySelectorAll('figure.anim')].find((f) =>
				f.textContent.includes('Six blocks share 15 springs')
			);
			return (
				!!paragraph &&
				!!springs &&
				!!(paragraph.compareDocumentPosition(springs) & Node.DOCUMENT_POSITION_FOLLOWING)
			);
		}),
		'Dense-spring figure must follow the broad-intuition paragraph'
	);
	assert.equal(await page.$('.film video'), null, 'Film should not load until opened');
	await page.click('.film summary');
	await page.waitForSelector('.film video');
	await page.$eval('.film video', (video) => video.play());
	await page.waitForFunction(() => document.querySelector('.film video').currentTime > 0);
	await page.click('.film summary');
	await page.waitForSelector('.film video', { hidden: true });

	const figure = await page.$('figure.anim');
	await figure.evaluate((node) => node.scrollIntoView({ block: 'center' }));
	await page.waitForFunction(() => document.querySelector('figure.anim video').currentTime > 0.5);
	await page.click('.motion-control');
	await page.waitForFunction(() => document.querySelector('figure.anim video').paused);
	await page.click('.motion-control');
	await page.waitForFunction(() => !document.querySelector('figure.anim video').paused);
	const before = await page.$eval('figure.anim video', (video) => video.currentTime);
	await page.evaluate(() => scrollTo(0, 0));
	await page.waitForFunction(() => document.querySelector('figure.anim video').paused);
	await figure.evaluate((node) => node.scrollIntoView({ block: 'center' }));
	await page.waitForFunction(() => !document.querySelector('figure.anim video').paused);
	assert(
		(await page.$eval('figure.anim video', (video) => video.currentTime)) >= before,
		'Scroll resets figure'
	);
	for (const f of await page.$$('figure.anim')) {
		await f.evaluate((node) => node.scrollIntoView({ block: 'center' }));
		await page.waitForFunction((node) => node.querySelector('video').readyState >= 2, {}, f);
		assert(await f.$eval('video', (video) => !video.error && video.videoWidth >= 720));
		const variants = await f.$$('.chips button');
		for (const button of variants) {
			await button.click();
			await page.waitForFunction((node) => node.querySelector('video').readyState >= 2, {}, f);
			assert(await f.$eval('video', (video) => !video.error && video.videoWidth === 1280));
		}
	}
	await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
	await page.reload({ waitUntil: 'networkidle0' });
	await page.$eval('figure.anim', (node) => node.scrollIntoView({ block: 'center' }));
	assert(await page.$eval('figure.anim video', (video) => video.paused && !!video.poster));
	assert.equal(
		await page.$eval('.motion-control', (node) => node.textContent.trim()),
		'Play animation'
	);
	assert.deepEqual(errors, []);
	console.log(
		'PASS: publication, redirect, SSR, film, all figure variants, pause/resume and reduced motion'
	);
} finally {
	await page.close();
	await browser.disconnect();
}
