// Renders static/teaser/ink-field/index.html over CDP and encodes ink-field.mp4 plus a contact sheet.
//   node static/teaser/ink-field/render.mjs                 # full 1080 30fps crf 18 -> ink-field.mp4
//   PREVIEW=1 node static/teaser/ink-field/render.mjs       # 540px 12fps crf 28 -> ink-field-preview.mp4
//   STILLS=1,3,5 node static/teaser/ink-field/render.mjs    # only those seconds, to /tmp/teaser-ink-field/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.SITE ?? 'http://localhost:5179';
const preview = !!process.env.PREVIEW;
const fps = preview ? 12 : 30, frames = '/tmp/teaser-ink-field', ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
const ffprobe = path.join(path.dirname(ffmpeg), 'ffprobe');
const stills = process.env.STILLS?.split(',').map(Number);

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const page = await browser.newPage();
page.on('pageerror', e => console.error('pageerror', e.message));
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: preview ? .5 : 1 });
await page.goto(`${site}/teaser/ink-field/index.html`, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => window.ready, { timeout: 30000 });
const info = await page.evaluate(() => window.ready);
await page.bringToFront();
console.log(JSON.stringify(info));

// Shared Chromium: page.screenshot serializes on the foreground tab, so frames come back as canvas dataURLs.
const capture = async (t, file) => {
  const url = await page.evaluate((t, scale) => {
    window.render(t);
    const c = document.getElementById('c');
    if (scale === 1) return c.toDataURL('image/png');
    const s = document.createElement('canvas'); s.width = s.height = c.width * scale;
    s.getContext('2d').drawImage(c, 0, 0, s.width, s.height);
    return s.toDataURL('image/png');
  }, t, preview ? .5 : 1);
  writeFileSync(file, Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));
};

if (stills) {
  mkdirSync(frames, { recursive: true });
  for (const t of stills) await capture(t, path.join(frames, `still_${t}.png`));
} else {
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });
  const total = Math.round(info.duration * fps), t0 = Date.now();
  for (let i = 0; i < total; i++) {
    await capture(i / fps, path.join(frames, `frame_${String(i).padStart(5, '0')}.png`));
    if (i % (fps * 2) === 0) console.log(`${i}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const file = path.join(here, preview ? 'ink-field-preview.mp4' : 'ink-field.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'frame_%05d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '28' : '18', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', file], { stdio: 'inherit' });
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', file, '-vf', 'fps=2,scale=270:-1,tile=8x2', '-frames:v', '1', path.join(here, 'sheet.png')], { stdio: 'inherit' });
  console.log(file, execFileSync(ffprobe, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt:format=duration', '-of', 'default=nw=1', file]).toString());
}
await page.close();
browser.disconnect();
