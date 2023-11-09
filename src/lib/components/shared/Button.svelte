<script lang="ts">
	export let variant: 'solid' | 'link' = 'solid';
	export let href: string | undefined = undefined;
</script>

{#if !!href}
	<a {href} {...$$restProps} data-variant={variant}>
		<slot />
	</a>
{:else}
	<button on:click {...$$restProps} data-variant={variant}>
		<slot />
	</button>
{/if}

<style>
	button,
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;

		height: 4rem;
		padding: 0rem 1.5rem;
		border-radius: 4px;
		border: none;

		font-size: 1rem;
		font-weight: 500;
		line-height: 140%;
		text-decoration: none;
		text-align: center;

		cursor: pointer;
		transition: filter 0.2s ease-in-out;
	}

	button:focus-visible,
	a:focus-visible {
		outline: 1px solid var(--background);
		box-shadow: 0px 0px 0px 4px var(--primary-opaque);
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.75;
	}

	button:not(:disabled):hover,
	button:not(:disabled):focus-visible,
	a:not(:disabled):hover,
	a:not(:disabled):focus-visible {
		filter: brightness(0.85);
	}

	button[data-variant='solid'],
	a[data-variant='solid'] {
		background-color: var(--primary);
		color: var(--background);
	}

	button[data-variant='link'],
	a[data-variant='link'] {
		background-color: #fff;
		color: var(--primary);
		text-decoration: underline;
	}
</style>
