// Renders static/teaser/hero/index.html over CDP into hero.mp4, hero.gif and sheet.png.
//   node static/teaser/hero/render.mjs                  # 1080 30fps crf 16 mp4, 960/720 px gif, contact sheet
//   PREVIEW=1 node static/teaser/hero/render.mjs        # 540px 12fps crf 28 -> hero-preview.mp4 only
//   STILLS=2.5,6,7.8 node static/teaser/hero/render.mjs # only those seconds, to /tmp/teaser-hero/still_<t>.png
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = process.env.SITE ?? 'http://localhost:5179';
const preview = !!process.env.PREVIEW;
const fps = preview ? 12 : 30, frames = '/tmp/teaser-hero', ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
const ffprobe = path.join(path.dirname(ffmpeg), 'ffprobe');
const stills = process.env.STILLS?.split(',').map(Number);

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const page = await browser.newPage();
page.on('pageerror', e => console.error('pageerror', e.message));
await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
const open = async q => {
  await page.goto(`${site}/teaser/hero/index.html?t=0${q}`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.ready, { timeout: 60000 });
  return page.evaluate(() => window.ready);
};
const info = await open('');
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
const probe = file => execFileSync(ffprobe, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate,codec_name,pix_fmt:format=duration', '-of', 'default=nw=1', file]).toString();

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
  const mp4 = path.join(here, preview ? 'hero-preview.mp4' : 'hero.mp4');
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'frame_%05d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', preview ? '28' : '16', '-preset', preview ? 'veryfast' : 'slow', '-movflags', '+faststart', mp4], { stdio: 'inherit' });
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', mp4, '-vf', 'fps=2,scale=270:-1,tile=10x2', '-frames:v', '1', preview ? path.join(frames, 'sheet-preview.png') : path.join(here, 'sheet.png')], { stdio: 'inherit' });
  console.log(mp4, probe(mp4));
  if (!preview) {
    // GIF: structural motion complete, micro-breathing held at 1 Hz (?boil=0) so the palette does not churn every frame.
    // 960 px at 20 fps first, then 15 fps, then 720 px; stop at the first that fits 12 MB.
    const gif = path.join(here, 'hero.gif'), palette = path.join(frames, 'palette.png');
    await open('&boil=0');
    let lastFps = 0;
    for (const [size, gfps] of [[960, 20], [960, 15], [720, 15]]) {
      if (gfps !== lastFps) {
        const gdir = path.join(frames, 'gif'); rmSync(gdir, { recursive: true, force: true }); mkdirSync(gdir, { recursive: true });
        for (let i = 0; i < info.duration * gfps; i++) await capture(i / gfps, path.join(gdir, `frame_${String(i).padStart(5, '0')}.png`));
        lastFps = gfps;
      }
      const pre = `scale=${size}:-1:flags=lanczos`, src = ['-framerate', String(gfps), '-i', path.join(frames, 'gif', 'frame_%05d.png')];
      execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...src, '-vf', `${pre},palettegen=max_colors=64:stats_mode=diff`, palette], { stdio: 'inherit' });
      execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...src, '-i', palette, '-lavfi', `${pre}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`, '-loop', '0', gif], { stdio: 'inherit' });
      console.log(gif, (statSync(gif).size / 1e6).toFixed(1), 'MB', probe(gif));
      if (statSync(gif).size < 12e6) break;
    }
  }
}
await page.close();
browser.disconnect();
