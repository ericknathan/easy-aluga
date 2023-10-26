<script lang="ts">
	import { companyData } from '$lib/stores';
	import type { VehicleModel } from '$lib/types';
	import { parseCurrency } from '$lib/utils';
	import { BenefitTag } from '$lib/components/global';

	const company = $companyData.id;
	export let vehicle: VehicleModel;
</script>

<a class="vehicle-card card" href="/company/{$companyData.id}/vehicle/{vehicle.id}">
	<header>
		<div>
			<h3>
				{vehicle.title}
				{#if vehicle.fuel === 'elétrico'}
					<span id="eletric-ping">
						<div class="ripple" />
						<div class="ping" />
					</span>
				{/if}
			</h3>
			<span>Veículo {vehicle.fuel}</span>
		</div>
		<div class="colors">
			{#each vehicle.colors as color}
				<span style="border-color: {color};" />
			{/each}
		</div>
	</header>
	<img src="/assets/companies/{company}/vehicles/{vehicle.image}" alt="" />
	<footer>
		<div class="tags">
      {#each vehicle.tags as tag}
        <BenefitTag iconName="{tag.icon}">{tag.name}</BenefitTag>
      {/each}
		</div>
		<h4>{parseCurrency(vehicle.month_value)}<small>/mês</small></h4>
	</footer>
</a>

<style>
	.vehicle-card {
		position: relative;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		color: inherit;

		width: 100%;
		padding: 1.5rem;
		border-radius: 8px;

		cursor: pointer;
		text-decoration: none;
	}

	.vehicle-card:focus-visible {
		outline: 1px solid var(--background);
		box-shadow: 0px 0px 0px 4px var(--primary-opaque);
	}

	.vehicle-card header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		text-align: start;
	}

	.vehicle-card footer {
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin-top: 0.5rem;
		width: 100%;
	}

	.vehicle-card footer .tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.vehicle-card footer h4 {
		font-size: 1rem;
		font-weight: 700;
	}

	.vehicle-card footer small {
		font-size: 0.75rem;
		font-weight: 500;
	}

	@keyframes ping {
		75%,
		to {
			transform: scale(2);
			opacity: 0;
		}
	}

	.vehicle-card #eletric-ping {
		position: relative;
		top: 2px;
		display: inline-flex;

		width: 1rem;
		height: 1rem;

		transform: scale(0.75);
	}

	.vehicle-card #eletric-ping * {
		display: inline-flex;

		width: 1rem;
		height: 1rem;
		border-radius: 999px;

		background-color: #09e85e;
	}

	.vehicle-card #eletric-ping .ripple {
		position: absolute;
		opacity: 0.75;

		width: 100%;
		height: 100%;

		animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
</style>
