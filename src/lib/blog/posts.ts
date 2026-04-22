import balanceContent from '$lib/blog/content/balance.txt?raw';
import gratitudeContent from '$lib/blog/content/gratitude.txt?raw';
import serendipityContent from '$lib/blog/content/serendipity.txt?raw';
import futureAiContent from '$lib/blog/content/future_ai.txt?raw';
import onGrowthContent from '$lib/blog/content/on_growth_low_hanging_fruit_immortality.txt?raw';
import theBlackBoxOfBiologyContent from '$lib/blog/content/the_black_box_of_biology.txt?raw';
import whenForgettingIsNoLongerTheDefaultContent from '$lib/blog/content/when_forgetting_is_no_longer_the_default.txt?raw';
import biotechHasADistributionProblemContent from '$lib/blog/content/biotech_has_a_distribution_problem.txt?raw';
import memoryIsntLearningContent from '$lib/blog/content/memory_isnt_learning.txt?raw';
import whatYouAttendToCannotBeStaticContent from '$lib/blog/content/what_you_attend_to_cannot_be_static.txt?raw';
import surpriseHasShapeContent from '$lib/blog/content/drafts/surprise_has_shape.txt?raw';

export type BlogPostEntry = {
	title: string;
	slug: string;
	date: string;
	content: string;
};

export const publishedBlogPosts: BlogPostEntry[] = [
	{
		title: 'balance',
		slug: 'balance',
		date: '2024-11-19',
		content: balanceContent
	},
	{
		title: 'gratitude & hyperbolic discounting',
		slug: 'gratitude_&_hyperbolic_discounting',
		date: '2024-12-18',
		content: gratitudeContent
	},
	{
		title: 'serendipity & the lonely generation',
		slug: 'serendipity_&_the_lonely_generation',
		date: '2025-01-31',
		content: serendipityContent
	},
	{
		title: 'where we fit into the future of AI',
		slug: 'where_we_fit_into_the_future_of_ai',
		date: '2025-05-12',
		content: futureAiContent
	},
	{
		title: 'on growth and the low-hanging fruit of immortality',
		slug: 'on_growth_and_the_low_hanging_fruit_of_immortality',
		date: '2025-09-13',
		content: onGrowthContent
	},
	{
		title: 'the black box of biology',
		slug: 'the_black_box_of_biology',
		date: '2025-10-18',
		content: theBlackBoxOfBiologyContent
	},
	{
		title: 'when forgetting is no longer the default',
		slug: 'when_forgetting_is_no_longer_the_default',
		date: '2025-10-22',
		content: whenForgettingIsNoLongerTheDefaultContent
	},
	{
		title: 'biotech has a distribution problem',
		slug: 'biotech_has_a_distribution_problem',
		date: '2025-12-14',
		content: biotechHasADistributionProblemContent
	},
	{
		title: "memory isn't learning",
		slug: 'memory_isnt_learning',
		date: '2026-03-31',
		content: memoryIsntLearningContent
	},
	{
		title: 'what you attend to cannot be static',
		slug: 'what_you_attend_to_cannot_be_static',
		date: '2026-04-13',
		content: whatYouAttendToCannotBeStaticContent
	}
];

export const draftBlogPosts: BlogPostEntry[] = [
	{
		title: 'surprise has shape',
		slug: 'surprise_has_shape',
		date: '2026-04-22',
		content: surpriseHasShapeContent
	}
];

export const getBlogPostBySlug = (posts: BlogPostEntry[], slug: string) =>
	posts.find((blogPost) => blogPost.slug === slug) ?? null;
