<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';

	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	export let title = 'Example';
	export let open = false;
</script>

<Collapsible.Root
	bind:open
	class={twMerge(
		'min-w-64 items-center justify-between space-y-2 rounded-xl bg-slate-200 p-2',
		$$props.class,
	)}>
	<Collapsible.Trigger
		class="flex w-full items-center justify-between space-x-10">
		<div class="flex items-center gap-2">
			<slot name="icon" />

			<h4 class="px-2 text-base font-semibold">
				{title}
			</h4>
		</div>

		<div
			class="inline-flex h-10 w-10 items-center justify-center rounded-xl border
				transition-all hover:bg-slate-50 active:scale-90">
			<ChevronDown
				class={twMerge(
					open ? 'rotate-180' : 'rotate-0',
					'h-4 w-4 transition-transform duration-300 ease-in-out',
				)} />
		</div>
	</Collapsible.Trigger>

	<Collapsible.Content transition={slide}>
		<slot name="content">
			<div class="h-72 w-full rounded-xl bg-slate-200" />
		</slot>
	</Collapsible.Content>
</Collapsible.Root>
