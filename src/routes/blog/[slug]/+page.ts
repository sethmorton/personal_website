import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load: PageLoad = ({ params }) => {
	console.log(params);
	if (params.slug.length > 0) {
		console.log(params.slug);
		return {
			slug: params.slug
		};
	}
	error(404, 'Not found');
};
