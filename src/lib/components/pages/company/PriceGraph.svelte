<script>
	export let width = 13.875;
	export let gap = 2;
	export let amount = 16;
</script>

<svg width="252" height="100" viewBox="0 0 252 100" xmlns="http://www.w3.org/2000/svg">
	{#each Array(amount).fill(0) as _, i}
		{@const randomHeight = Math.floor(Math.random() * (100 - 22 + 1)) + 22}
		<rect
			x={i * (width + gap)}
			y={100 - randomHeight}
			{width}
			height={randomHeight}
			fill="var(--primary)"
		/>
	{/each}
</svg>

<style>
	svg {
		width: 100%;
		height: auto;
	}
</style>
