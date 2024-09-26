<script>
	export let logo = '';
	export let name = '';
	export let network = '';

	export let amountUSD = 0;
	export let amountNative = 0;

	const numberFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	let amountUSDStr = '$0.00';
	let amountNativeStr = '0.00';

	$: amountUSDStr = numberFormatter.format(amountUSD);
	$: amountNativeStr = numberFormatter.format(amountNative);
</script>

<button
	class="flex w-full items-start justify-between space-x-2 rounded-xl bg-slate-100 px-4
		py-3 transition-colors duration-300 hover:bg-slate-50">
	<div class="flex w-full items-center justify-start space-x-4">
		<img
			src={logo}
			alt={name}
			class="h-8 w-8 overflow-hidden rounded-full bg-slate-300" />

		<div class="flex flex-col items-start">
			<p class="text-base font-medium">
				{name}
			</p>

			<p class="text-sm font-normal">
				{network}
			</p>
		</div>
	</div>

	<div class="flex flex-col items-end font-medium">
		<p class="text-sm text-slate-600">
			{amountNativeStr}
		</p>

		<p class="text-sm text-slate-600">
			{amountUSDStr}
		</p>
	</div>
</button>
