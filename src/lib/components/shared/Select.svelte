<script lang="ts">
	export let options:
		| string[]
		| {
				value: string;
				label: string;
		  }[] = [];
</script>

<select {...$$restProps}>
	{#each options as option}
		{#if typeof option === 'string'}
			<option value={option}>{option}</option>
		{:else}
			<option value={option.value}>{option.label}</option>
		{/if}
	{/each}
</select>

<style lang="scss">
	select {
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;

		height: 3rem;
    width: 100%;
		padding: 0 1rem;
		border-radius: 4px;

		background-color: #ffffff;
		border: 1px solid #d4d4d8;

		cursor: pointer;

		&:focus-within,
		&:has(input:checked) {
			outline: 2px solid var(--primary);
		}
	}
</style>
