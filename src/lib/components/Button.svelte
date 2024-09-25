<script lang="ts">
	import { cx } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		variant?: 'filled' | 'outlined';
	}

	export let variant: $$Props['variant'] = 'filled';
</script>

<button
	{...$$props}
	on:click
	class={cx(
		$$props.class,
		'~text-sm/base ~px-3/6 ~py-2/3',
		'[box-shadow:rgb(148,226,255,0.25)_4px_4px] hover:[box-shadow:rgb(199,240,255,0.25)_0px_0px]',
		'inline-flex cursor-pointer items-center rounded-lg font-semibold transition duration-300',

		variant === 'filled' && 'bg-skype-400 text-white hover:bg-skype-300',

		variant === 'outlined' &&
			'border border-skype-300 text-skype-800 hover:border-skype-200 hover:bg-skype-50/50',
	)}>
	<slot />
</button>
