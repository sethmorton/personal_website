# Site design

Edit `src/lib/styles/theme.css` to change the shared palette, fonts, type scale, page widths, spacing, or motion timings. It is imported once by `src/app.css`.

- `--paper`, `--ink`, `--muted`, `--blue`, `--rule`: page and text colors. Hover and note colors derive from these.
- `--font-display`: names, page headings, and entry titles (Georgia).
- `--font-body`: biographies and article prose (Literata).
- `--font-ui`: summaries, dates, captions, and navigation (Source Sans 3).
- `--font-code`: actual code (IBM Plex Mono).
- `--page-width`, `--reading-width`: centered page and article widths.
- `--text-*`, `--space-*`, `--motion-*`: shared size, spacing, and timing controls.

Font downloads are declared once in `src/app.css`. If introducing a new web font, update that import as well as its theme token. Tailwind font utilities also resolve to the theme variables.

Use `ContentLink.svelte` for essay and project entries. Its title, description/date, focus, and hover styles live in `src/app.css`; a change there updates the homepage, writing index, drafts index, and projects together. Hover changes title color and moves the arrow; it never moves text or highlights a whole row.

Use `site-page`, `page-nav`, `page-header`, `page-title`, `page-description`, and `page-footer` for regular pages. Keep page-specific composition local. The homepage alone fits a normal desktop viewport; longer pages scroll naturally. Reduced-motion users get no entrance or hover movement.

Article typography and note styles consume the same tokens in `BlogPost.svelte`. Existing illustration pixels and standalone animation HTML/canvas documents retain their own palettes; CSS tokens do not recolor those assets.

Blog figures use MP4 videos with static posters, pause outside the viewport, and start paused for reduced-motion users. Render directly from the original canvases with `CDP_URL=<Chromium debugging URL> node scripts/render-figures.mjs` (requires ffmpeg and a local server on port 5179). Output is 1280×800 at 24fps (the layered HAWF field uses 960×600); physics advances at 60Hz so lowering the delivery frame rate never slows the story. Pass `group/name` arguments to render only changed figures. The HAWF scene uses `static/anim/inference/helpers.html?capture` and requires WebGL. Videos and posters are imported from `src/lib/blog/anim/media/`, so Vite assigns content hashes and Vercel serves them under its immutable CDN asset path. The optional film uses the same delivery path. No Blob store or extra credential is required. The article shows one selected figure per section in both development and production, with no variant selector. Captions are short and contain no semicolons or simulation disclaimers. Posters and videos load on first entering the viewport. Figure controls have 44px touch targets. The optional article film is loaded only when its disclosure is opened.

Run `npm run check`, `npm run build`, and `CDP_URL=<Chromium debugging URL> BASE_URL=<local site URL> node scripts/check-publication.mjs` before publication. The browser check covers mobile overflow, publication redirects, server-rendered text, figure playback, and reduced motion. Keep scratch frames in `.render-cache/`, outside `static/`.

`.vercelignore` excludes `static/anim/` and `static/teaser/` from deployment uploads: these are local render sources, originals, and studies. The imported delivery files under `src/lib/blog/` remain in production. Keep originals in Git; do not make the public article depend on the excluded paths.

Article markers can select a particular existing variant, for example `[[anim: cubic/springs]]` for the intuitive demonstration and `[[anim: cubic/ledger]]` for its cost comparison. A plain `[[anim: cubic]]` uses the group’s first variant.
