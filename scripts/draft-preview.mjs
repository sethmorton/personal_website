// Renders a blog draft .txt to a self-contained HTML preview (images inlined
// as data URIs, sidenote dots clickable) so it can be read outside the dev
// server, e.g. from the Obsidian vault.
//
//   node scripts/draft-preview.mjs [slug] [outFile]
//
// Defaults: slug = the_shape_of_inference,
//           out  = ~/Desktop/Obsidian_Vault/<slug> preview.html
import MarkdownIt from 'markdown-it';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] ?? 'the_shape_of_inference';
const outFile =
	process.argv[3] ?? path.join(homedir(), 'Desktop/Obsidian_Vault', `${slug} preview.html`);

const raw = readFileSync(path.join(root, 'src/lib/blog/content', `${slug}.txt`), 'utf8');
const headingMatch = raw.match(/^\s*#{1,6}\s+(.+?)\s*#*\s*(?:\r?\n|$)/);
const title = headingMatch ? headingMatch[1].trim() : slug;
const body = headingMatch ? raw.slice(headingMatch[0].length).replace(/^\s+/, '') : raw;

const md = new MarkdownIt({ html: true, linkify: true, typographer: true, breaks: true });

// Sidenote pass, identical to BlogPost.svelte.
let sn = 0;
let processed = body.replace(/\[\[sn:([\s\S]*?)\]\]/g, (_m, t = '') => {
	const n = ++sn;
	return (
		`<span class="sn"><input type="checkbox" id="sn-${n}" class="sn-toggle" />` +
		`<label for="sn-${n}" class="sn-dot" aria-label="Toggle sidenote ${n}">${n}</label>` +
		`<span class="sn-body">${md.renderInline(String(t).trim())}</span></span>`
	);
});

let html = md.render(processed);

// Inline site-absolute images as data URIs so the file is self-contained.
const mime = { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', gif: 'image/gif' };
const inline = (src) => {
	const file = path.join(root, 'static', src);
	if (!existsSync(file)) return src;
	const ext = path.extname(file).slice(1).toLowerCase();
	return `data:${mime[ext] ?? 'application/octet-stream'};base64,${readFileSync(file).toString('base64')}`;
};
html = html.replace(/src="(\/[^"]+)"/g, (_m, src) => `src="${inline(src)}"`);
const hero = inline(`/blog/${slug}.webp`);

const css = `
body { margin: 0; background: #fafaf9; }
article { max-width: 42rem; margin: 0 auto; padding: 3rem 1.5rem 6rem; }
.hero { text-align: center; margin: 1.5rem 0 4.5rem; }
.hero img { max-width: 70%; max-height: 300px; }
.hero h1 { font-family: 'Archivo', system-ui, sans-serif; font-stretch: 122%; font-weight: 650;
  font-size: clamp(1.9rem, 4.4vw, 2.6rem); line-height: 1.14; color: #1c1a17; }
.hero .meta { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 0.72rem;
  letter-spacing: 0.22em; text-transform: uppercase; color: #8a8276; }
.hero .rule { display: block; width: 60px; height: 1px; background: #c2a877; margin: 2rem auto; }
.prose { color: #15120f; font-family: 'Literata', Georgia, serif; font-size: 1.1rem; line-height: 1.62; }
.prose p, .prose ul, .prose ol, .prose blockquote { margin: 0 0 1.75rem; }
.prose strong { color: #171411; font-weight: 600; }
.prose a { color: #1f4f8f; text-decoration: underline; text-decoration-thickness: 0.08em;
  text-underline-offset: 0.14em; text-decoration-color: rgba(31,79,143,0.45); }
.prose a:hover { color: #163b69; }
.prose blockquote { padding-left: 1.25rem; border-left: 2px solid rgba(120,113,108,0.35); color: #44403c; }
.prose img { display: block; width: 100%; margin: 2.25rem 0; border-radius: 0.25rem; }
.prose code { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 0.88em; }
.prose ol { padding-left: 1.4rem; }
.sn-toggle { display: none; }
.sn-dot { display: inline-flex; align-items: center; justify-content: center; width: 1.15em; height: 1.15em;
  margin: 0 0.18em; vertical-align: 0.25em; border-radius: 9999px; background: #1f4f8f; color: #fafaf9;
  font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 0.62em; font-weight: 600; line-height: 1;
  cursor: pointer; user-select: none; }
.sn-dot:hover, .sn-toggle:checked + .sn-dot { background: #163b69; }
.sn-body { display: none; margin: 0.85em 0; padding: 0.8em 1.05em; background: rgba(31,79,143,0.055);
  border-left: 2px solid rgba(31,79,143,0.4); border-radius: 0.25rem; color: #44403c;
  font-size: 0.92em; line-height: 1.58; }
.sn-toggle:checked ~ .sn-body { display: block; }
`;

writeFileSync(
	outFile,
	`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} (draft preview)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@122,650&family=IBM+Plex+Mono:wght@400;600&family=Literata:opsz,wght@7..72,400;7..72,600&display=swap" rel="stylesheet">
<style>${css}</style></head>
<body><article>
<header class="hero"><img src="${hero}" alt="" /><span class="rule"></span><h1>${title}</h1>
<p class="meta">draft preview &middot; regenerate with: node scripts/draft-preview.mjs</p><span class="rule"></span></header>
<div class="prose">${html}</div>
</article></body></html>`
);
console.log(`wrote ${outFile}`);
