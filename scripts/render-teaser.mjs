// Renders the eyepiece teaser (static/teaser/index.html) frame by frame over CDP and encodes it with ffmpeg.
//
//   node scripts/render-teaser.mjs [square|wide]                  # final 1080p 30fps mp4s into static/teaser/eyepiece/
//   PREVIEW=1 node scripts/render-teaser.mjs square               # 540px 12fps crf 28 <name>-preview.mp4, about 10s
//   STILLS=0.7,3.5,9.3 NOFILM=1 node scripts/render-teaser.mjs    # QA stills straight from the browser into /tmp/teaser-qa/
//
// Plates: static/teaser/plates/manifest.json plus <name>_ink*.png from scripts/ink-plates.py.
// Env: CDP_URL (running Chromium, default http://127.0.0.1:64017), SITE (dev server, default http://localhost:5179),
//      FPS (default 30, preview 12), FRAMES (default /tmp/teaser), FFMPEG (default /opt/homebrew/bin/ffmpeg).
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = process.env.SITE ?? 'http://localhost:5179';
const preview = !!process.env.PREVIEW, stills = process.env.STILLS?.split(',').map(Number) ?? [];
const fps = Number(process.env.FPS ?? (preview ? 12 : 30)), scale = preview ? 0.5 : 1;
const frames = process.env.FRAMES ?? '/tmp/teaser';
const ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
const ffprobe = path.join(path.dirname(ffmpeg), 'ffprobe');
const out = path.join(root, 'static/teaser/eyepiece');
const only = process.argv[2];

const variants = [
  { name: 'square', width: 1080, height: 1080, query: '?square', file: 'the-shape-of-inference-square' },
  { name: 'wide', width: 1920, height: 1080, query: '', file: 'the-shape-of-inference' }
].filter(v => !only || v.name === only);

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
mkdirSync(out, { recursive: true }); mkdirSync('/tmp/teaser-qa', { recursive: true });

for (const v of variants) {
  const dir = path.join(frames, v.name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: scale });
  await page.goto(`${site}/teaser/index.html${v.query}`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.ready, { timeout: 30000 });
  const info = await page.evaluate(() => window.ready);
  console.log(`[${v.name}] ${JSON.stringify(info)}`);
  // Capture canvas pixels directly; compositor screenshots can duplicate strips during rapid seeking.
  const capture = async (t, file) => {
    const data = await page.evaluate(({ t, scale }) => {
      window.render(t);
      const source = document.getElementById('page');
      if (scale === 1) return source.toDataURL('image/png').split(',')[1];
      const output = document.createElement('canvas');
      output.width = source.width * scale; output.height = source.height * scale;
      output.getContext('2d').drawImage(source, 0, 0, output.width, output.height);
      return output.toDataURL('image/png').split(',')[1];
    }, { t, scale });
    writeFileSync(file, Buffer.from(data, 'base64'));
  };
  for (const t of stills) {
    await capture(t, `/tmp/teaser-qa/${v.name}-${t}.png`);
  }
  if (process.env.NOFILM) { await page.close(); continue; }

  const total = Math.round(info.duration * fps), t0 = Date.now();
  for (let i = 0; i < total; i++) {
    await capture(i / fps, path.join(dir, `frame_${String(i).padStart(5, '0')}.png`));
    if (i % (fps * 5) === 0) console.log(`[${v.name}] ${i}/${total} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  await page.close();

  const file = path.join(out, `${v.file}${preview ? '-preview' : ''}.mp4`);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(dir, 'frame_%05d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '28' : '18', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', file], { stdio: 'inherit' });
  const probe = execFileSync(ffprobe, ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt:format=duration', '-of', 'default=nw=1', file]);
  console.log(`${file}\n${probe}`);
}
browser.disconnect();
