<script lang="ts">
	export let status: number;
	export let message: string;
</script>

<div class="grid h-screen place-content-center px-4 text-center">
	<h1 class="text-7xl font-black opacity-25 sm:text-9xl">
		{status}
	</h1>

	<p class="text-2xl font-bold tracking-tight opacity-75 sm:text-4xl">
		{message}
	</p>
</div>
