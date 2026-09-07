// Render original canvases at 1280x800, 24fps. Physics advances at 60Hz so its
// timestep cap never slows the story. No GIF palette or screenshot downsampling.
// CDP_URL=http://127.0.0.1:9229 node scripts/render-figures.mjs [group/name ...]
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = process.env.SITE ?? 'http://localhost:5179';
const registry = readFileSync(path.join(root, 'src/lib/blog/anim/index.ts'), 'utf8');
const figures = [];
for (const [, group, body] of registry.matchAll(/^\t(\w+): \[([\s\S]*?)^\t\]/gm))
	for (const [, name] of body.matchAll(/name: '(\w+)'/g)) figures.push({ group, name });
const cycles = {
	'hawf/field': 10,
	'cubic/springs': 12,
	'settling/essay_tree': 18 / 1.7,
	'settling/essay_page': 21,
	'relight/sheet': 10.8,
	'relight/logbook': 13.6,
	'catsat/confluence': 11.5,
	'catsat/columns': 12,
	'catsat/letters': 9.4,
	'cubic/ledger': 11.2,
	'cubic/loom': 10,
	'notes/telegraph': 10.3
};
const choices = process.argv.slice(2);
const browser = await puppeteer.connect({
	browserURL: process.env.CDP_URL,
	protocolTimeout: 180000
});
const audit = [];
try {
	for (const { group, name } of figures.filter(
		(f) => !choices.length || choices.includes(`${f.group}/${f.name}`)
	)) {
		const key = `${group}/${name}`,
			duration = cycles[key] ?? (group === 'harness' ? 10.5 : 18);
		const dir = path.join(root, 'src/lib/blog/anim/media', group);
		mkdirSync(dir, { recursive: true });
		const page = await browser.newPage();
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.setViewport({ width: 640, height: 400, deviceScaleFactor: 2 });
		await page.evaluateOnNewDocument(() => {
			let time = 0,
				queue = [];
			performance.now = () => time;
			window.requestAnimationFrame = (callback) => queue.push(callback);
			window.cancelAnimationFrame = () => {};
			window.advanceFilm = (target) => {
				while (time < target - 0.001) {
					time = Math.min(target, time + 1000 / 60);
					const callbacks = queue;
					queue = [];
					for (const callback of callbacks) callback(time);
				}
			};
		});
		await page.goto(
			`${site}${group === 'hawf' ? '/teaser/terrain/index.html?figure&capture' : `/anim/${key}.html`}`,
			{ waitUntil: 'networkidle0' }
		);
		await page.evaluate(() => document.fonts.ready);
		if (group === 'hawf')
			await page.waitForFunction(() => window.ready, { polling: 100, timeout: 60000 });
		await page.evaluate(() => {
			window.filmCanvas = document.createElement('canvas');
			filmCanvas.width = 1280;
			filmCanvas.height = 800;
		});
		const encoder = spawn('ffmpeg', [
			'-v',
			'error',
			'-y',
			'-f',
			'image2pipe',
			'-vcodec',
			'png',
			'-framerate',
			'24',
			'-i',
			'-',
			'-an',
			...(group === 'hawf' ? ['-vf', 'scale=720:450:flags=lanczos'] : []),
			'-c:v',
			'libx264',
			'-crf',
			group === 'hawf' ? '28' : '20',
			'-preset',
			group === 'hawf' ? 'slow' : 'fast',
			'-pix_fmt',
			'yuv420p',
			'-movflags',
			'+faststart',
			path.join(dir, `${name}.mp4`)
		]);
		let encoderError = '';
		encoder.stderr.on('data', (data) => {
			encoderError += data;
		});
		const finished = once(encoder, 'close');
		const frames = Math.round(duration * 24);
		for (let i = 0; i < frames; i++) {
			const data = await page.evaluate(
				({ t, duration, reset, direct }) => {
					if (direct) window.render(t);
					else advanceFilm(t * 1000);
					const ctx = filmCanvas.getContext('2d');
					ctx.globalAlpha = 1;
					ctx.fillStyle = '#f7f4ec';
					ctx.fillRect(0, 0, 1280, 800);
					ctx.drawImage(document.querySelector('canvas'), 0, 0, 1280, 800);
					// Continuous simulations need an explicit short reset between loops.
					if (reset && t > duration - 0.45) {
						ctx.globalAlpha = (t - duration + 0.45) / 0.45;
						ctx.fillStyle = '#f7f4ec';
						ctx.fillRect(0, 0, 1280, 800);
					}
					return filmCanvas.toDataURL('image/png').split(',')[1];
				},
				{ t: (i + 1) / 24, duration, reset: !cycles[key], direct: group === 'hawf' }
			);
			const buffer = Buffer.from(data, 'base64');
			if (i === Math.round(frames * 0.6)) writeFileSync(path.join(dir, `${name}.png`), buffer);
			if (!encoder.stdin.write(buffer)) await once(encoder.stdin, 'drain');
		}
		encoder.stdin.end();
		const [code] = await finished;
		await page.close();
		if (code !== 0 || errors.length)
			throw new Error(`${key}: ${encoderError} ${errors.join('; ')}`);
		audit.push({
			key,
			frames,
			duration: frames / 24,
			width: group === 'hawf' ? 720 : 1280,
			height: group === 'hawf' ? 450 : 800,
			errors
		});
		console.log(`Rendered ${key}: ${frames} frames`);
	}
	mkdirSync(path.join(root, '.render-cache'), { recursive: true });
	writeFileSync(
		path.join(root, '.render-cache/figure-render-audit.json'),
		JSON.stringify(audit, null, 2)
	);
} finally {
	await browser.disconnect();
}
