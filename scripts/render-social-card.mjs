import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const browser = await puppeteer.connect({
	browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:9229'
});
const page = await browser.newPage();
try {
	await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
	await page.goto(pathToFileURL(resolve('scripts/social/the-shape-of-inference.html')).href);
	await page.evaluate(async () => {
		await document.fonts.ready;
		await Promise.all([...document.images].map((image) => image.decode()));
	});
	await mkdir('static/social', { recursive: true });
	await page.screenshot({ path: 'static/social/the-shape-of-inference-blue-horn.png' });
} finally {
	await page.close();
	browser.disconnect();
}
