export type BlogMeta = {
	title: string;
	description: string;
	image?: string;
	type?: 'article' | 'profile' | 'website';
};

export const BLOG_META: Record<string, BlogMeta> = {
	balance: {
		title: 'Balance',
		description: 'Notes on balancing ambition, health, and relationships.',
		type: 'article'
	},
	'gratitude_&_hyperbolic_discounting': {
		title: 'Gratitude & Hyperbolic Discounting',
		description: 'How gratitude reshapes time preference and motivation.',
		type: 'article'
	},
	'serendipity_&_the_lonely_generation': {
		title: 'Serendipity & The Lonely Generation',
		description: 'Designing for chance encounters in an isolated world.',
		type: 'article'
	},
	where_we_fit_into_the_future_of_ai: {
		title: 'Where We Fit Into the Future of AI',
		description: 'Humans, agency, and building with AI systems.',
		type: 'article'
	},
	on_growth_and_the_low_hanging_fruit_of_immortality: {
		title: 'On Growth and the Low‑Hanging Fruit of Immortality',
		description: 'Bridging silicon and carbon; why longevity is a design problem.',
		type: 'article'
	},
	biotech_has_a_distribution_problem: {
		title: 'Biotech Has a Distribution Problem',
		description:
			'Why biotech needs better visibility to outsiders, why bringing in more AI talent matters, why we need real pathways for young people to contribute, and what we can do to fix these problems.',
		type: 'article'
	},
	memory_isnt_learning: {
		title: "Memory Isn't Learning",
		description:
			"Why AI systems that don't change from experience can't keep up with the world. Thermodynamics and real learning.",
		type: 'article'
	},
	the_geometry_of_surprise: {
		title: 'The Geometry of Surprise',
		description:
			'Why curiosity methods collapse prediction error into one number, what that costs for continual learning, and how a settling substrate could preserve the shape of surprise.',
		type: 'article'
	},
	what_you_attend_to_cannot_be_static: {
		title: 'What You Attend To Cannot Be Static',
		description:
			'Why frozen attention weights block continual learning, and why thermodynamic computation may be the real path forward.',
		type: 'article'
	}
};
