# Completed: Blog background alignment + reminder removal (2025-10-10)

## Summary
- Set a global background wrapper in `src/routes/+layout.svelte` using `min-h-screen bg-stone-50` so all pages share the same background as the homepage.
- Ensured blog index (`src/routes/blog/+page.svelte`) uses `min-h-screen w-full bg-stone-50` on its root container.
- Wrapped the blog post route (`src/routes/blog/[slug]/+page.svelte`) content in `min-h-screen bg-stone-50`.
- Removed the reminder UI by deleting the `<EmailInput />` import and usage from `src/lib/blog/components/BlogPost.svelte` (backend route left intact per instruction).

## Verification
- `npm run check` → 0 errors, 0 warnings.
- `npm run build` → successful production build via Vite, no errors.

## Notes
- The email API at `src/routes/api/send-email/+server.ts` remains for potential future use.
- If we decide to fully retire it later, we can delete the component and route in a separate change.
