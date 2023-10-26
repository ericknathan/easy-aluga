<script lang="ts">
	import type { IconProps, SvelteComponent } from 'phosphor-svelte/lib/shared';

	export let label: string | undefined = undefined,
		name: string,
		placeholder = '',
		value: string | undefined = '',
		error: string | undefined = undefined,
		mask: string | undefined = undefined,
		hideError = false,
		icon: typeof SvelteComponent<IconProps> | undefined = undefined;

	function maskValue() {
		if (!mask || !mask.length) return value;

		const unmaskedValue = value!.replace(/[^0-9]/g, '');
		let maskedValue = '';
		let j = 0;

		for (let i = 0; i < mask.length && j < unmaskedValue.length; i++) {
			if (mask[i] === '#') {
				maskedValue += unmaskedValue[j];
				j++;
			} else {
				maskedValue += mask[i];
			}
		}

		value = maskedValue;
	}
</script>

<fieldset class:show-error={!hideError}>
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<input
		id={name}
		{name}
		{placeholder}
		bind:value
		on:keyup={maskValue}
		aria-describedby="{name}_error"
		class:invalid={error}
		{...$$restProps}
	/>
	{#if icon}
		<svelte:component this={icon} class="icon {label ? 'has-label' : ''}" />
	{/if}
	{#if error}
		<span id="{name}_error">{error}</span>
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
		position: relative;

		display: flex;
		flex-direction: column;

		border: none;

		label {
			padding-bottom: 0.5rem;
			font-size: 1rem;
			font-weight: 500;
			color: #27272a;
		}

		input {
			height: 3rem;
			padding: 0 1rem;
			border-radius: 5px;

			border: 1px solid #d4d4d8;

			font-size: 1rem;

			&.invalid {
				border-color: #dc2626;
			}

			&:focus {
				outline: 2px solid var(--primary);
				outline-offset: -1px;
			}

			&::placeholder {
				color: #a1a1aa;
			}
		}

		&:has(.icon) input {
			padding-left: 2.5rem;
		}

		& > :global(.icon) {
			position: absolute;
			top: 50%;
			left: 1rem;
			transform: translateY(-50%);
			width: 1rem;
			height: 1rem;

			pointer-events: none;
		}

		& > :global(.icon.has-label) {
			margin-top: .8rem;
		}

		span {
			font-size: 0.875rem;
			color: #dc2626;
			padding-top: 0.125rem;
		}

		&.show-error:not(:has(span)) {
			margin-bottom: 1.5rem;
		}
	}
</style>
