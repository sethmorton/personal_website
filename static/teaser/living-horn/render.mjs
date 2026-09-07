// Renders static/teaser/living-horn/index.html over CDP and encodes living-horn.mp4.
//   node static/teaser/living-horn/render.mjs                 # full 1080 30fps crf 18
//   PREVIEW=1 node static/teaser/living-horn/render.mjs       # 540px 12fps crf 28 -> living-horn-preview.mp4
//   STILLS=0.4,4,9.5 node static/teaser/living-horn/render.mjs  # stills only, to /tmp/teaser-living-horn/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url)), slug = 'living-horn';
const site = process.env.SITE ?? 'http://localhost:5179';
const preview = !!process.env.PREVIEW;
const fps = preview ? 12 : 30, frames = `/tmp/teaser-${slug}`, ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
const stills = process.env.STILLS?.split(',').map(Number);

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const page = await browser.newPage();
await page.bringToFront();
page.on('pageerror', e => console.error('pageerror', e.message));
page.on('console', m => console.log('console', m.text()));
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
// Frames come from canvas.toDataURL: page.screenshot serializes on the foreground tab and hangs when siblings render.
const ext = preview ? 'jpg' : 'png';
async function capture(t, file) {
  const url = await page.evaluate((t, jpeg) => { window.render(t); return document.getElementById('ov').toDataURL(jpeg ? 'image/jpeg' : 'image/png', 0.92); }, t, preview);
  writeFileSync(file, Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));
}
await page.goto(`${site}/teaser/${slug}/index.html`, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => window.ready, { timeout: 30000 });
const info = await page.evaluate(() => window.ready);
console.log(JSON.stringify(info));

if (stills) {
  mkdirSync(frames, { recursive: true });
  for (const t of stills) await capture(t, path.join(frames, `still_${t}.${ext}`));
} else {
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });
  const total = Math.round(info.duration * fps), t0 = Date.now();
  for (let i = 0; i < total; i++) {
    await capture(i / fps, path.join(frames, `frame_${String(i).padStart(5, '0')}.${ext}`));
    if (i % (fps * 3) === 0) console.log(`${i}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const file = path.join(here, preview ? `${slug}-preview.mp4` : `${slug}.mp4`);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, `frame_%05d.${ext}`),
    ...(preview ? ['-vf', 'scale=540:540'] : []),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '28' : '18', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', file], { stdio: 'inherit' });
  const probe = execFileSync(path.join(path.dirname(ffmpeg), 'ffprobe'), ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt:format=duration', '-of', 'default=nw=1', file]);
  console.log(`${file}\n${probe}`);
}
await page.close();
browser.disconnect();
