<script module lang="ts">
	import { Toaster } from 'svelte-french-toast';
</script>

<main>
	<slot />
	<Toaster />
</main>

<style lang="postcss">
	@tailwind base;
	@tailwind utilities;
	@tailwind components;
</style>
