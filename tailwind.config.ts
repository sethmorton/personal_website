import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        // Remove auto-added opening/closing quote decorations
                        'blockquote p:first-of-type::before': { content: 'none' },
                        'blockquote p:last-of-type::after': { content: 'none' }
                    }
                }
            }
        }
    },

    plugins: [typography, containerQueries, aspectRatio]
} satisfies Config;
