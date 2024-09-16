import typography from '@tailwindcss/typography';
import fluid, { screens, fontSize, extract } from 'fluid-tailwind';

/** @type {import('tailwindcss').Config} */
const TAILWIND_CONFIG = {
	plugins: [fluid, typography],
	content: {
		extract,
		files: [
			'./src/**/*.{ts,js}',
			'./src/**/*.{html,svelte}',
			'./src/**/*.{css,scss,pcss}',
		],
	},
	theme: {
		screens,
		fontSize,
	},
};

module.exports = TAILWIND_CONFIG;
