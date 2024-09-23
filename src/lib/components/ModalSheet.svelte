<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let label = 'Open Modal Sheets';
	export let id = 'ModalSheets';

	let isOpen = false;
</script>

<Button on:click={() => (isOpen = !isOpen)}>
	{label}
</Button>

<div {id}>
	<button
		class:opacity-0={!isOpen}
		class:opacity-60={isOpen}
		class:pointer-events-none={!isOpen}
		class="fixed inset-0 z-[60] bg-black transition-opacity duration-300"
		on:click={() => (isOpen = false)}>
	</button>

	<dialog
		class:opacity-0={!isOpen}
		class:opacity-100={isOpen}
		class:translate-y-0={isOpen}
		class:translate-y-full={!isOpen}
		class="fixed bottom-0 left-0 right-0 z-[70] flex max-h-screen min-h-[90%] w-full
			flex-col items-center rounded-t-2xl bg-gray-900 shadow-2xl transition-all
			duration-300 ease-in-out sm:mx-auto md:bottom-auto md:w-5/6 md:rounded-2xl
			2xl:w-1/3">
		<div class="relative flex w-full p-4 sm:p-8">
			<slot />
		</div>
	</dialog>
</div>
