<script lang="ts">
	import type { LayoutData } from './$types';

	import { BenefitTag } from '$lib/components/global';
	import { Button } from '$lib/components/shared';
	
	import { parseCurrency } from '$lib/utils';

	export let data: LayoutData;
	const { vehicle, company } = data;
</script>

<svelte:head>
	<title>Vehicle</title>
</svelte:head>

<main id="vehicle-data" class="container">
	<div id="vehicle-images">
		<header>
			<img
				src="/assets/brands/{vehicle.brand.toLowerCase().replace(' ', '-')}.svg"
				alt=""
				id="brand-image"
			/>
			<div class="colors">
				{#each vehicle.colors as color}
					<span style="border-color: {color};" />
				{/each}
			</div>
		</header>
		<img src="/assets/companies/{company.id}/vehicles/{vehicle.image}" alt="" />
	</div>
	<div id="vehicle-texts">
		<h1>{vehicle.title}</h1>
		<div class="tags">
			{#each vehicle.tags as tag}
				<BenefitTag iconName={tag.icon}>{tag.name}</BenefitTag>
			{/each}
		</div>
		<p>{vehicle.description}</p>
		<footer>
			<h2><span>{parseCurrency(vehicle.month_value)}</span><small>/mês</small></h2>
			<div class="buttons">
				<Button href="/company/{company.id}" variant="link">Ver semelhantes</Button>
				<Button href="/company/{company.id}/vehicle/{vehicle.id}/success">Alugar veículo</Button>
			</div>
		</footer>
	</div>
</main>

<style>
	#vehicle-data {
		display: flex;
		gap: 2rem;

		min-height: 100%;
		padding: 3.5rem 1.25rem;
	}

	#vehicle-data > div {
		width: 50%;
	}

	#vehicle-data > div#vehicle-images {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		padding: 1.5rem 2rem;
		border-radius: 20px;
		border: 2px solid var(--primary);
	}

	#vehicle-data > div#vehicle-images header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	#vehicle-data > div#vehicle-images header #brand-image {
		filter: var(--primary-filter);
	}

	#vehicle-data > div#vehicle-images > img {
		height: 100%;
		object-fit: contain;
	}

	#vehicle-data > div#vehicle-texts {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	#vehicle-data > div#vehicle-texts h1 {
		font-size: 2.75rem;
		font-weight: 700;
		line-height: 100%;
	}

	#vehicle-data > div#vehicle-texts .tags {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin: 0.5rem 0;
	}

	#vehicle-data > div#vehicle-texts footer {
		display: flex;
		align-items: center;
		gap: 0.75rem;

		margin-top: auto;
	}

	#vehicle-data > div#vehicle-texts footer h2 {
		margin-right: auto;
		font-size: 1.75rem;
		font-weight: 700;
	}

	#vehicle-data > div#vehicle-texts footer h2 small {
		font-size: 1rem;
		font-weight: 500;
	}

	#vehicle-data > div#vehicle-texts footer .buttons {
		display: flex;
		gap: inherit;
	}

	@media (max-width: 1240px) {
		#vehicle-data > div#vehicle-texts footer {
			flex-direction: column;
		}

		#vehicle-data > div#vehicle-texts footer .buttons {
			width: 100%;
		}

		#vehicle-data > div#vehicle-texts footer .buttons > :global(*) {
			width: 100%;
		}
	}

	@media (max-width: 1024px) {
		#vehicle-data {
			flex-direction: column;
			gap: 1rem;
		}

		#vehicle-data > div {
			width: 100%;
		}

		#vehicle-data > div#vehicle-images {
			padding: 1.5rem;
		}

		#vehicle-data > div#vehicle-images > img {
			height: 90%;
		}
	}

	@media (max-width: 768px) {
		#vehicle-data > div#vehicle-images {
			padding: 1rem;
		}

		#vehicle-data > div#vehicle-images > img {
			height: 80%;
		}

		#vehicle-data > div#vehicle-texts footer .buttons {
			flex-direction: column;
		}
	}

	@media (max-width: 425px) {
		#vehicle-data > div#vehicle-texts h1 {
			font-size: 2rem;
		}
	}
</style>
