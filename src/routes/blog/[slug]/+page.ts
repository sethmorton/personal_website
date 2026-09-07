import { error } from '@sveltejs/kit';
import { publishedBlogPosts, getBlogPostBySlug } from '$lib/blog/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!getBlogPostBySlug(publishedBlogPosts, params.slug)) error(404, 'Not found');
	return { slug: params.slug };
};
