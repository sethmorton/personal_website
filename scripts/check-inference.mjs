// Run against the dev server and a Chromium remote-debugging port:
// CDP_URL=http://127.0.0.1:9222 node scripts/check-inference.mjs
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';

assert(process.env.CDP_URL, 'Set CDP_URL to a running Chromium remote-debugging URL');
const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const base = process.env.BASE_URL || 'http://localhost:5179';
try {
	await page.goto(`${base}/anim/settling/manuscript.html?t=0`, { waitUntil: 'load' });
	const frames = await page.evaluate(() => {
		const canvas = document.querySelector('canvas');
		const context = canvas.getContext('2d');
		return [1.9, 4.7, 6.4, 14.79, 14.81, 19.5, 29.61, 60].map((time) => {
			window.draw(time);
			const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
			let red = 0,
				blue = 0,
				signature = 0;
			for (let i = 0; i < pixels.length; i += 4) {
				const r = pixels[i],
					g = pixels[i + 1],
					b = pixels[i + 2];
				if (r > g + 45 && r > b + 45) red++;
				if (b > r + 20) {
					blue++;
					signature += i * (b - r);
				}
			}
			return { time, red, blue, signature };
		});
	});
	for (const frame of frames) {
		assert(frame.red > 100, `Red sentence missing at ${frame.time}s`);
		assert(frame.blue > 1000, `Essay cleared at ${frame.time}s`);
	}
	assert.notEqual(
		frames[1].signature,
		frames[5].signature,
		'Essay repeats after the old 14.8s cycle'
	);
	assert.notEqual(frames[5].signature, frames[7].signature, 'Essay stops restructuring');
	for (const path of ['relight/sheet.html?t=9.5', 'notes/triangles.html?t=7.2']) {
		await page.goto(`${base}/anim/${path}`, { waitUntil: 'load' });
	}
	assert.deepEqual(errors, [], 'Animation runtime errors');
	console.table(frames);
	await page.goto(`${base}/blog/the_shape_of_inference`, { waitUntil: 'load' });
	await page.waitForSelector('figure.anim');
	await page.evaluate(() => document.querySelector('figure.anim').scrollIntoView());
	await page.waitForFunction(() => document.querySelector('figure.anim video')?.currentTime > 2);
	const before = await page.$eval('figure.anim video', (video) => video.currentTime);
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.waitForFunction(() => document.querySelector('figure.anim video').paused);
	await page.evaluate(() => document.querySelector('figure.anim').scrollIntoView());
	await page.waitForFunction(() => !document.querySelector('figure.anim video').paused);
	const after = await page.$eval('figure.anim video', (video) => video.currentTime);
	assert(after >= before, 'Scrolling away restarts the figure');
	assert.deepEqual(errors, [], 'Animation runtime errors');
	console.log(
		'PASS: early red sentence, retained essay through 60s, changing structure, scroll continuity, no animation errors'
	);
} finally {
	await page.close();
	await browser.disconnect();
}
