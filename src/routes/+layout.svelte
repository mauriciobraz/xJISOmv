<script lang="ts">
	import '../app.pcss';
	import { Toaster } from 'svelte-french-toast';
</script>

<main>
	<slot />
	<Toaster />
</main>
