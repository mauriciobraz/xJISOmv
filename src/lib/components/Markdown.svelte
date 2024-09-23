<script lang="ts">
	import insane from 'insane';
	import { marked } from 'marked';

	export let content: string;

	$: unsafeHTML = marked.parse(content, {
		breaks: true,
		async: false,
		gfm: true,
	}) as string;

	$: safeHTML = insane(unsafeHTML, {
		allowedSchemes: ['http', 'https', 'mailto'],
		allowedAttributes: { a: ['href', 'id'], img: ['src'] },
	}) as string;
</script>

<div class="prose space-y-5">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html safeHTML}
</div>
