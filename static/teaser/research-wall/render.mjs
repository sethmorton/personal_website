// Renders static/teaser/research-wall/index.html over CDP and encodes research-wall.mp4.
//   node static/teaser/research-wall/render.mjs                 # full 1080 30fps crf 18
//   PREVIEW=1 node static/teaser/research-wall/render.mjs       # 540px 12fps crf 28 -> research-wall-preview.mp4
//   STILLS=1,3,4 node static/teaser/research-wall/render.mjs    # only those seconds, to /tmp/teaser-research-wall/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.SITE ?? 'http://localhost:5179';
const preview = !!process.env.PREVIEW;
const fps = preview ? 12 : 30, frames = '/tmp/teaser-research-wall', ffmpeg = '/opt/homebrew/bin/ffmpeg';
const stills = process.env.STILLS?.split(',').map(Number);

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const page = await browser.newPage();
page.on('pageerror', e => console.error('pageerror', e.message));
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: preview ? .5 : 1 });
await page.goto(`${site}/teaser/research-wall/index.html`, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => window.ready, { timeout: 30000 });
const info = await page.evaluate(() => window.ready);
console.log(JSON.stringify(info));
await page.bringToFront();
// Shared Chromium: page.screenshot serializes on the foreground tab, so grab the canvas pixels directly.
const capture = async (t, file) => {
  const url = await page.evaluate(t => { window.render(t); return document.getElementById('c').toDataURL('image/png'); }, t);
  writeFileSync(file, Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));
};

if (stills) {
  mkdirSync(frames, { recursive: true });
  for (const t of stills) {
    const t0 = Date.now();
    await capture(t, path.join(frames, `still_${t}.png`));
    console.log(`t=${t} ${Date.now() - t0}ms`);
  }
} else {
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });
  const total = Math.round(info.duration * fps), t0 = Date.now();
  for (let i = 0; i < total; i++) {
    await capture(i / fps, path.join(frames, `frame_${String(i).padStart(5, '0')}.png`));
    if (i % (fps * 3) === 0) console.log(`${i}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const file = path.join(here, preview ? 'research-wall-preview.mp4' : 'research-wall.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'frame_%05d.png'),
    ...(preview ? ['-vf', 'scale=540:540'] : []),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '28' : '18', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', file], { stdio: 'inherit' });
  const probe = execFileSync(path.join(path.dirname(ffmpeg), 'ffprobe'), ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt:format=duration', '-of', 'default=nw=1', file]);
  console.log(`${file}\n${probe}`);
}
await page.close();
browser.disconnect();
