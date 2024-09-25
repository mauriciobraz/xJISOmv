<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	type $$Props = HTMLDialogAttributes & { isOpen: boolean };

	export let isOpen: $$Props['isOpen'] = false;
</script>

<button
	class:opacity-0={!isOpen}
	class:opacity-60={isOpen}
	class:pointer-events-none={!isOpen}
	class="fixed inset-0 z-[60] bg-black transition-opacity duration-300"
	on:click={() => (isOpen = false)} />

<dialog
	{...$$props}
	class={twMerge(
		$$props.class,
		'ease-in-out sm:mx-auto md:bottom-auto md:w-5/6 md:rounded-2xl 2xl:w-1/3',
		'fixed bottom-0 left-0 right-0 z-[70] flex max-h-screen min-h-[90%] w-full',
		'flex-col items-center rounded-t-2xl shadow-2xl transition-all duration-300',
	)}
	class:opacity-0={!isOpen}
	class:opacity-100={isOpen}
	class:translate-y-0={isOpen}
	class:translate-y-full={!isOpen}>
	<div class="relative flex w-full p-4 sm:p-8">
		<slot />
	</div>
</dialog>
