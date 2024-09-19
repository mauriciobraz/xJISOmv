import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const SVELTE_CONFIG = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: cloudflareAdapter({
			routes: {
				include: ['/*'],
				exclude: ['/build/*', '/dist/*', '/static/*'],
			},
		}),
	},
};

export default SVELTE_CONFIG;
