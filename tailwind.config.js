import typography from '@tailwindcss/typography';
import fluid, { extract, fontSize, screens } from 'fluid-tailwind';

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
		extend: {
			keyframes: {
				'slide-in-up': {
					'0%': { transform: 'translateY(100%)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
				'slide-out-down': {
					'0%': { transform: 'translateY(0)', opacity: 1 },
					'100%': { transform: 'translateY(100%)', opacity: 0 },
				},
			},
			animation: {
				'slide-in-up': 'slide-in-up 0.4s ease-out forwards',
				'slide-out-down': 'slide-out-down 0.4s ease-in forwards',
			},
			colors: {
				skype: {
					50: '#8AE0FF',
					100: '#75DAFF',
					200: '#57D2FF',
					300: '#33C9FF',
					400: '#14C0FF',
					500: '#00AFF0',
					600: '#008EC2',
					700: '#00698F',
					800: '#004761',
					900: '#00222E',
					950: '#001319',
				},
			},
		},
	},
};

module.exports = TAILWIND_CONFIG;
