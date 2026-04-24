import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/seo/site';

const routes = [
	'/',
	'/about',
	'/built',
	'/blog',
	'/blog/balance',
	'/blog/gratitude_&_hyperbolic_discounting',
	'/blog/serendipity_&_the_lonely_generation',
	'/blog/where_we_fit_into_the_future_of_ai',
	'/blog/on_growth_and_the_low_hanging_fruit_of_immortality',
	'/blog/the_black_box_of_biology',
	'/blog/when_forgetting_is_no_longer_the_default',
	'/blog/biotech_has_a_distribution_problem',
	'/blog/memory_isnt_learning',
	'/blog/what_you_attend_to_cannot_be_static',
	'/blog/the_geometry_of_surprise'
];

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');

const toXml = (path: string) => {
	const url = new URL(path, SITE_URL).toString();
	return `<url><loc>${escapeXml(url)}</loc></url>`;
};

export const GET: RequestHandler = async () => {
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		routes.map(toXml).join('') +
		'</urlset>';

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
