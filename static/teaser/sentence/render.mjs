// Renders static/teaser/sentence/index.html over CDP and encodes sentence.mp4.
//   node render.mjs              # full render
//   node render.mjs 1 3 5        # stills at those seconds into /tmp/teaser-sentence/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.SITE ?? 'http://localhost:5179';
const fps = 30, frames = '/tmp/teaser-sentence', ffmpeg = '/opt/homebrew/bin/ffmpeg';
const stills = process.argv.slice(2).map(Number);

const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:64017' });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
await page.goto(`${site}/teaser/sentence/index.html`, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => window.ready, { timeout: 60000 });
console.log(JSON.stringify(await page.evaluate(() => window.ready)));
mkdirSync(frames, { recursive: true });

if (stills.length) {
  for (const t of stills) {
    await page.evaluate(t => window.render(t), t);
    await page.screenshot({ path: path.join(frames, `still_${t}.png`), type: 'png' });
  }
} else {
  const duration = await page.evaluate(() => window.DURATION);
  const total = Math.round(duration * fps), t0 = Date.now();
  for (let i = 0; i < total; i++) {
    await page.evaluate(t => window.render(t), i / fps);
    await page.screenshot({ path: path.join(frames, `frame_${String(i).padStart(5, '0')}.png`), type: 'png' });
    if (i % (fps * 5) === 0) console.log(`${i}/${total} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const file = path.join(here, 'sentence.mp4');
  execFileSync(ffmpeg, ['-y', '-framerate', String(fps), '-i', path.join(frames, 'frame_%05d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', file], { stdio: ['ignore', 'ignore', 'inherit'] });
  console.log(file);
}
await page.close();
browser.disconnect();
