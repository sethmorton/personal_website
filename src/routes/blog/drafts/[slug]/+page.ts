import { error, redirect } from '@sveltejs/kit';
import { draftBlogPosts, publishedBlogPosts, getBlogPostBySlug } from '$lib/blog/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (getBlogPostBySlug(publishedBlogPosts, params.slug)) {
		redirect(308, `/blog/${params.slug}`);
	}
	if (!getBlogPostBySlug(draftBlogPosts, params.slug)) error(404, 'Not found');
	return { slug: params.slug };
};
