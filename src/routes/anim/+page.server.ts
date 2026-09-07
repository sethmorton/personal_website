// Gallery of every live figure under static/anim, registered or not. Reads the
// directory so candidates that have not been added to ANIMS still show up.
import { readdirSync } from 'node:fs';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import { ANIMS } from '$lib/blog/anim';

export function load() {
	if (!dev) error(404);
	const root = 'static/anim';
	const groups = readdirSync(root, { withFileTypes: true })
		.filter((d) => d.isDirectory() && d.name !== 'lib')
		.map((d) => {
			const registered = ANIMS[d.name] ?? [];
			const order: Record<string, number> = {};
			registered.forEach((v, i) => (order[v.name] = i));
			const pages = readdirSync(`${root}/${d.name}`)
				.filter((f) => f.endsWith('.html'))
				.map((f) => f.slice(0, -5))
				.sort((a, b) => (order[a] ?? 99) - (order[b] ?? 99) || a.localeCompare(b))
				.map((name) => ({
					name,
					caption: registered.find((v) => v.name === name)?.caption ?? null
				}));
			return { group: d.name, pages };
		});
	return { groups };
}
