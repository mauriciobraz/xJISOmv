<script lang="ts">
	import '../app.pcss';

	import { Toaster } from 'svelte-sonner';
</script>

<main>
	<slot />
	<Toaster />
</main>
