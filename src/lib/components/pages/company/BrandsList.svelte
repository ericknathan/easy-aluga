<script lang="ts">
	import { companyData } from '$lib/stores';

	let brands = $companyData.brands;
</script>

<div id="brands">
	{#each brands as brand}
		<button class="card">
			<img src="/assets/brands/{brand.replace(' ', '-').toLowerCase()}.svg" alt="" />
			{brand}
		</button>
	{/each}
</div>

<style>
	#brands {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		gap: 1rem;
	}

	#brands button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;

		width: 100%;
		height: 6.25rem;
		border-radius: 8px;

		cursor: pointer;
		transition: transform 0.2s ease-in-out, filter 0.2s ease-in-out;
	}

	#brands button:hover,
	#brands button:focus-visible {
		transform: scale(1.05);
		filter: brightness(0.9);
	}

	#brands button:focus {
		outline: none;
	}

	#brands button:focus-visible {
		outline: 1px solid var(--background);
		box-shadow: 0px 0px 0px 4px var(--primary-opaque);
	}

	#brands button img {
		filter: var(--primary-filter);
	}
</style>
