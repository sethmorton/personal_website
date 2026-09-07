// PREVIEW=1 node static/teaser/page/render.mjs renders the quick 540px cut first.
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const here = path.dirname(fileURLToPath(import.meta.url));
const preview = process.env.PREVIEW === '1';
const fps = preview ? 12 : 30, size = preview ? 540 : 1080;
const frames = path.join(here, preview ? '.preview-frames' : '.frames');
const ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const page = await browser.newPage();
try {
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.goto(`${process.env.SITE ?? 'http://localhost:5179'}/teaser/page/index.html?offline`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.ready);
  const check = await page.evaluate(() => {
    const c = document.getElementById('ov');
    window.render(0); const first = c.toDataURL();
    window.render(.3); const moving = c.toDataURL();
    window.render(8); const end = c.toDataURL();
    window.render(.3); const repeated = c.toDataURL();
    return { seam: first === end, deterministic: moving === repeated, motion: moving !== first, ...window.ready };
  });
  assert(check.seam && check.deterministic && check.motion, JSON.stringify(check));
  console.log(JSON.stringify(check));
  mkdirSync(frames, { recursive: true });
  const ext = preview ? 'jpg' : 'png';
  for (let i = 0; i < check.duration * fps; i++) {
    const url = await page.evaluate((t, jpeg, size) => {
      window.render(t);
      const source = document.getElementById('ov');
      let output = source;
      if (jpeg) {
        output = window.previewCanvas ??= document.createElement('canvas');
        output.width = output.height = size;
        output.getContext('2d').drawImage(source, 0, 0, size, size);
      }
      return output.toDataURL(jpeg ? 'image/jpeg' : 'image/png', .94);
    }, i / fps, preview, size);
    writeFileSync(path.join(frames, `frame_${String(i).padStart(5, '0')}.${ext}`), Buffer.from(url.slice(url.indexOf(',') + 1), 'base64'));
    if (i % (fps * 2) === 0) console.log(`${i}/${check.duration * fps}`);
  }
  const file = path.join(here, preview ? 'page-preview.mp4' : 'page.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, `frame_%05d.${ext}`),
    '-vf', 'scale=in_range=full:out_range=tv', '-color_range', 'tv', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '25' : '18', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', file], { stdio: 'inherit' });
  console.log(`${file} (${statSync(file).size} bytes)`);
  const probe = execFileSync(path.join(path.dirname(ffmpeg), 'ffprobe'), ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt,nb_frames:format=duration,size', '-of', 'json', file]);
  console.log(probe.toString());
  if (!preview) execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', file, '-vf', 'fps=4,scale=270:270,tile=8x4', '-frames:v', '1', path.join(here, 'sheet.png')]);
} finally {
  await page.close();
  browser.disconnect();
  rmSync(frames, { recursive: true, force: true });
}
