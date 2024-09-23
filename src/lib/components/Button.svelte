<script lang="ts">
	import { Button } from 'bits-ui';
</script>

<Button.Root
	{...$$restProps}
	class="rounded-input text-background shadow-mini active:scale-98 inline-flex h-12
		items-center justify-center bg-sky-950 px-6 text-sm font-semibold text-sky-100
		hover:bg-sky-950/95 active:transition-all"
	on:click>
	<slot />
</Button.Root>
