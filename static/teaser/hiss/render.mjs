// Renders static/teaser/hiss/index.html over CDP and encodes hiss.mp4.
//   node static/teaser/hiss/render.mjs            # full render
//   STILLS=1,3.5,5 node static/teaser/hiss/render.mjs   # only those seconds, to /tmp/teaser-hiss/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.SITE ?? 'http://localhost:5179';
const fps = 30, frames = '/tmp/teaser-hiss', ffmpeg = '/opt/homebrew/bin/ffmpeg';
const stills = process.env.STILLS?.split(',').map(Number);

const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:64017' });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
await page.goto(`${site}/teaser/hiss/index.html`, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => window.ready, { timeout: 30000 });
console.log(JSON.stringify(await page.evaluate(() => window.ready)));

if (stills) {
  mkdirSync(frames, { recursive: true });
  for (const t of stills) {
    const t0 = Date.now();
    await page.evaluate(t => window.render(t), t);
    await page.screenshot({ path: path.join(frames, `still_${t}.png`), type: 'png' });
    console.log(`t=${t} ${Date.now() - t0}ms`);
  }
} else {
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });
  const duration = await page.evaluate(() => window.DURATION), total = Math.round(duration * fps), t0 = Date.now();
  for (let i = 0; i < total; i++) {
    await page.evaluate(t => window.render(t), i / fps);
    await page.screenshot({ path: path.join(frames, `frame_${String(i).padStart(5, '0')}.png`), type: 'png' });
    if (i % (fps * 3) === 0) console.log(`${i}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const file = path.join(here, 'hiss.mp4');
  execFileSync(ffmpeg, ['-y', '-framerate', String(fps), '-i', path.join(frames, 'frame_%05d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', file], { stdio: ['ignore', 'ignore', 'inherit'] });
  console.log(file, execFileSync(path.join(path.dirname(ffmpeg), 'ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file]).toString());
}
await page.close();
browser.disconnect();
