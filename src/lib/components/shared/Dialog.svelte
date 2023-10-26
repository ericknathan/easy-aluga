<script lang="ts">
	export let dialog: HTMLDialogElement;

	function closeDialogOnBackdropClick(event: MouseEvent) {
		if (event.target === dialog) {
			dialog.close();
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close on:click={closeDialogOnBackdropClick}>
	<slot />
</dialog>

<style>
	dialog[open] {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		flex-direction: column;
		gap: 1rem;

		border: none;
		padding: 2rem;
		border-radius: 8px;

		-webkit-animation: show 0.2s ease normal;
		animation: show 0.2s ease normal;
	}

	@keyframes show {
		from {
			opacity: 0;
			transform: translate(-50%, -48%) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
