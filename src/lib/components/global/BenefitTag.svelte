<script lang="ts">
	export let iconName: string;
</script>

<span class="benefit-tag">
	<i class="ph-regular ph-{iconName}" />
	<slot></slot>
</span>

<style>
	.benefit-tag {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;

		width: fit-content;
		border-radius: 5px;
		padding: 0.375rem 0.5rem;

		background-color: #f4f4f5;
		color: #27272a;
	}

	.benefit-tag i {
		color: var(--primary);
	}
</style>
