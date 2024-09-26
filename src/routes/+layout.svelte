<script lang="ts">
	import '../app.pcss';
	import '@fontsource-variable/rubik/wght.css';

	import { Toaster } from 'svelte-sonner';
</script>

<main>
	<slot />
	<Toaster />
</main>
