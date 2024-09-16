import globals from 'globals';
import javascript from '@eslint/js';
import typescript from 'typescript-eslint';

import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
const ESLINT_CONFIG = [
	javascript.configs.recommended,
	...typescript.configs.recommended,

	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],

	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},
	{
		files: ['**/*.svelte'],
		languageOptions: { parserOptions: { parser: typescript.parser } }
	},
	{ ignores: ['build/', '.svelte-kit/', 'dist/'] }
];

export default ESLINT_CONFIG;
