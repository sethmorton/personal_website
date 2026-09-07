export type BlogMeta = {
	title: string;
	description: string;
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
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
	the_black_box_of_biology: {
		title: 'The Black Box of Biology',
		description:
			'Why building for biology differs from software: uncertain experiments, tacit knowledge, and the trust that makes collaboration possible.',
		type: 'article'
	},
	when_forgetting_is_no_longer_the_default: {
		title: 'When Forgetting Is No Longer the Default',
		description:
			'DNA data storage could change what we choose to remember. The technical bottlenecks and human questions behind durable biological archives.',
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
	paths_not_points: {
		title: 'Paths, Not Points',
		description:
			'We train models to score the move and never to track what the move leaves reachable. Why that gap separates generating from discovering, and what it would take to train a model that thinks in paths.',
		type: 'article'
	},
	the_shape_of_inference: {
		image: '/social/the-shape-of-inference-blue-horn.png',
		imageAlt:
			'The Shape of Inference — a blue illustration of the Holmdel horn antenna, by Seth Morton',
		imageWidth: 1200,
		imageHeight: 630,
		title: 'The Shape of Inference',
		description:
			'How new evidence reshapes earlier ideas, and why future AI architectures may need persistent, revisable state. An essay on co-construction and inference.',
		type: 'article'
	},
	what_you_attend_to_cannot_be_static: {
		title: 'What You Attend To Cannot Be Static',
		description:
			'Why frozen attention weights block continual learning, and why thermodynamic computation may be the real path forward.',
		type: 'article'
	}
};
