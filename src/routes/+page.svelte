<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ModalSheet from '$lib/components/ModalSheet.svelte';
	import Navigation from '$lib/components/Collapsible.svelte';
	import { SUPPORTED_TICKERS } from '$lib/constants/ticker';
	import { values } from 'remeda';
	import Wallet from '$lib/components/Wallet.svelte';

	export let isOpen = false;
</script>

<div class="flex h-screen flex-col items-center gap-8 bg-slate-50 py-16">
	<Button
		type="button"
		on:click={() => (isOpen = !isOpen)}
		class="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
		Open Modal
	</Button>

	<ModalSheet bind:isOpen class="bg-slate-200">
		<p class="text-base text-slate-800">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda ad est
			officia doloremque ipsa, dolorem laboriosam dicta repellendus odio tempore
			quis, eligendi maxime hic enim, numquam non nesciunt aliquam illo.
		</p>
	</ModalSheet>

	<Navigation class="w-96" open>
		<div slot="content" class="space-y-2 rounded-xl">
			{#each values(SUPPORTED_TICKERS) as { logo, name, network }}
				<Wallet
					{logo}
					{name}
					{network}
					amountUSD={Math.random() * 1000}
					amountNative={Math.random() * 1000} />
			{/each}
		</div>
	</Navigation>
</div>
