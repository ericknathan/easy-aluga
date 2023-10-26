<script lang="ts">
	import { page } from '$app/stores';
	import type { VehicleModel } from '$lib/types';

	import { BenefitTag } from '$lib/components/global';
	import { Button } from '$lib/components/shared';

	let companyId = $page.params.slug;
	export let vehicle: VehicleModel;
</script>

<div id="hero" class="card">
	<div class="content">
		<h1>{vehicle.title}</h1>
		<div class="tags">
			{#each vehicle.tags as tag}
				<BenefitTag iconName={tag.icon}>{tag.name}</BenefitTag>
			{/each}
		</div>
		<p>{vehicle.description}</p>
		<div class="buttons">
			<Button href="/company/{companyId}/vehicle/main" variant="solid">Alugar veículo</Button>
			<Button href="#vehicles-list" variant="link">Ver semelhantes</Button>
		</div>
	</div>
	<img src="/assets/companies/{companyId}/vehicles/main.png" alt="" />
</div>

<style>
	#hero {
		display: flex;
		align-items: center;

		border-radius: 10px;
		margin-top: 3rem;
	}

	#hero .content {
		padding: 3rem 0.25rem 3rem 3rem;
	}

	#hero .content h1 {
		font-size: 3rem;
		font-weight: bold;
	}

	#hero .content .tags {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin: 0.5rem 0;
	}

	#hero .content .buttons {
		display: flex;
		gap: 0.75rem;

		margin-top: 1.5rem;
	}

	#hero > img {
		padding: 3rem 3rem 3rem 0;
	}

	@media (max-width: 1050px) {
		#hero {
			flex-direction: column-reverse;
		}

		#hero .content {
			padding: 3rem 3rem 3rem 3rem;
			text-align: center;
		}

		#hero > img {
			padding: 1rem 3rem 0 3rem;
			max-width: 100%;
		}

		#hero .content .tags {
			justify-content: center;
		}

		#hero .content .buttons {
			justify-content: center;
		}
	}

	@media (max-width: 440px) {
		#hero .content h1 {
			font-size: 2rem;
		}

		#hero .content .buttons {
			flex-direction: column;
		}
	}
</style>
