// Renders static/teaser/mobile/index.html over CDP and encodes mobile.mp4.
//   node static/teaser/mobile/render.mjs                 # full 1080 30fps crf 18 -> mobile.mp4
//   PREVIEW=1 node static/teaser/mobile/render.mjs       # 540px 12fps crf 28 -> mobile-preview.mp4
//   STILLS=0,1.4,6 node static/teaser/mobile/render.mjs  # only those seconds, to /tmp/teaser-mobile/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.SITE ?? 'http://localhost:5179';
const preview = !!process.env.PREVIEW;
const fps = preview ? 12 : 30, frames = '/tmp/teaser-mobile', ffmpeg = '/opt/homebrew/bin/ffmpeg';
const stills = process.env.STILLS?.split(',').map(Number);

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const page = await browser.newPage();
page.on('pageerror', e => console.error('pageerror', e.message));
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
await page.goto(`${site}/teaser/mobile/index.html`, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForFunction(() => window.ready, { timeout: 30000 });
await page.bringToFront();
const info = await page.evaluate(() => window.ready);
console.log(JSON.stringify(info));

// Several renderers share this Chromium and page.screenshot serializes on the foreground tab, so frames come from the canvas itself.
const capture = async (t, file, small) => {
  const url = await page.evaluate((t, small) => {
    window.render(t);
    const c = document.getElementById('c');
    if (!small) return c.toDataURL('image/png');
    const d = document.createElement('canvas'); d.width = d.height = 540;
    d.getContext('2d').drawImage(c, 0, 0, 540, 540); return d.toDataURL('image/jpeg', .92);
  }, t, small);
  writeFileSync(file, Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));
};

if (stills) {
  mkdirSync(frames, { recursive: true });
  for (const t of stills) {
    const t0 = Date.now();
    await capture(t, path.join(frames, `still_${t}.png`), false);
    console.log(`t=${t} ${Date.now() - t0}ms`);
  }
} else {
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });
  const total = Math.round(info.duration * fps), t0 = Date.now(), ext = preview ? 'jpg' : 'png';
  for (let i = 0; i < total; i++) {
    await capture(i / fps, path.join(frames, `frame_${String(i).padStart(5, '0')}.${ext}`), preview);
    if (i % (fps * 3) === 0) console.log(`${i}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const file = path.join(here, preview ? 'mobile-preview.mp4' : 'mobile.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, `frame_%05d.${ext}`),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '28' : '18', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', file], { stdio: 'inherit' });
  const probe = execFileSync(path.join(path.dirname(ffmpeg), 'ffprobe'), ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt,nb_frames:format=duration', '-of', 'default=nw=1', file]);
  console.log(`${file}\n${probe}`);
}
await page.close();
browser.disconnect();
