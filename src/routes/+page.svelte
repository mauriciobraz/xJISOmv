<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ModalSheet from '$lib/components/ModalSheet.svelte';

	export let isOpen: boolean = false;
</script>

<div class="h-screen w-screen bg-gray-900">
	<Button
		type="button"
		on:click={() => (isOpen = !isOpen)}
		class="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
		Open Modal
	</Button>

	<ModalSheet bind:isOpen class="bg-gray-900">
		<p class="text-base text-gray-100">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda ad est
			officia doloremque ipsa, dolorem laboriosam dicta repellendus odio tempore
			quis, eligendi maxime hic enim, numquam non nesciunt aliquam illo.
		</p>
	</ModalSheet>
</div>
