export type BlogMeta = {
  title: string;
  description: string;
  image?: string;
  type?: 'article' | 'website';
};

export const BLOG_META: Record<string, BlogMeta> = {
  balance: {
    title: 'Balance',
    description: 'Notes on balancing ambition, health, and relationships.',
    type: 'article'
  },
  "gratitude_&_hyperbolic_discounting": {
    title: 'Gratitude & Hyperbolic Discounting',
    description: 'How gratitude reshapes time preference and motivation.',
    type: 'article'
  },
  "serendipity_&_the_lonely_generation": {
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
  }
};
