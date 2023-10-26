<script lang="ts">
	import {
		BrandsList,
		FiltersSidebar,
		HeroSection,
		LineFilters,
		VehicleCard
	} from '$lib/components/pages/company';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { vehicles } = data;

	const mainVehicle = vehicles.find((vehicle) => vehicle.id == 'main');
</script>

<svelte:head>
	<title>Company</title>
</svelte:head>

<main class="container">
	{#if mainVehicle}
		<HeroSection vehicle={mainVehicle} />
	{/if}
	<BrandsList />
	<LineFilters />
	<div>
		<FiltersSidebar />
		<div id="vehicles-list">
			{#each vehicles.filter((vehicle) => vehicle.id !== 'main') as vehicle}
				<VehicleCard {vehicle} />
			{/each}
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	main > div {
		display: flex;
		gap: inherit;
	}

	main #vehicles-list {
		flex: 1;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	@media (max-width: 750px) {
		main > div {
			flex-direction: column;
		}
	}
</style>
