// Renders every live figure in src/lib/blog/anim/index.ts to a looping GIF beside its page: static/anim/<group>/<name>.gif.
//
//   node scripts/render-gifs.mjs                 # all figures
//   node scripts/render-gifs.mjs settling/essay_tree notes/triangles
//
// The pages animate on requestAnimationFrame and performance.now, so both are replaced with a virtual clock before load and
// stepped one frame at a time; each step is screenshotted. Deterministic, and independent of how slow the page draws.
// Env: CDP_URL (running Chromium, default http://127.0.0.1:64017), SITE (dev server, default http://localhost:5179),
//      FPS (default 12), SECONDS (default 20, per-figure cycle lengths below win), FFMPEG (default /opt/homebrew/bin/ffmpeg).
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = process.env.SITE ?? 'http://localhost:5179';
const fps = Number(process.env.FPS ?? 12), seconds = Number(process.env.SECONDS ?? 20);
const CYCLE = { 'settling/essay_tree': 18 / 1.7, 'cubic/springs': 12 }; // figures whose story resets, so the gif loops on the seam
const ffmpeg = process.env.FFMPEG ?? '/opt/homebrew/bin/ffmpeg';
const W = 640, H = 400;

// group -> [name]: pulled from the registry source so the two never drift.
const registry = readFileSync(path.join(root, 'src/lib/blog/anim/index.ts'), 'utf8');
const figures = [];
for (const [, group, body] of registry.matchAll(/^\t(\w+): \[([\s\S]*?)^\t\]/gm))
  for (const [, name] of body.matchAll(/name: '(\w+)'/g)) figures.push({ group, name });
const only = process.argv.slice(2);
// The Three.js HAWF source is exported by render-figures.mjs.
const todo = figures.filter(f => f.group !== 'hawf' && (!only.length || only.includes(`${f.group}/${f.name}`)));

const clock = () => {
  let t = 0; const queue = [];
  performance.now = () => t;
  Date.now = () => 1.7e12 + t;
  window.requestAnimationFrame = cb => queue.push(cb);
  window.cancelAnimationFrame = () => {};
  window.__tick = ms => { const target = t + ms; while (t < target - .001) { t = Math.min(target, t + 1000 / 60); for (const cb of queue.splice(0)) cb(t); } };
};

const browser = await puppeteer.connect({ browserURL: process.env.CDP_URL ?? 'http://127.0.0.1:64017' });
const t0 = Date.now();
for (const { group, name } of todo) {
  const dir = `/tmp/gif/${group}-${name}`;
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(clock);
  await page.goto(`${site}/anim/${group}/${name}.html`, { waitUntil: 'networkidle0' });
  await page.bringToFront();
  await page.evaluate(() => document.fonts.ready);
  const total = Math.round(fps * (CYCLE[`${group}/${name}`] ?? seconds));
  for (let i = 0; i < total; i++) {
    await page.evaluate(ms => window.__tick(ms), 1000 / fps);
    await page.screenshot({ path: path.join(dir, `f_${String(i).padStart(4, '0')}.png`), type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
  }
  await page.close();
  const gif = path.join(root, 'static/anim', group, `${name}.gif`);
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(dir, 'f_%04d.png'),
    '-vf', 'split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle',
    '-loop', '0', gif]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`${group}/${name}.gif ${(statSync(gif).size / 1e6).toFixed(1)}MB ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
browser.disconnect();
