// Renders static/teaser/sentence-rewrites/index.html over CDP and encodes sentence-rewrites.mp4.
// Frames are captured with canvas.toDataURL inside the page (page.screenshot fights siblings for the foreground tab).
//   node static/teaser/sentence-rewrites/render.mjs              # full 1080 30fps crf 18
//   PREVIEW=1 node .../render.mjs                                # 540px 12fps crf 28 -> sentence-rewrites-preview.mp4
//   STILLS=1,3,4 node .../render.mjs                             # only those seconds, to /tmp/teaser-sentence-rewrites/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url)), slug = 'sentence-rewrites';
const site = process.env.SITE ?? 'http://localhost:5179';
const preview = !!process.env.PREVIEW;
const fps = preview ? 12 : 30, frames = `/tmp/teaser-${slug}`, ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
const stills = process.env.STILLS?.split(',').map(Number);
const ext = preview ? 'jpg' : 'png';

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const page = await browser.newPage();
page.on('pageerror', e => console.error('pageerror', e.message));
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
await page.goto(`${site}/teaser/${slug}/index.html`, { waitUntil: 'networkidle0' });
await page.waitForFunction(() => window.ready, { timeout: 30000 });
await page.bringToFront();
const info = await page.evaluate(() => window.ready);
console.log(JSON.stringify(info));

// Draws frame t and returns its encoded bytes; preview frames are downscaled to 540 in-page.
const capture = async (t, jpeg) => {
  const url = await page.evaluate((t, jpeg) => {
    window.render(t);
    const c = document.getElementById('c');
    if (!jpeg) return c.toDataURL('image/png');
    const s = window.__small ??= Object.assign(document.createElement('canvas'), { width: 540, height: 540 });
    s.getContext('2d').drawImage(c, 0, 0, 540, 540);
    return s.toDataURL('image/jpeg', .92);
  }, t, jpeg);
  return Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
};

if (stills) {
  mkdirSync(frames, { recursive: true });
  for (const t of stills) writeFileSync(path.join(frames, `still_${t}.png`), await capture(t, false));
} else {
  rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });
  const total = Math.round(info.duration * fps), t0 = Date.now();
  for (let i = 0; i < total; i++) {
    writeFileSync(path.join(frames, `frame_${String(i).padStart(5, '0')}.${ext}`), await capture(i / fps, preview));
    if (i % (fps * 3) === 0) console.log(`${i}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  const file = path.join(here, preview ? `${slug}-preview.mp4` : `${slug}.mp4`);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, `frame_%05d.${ext}`),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '28' : '18', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', file], { stdio: 'inherit' });
  const probe = execFileSync(path.join(path.dirname(ffmpeg), 'ffprobe'), ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt:format=duration', '-of', 'default=nw=1', file]);
  console.log(`${file}\n${probe}`);
}
await page.close();
browser.disconnect();
