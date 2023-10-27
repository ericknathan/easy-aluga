<script lang="ts">
	import companies from '$lib/database/companies.json';
	import { companyData } from '$lib/stores';
	import type { CompanyModel } from '$lib/types';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../../$types';
	
	export let data: LayoutData;
	
	onMount(() => {
		if(data.preferences?.preferredCompanyId && !$companyData) {
			const company = companies.find(company => company.id === data.preferences!.preferredCompanyId) as CompanyModel;
			companyData.setCompany(company);
		}
	})

	async function handleSelectPreferredCompanyId(company: CompanyModel) {
		companyData.setCompany(company);
		document.querySelector('body')?.style.setProperty('--primary', company.primary_color);

		const vehiclesResponse = await fetch(`/assets/companies/${company.id}/vehicles/list.json`);
		vehiclesResponse.json().then((vehicles) => companyData.setVehicles(vehicles));
	}
</script>

<fieldset>
	{#each companies as company}
		<label style="--primary: {company.primary_color}">
			<input
				checked={$companyData.id === company.id}
				on:change={() => handleSelectPreferredCompanyId(company)}
				on:focus={() => handleSelectPreferredCompanyId(company)}
				type="radio"
				name="preferredCompanyId"
				value={company.id}
				required
			/>
			<div id="icon">
				<img src="/assets/companies/{company.id}/icon.png" alt="" />
			</div>
			<div id="text">
				<h3>{company.audience}</h3>
				<p>A escolha perfeita para {company.short_description}</p>
			</div>
		</label>
	{/each}
</fieldset>

<style lang="scss">
	fieldset {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 0.75rem;

		border: none;

		label {
			position: relative;

			display: flex;
			align-items: center;
			gap: 0.75rem;

			padding: 1.5rem;
			border-radius: 8px;

			background-color: #ffffff;

			cursor: pointer;

			&:focus-within,
			&:has(input:checked) {
				outline: 2px solid var(--primary);
				outline-offset: 2px;
			}

			input {
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
			}

			> #icon {
				width: 4rem;
				height: 4rem;
				aspect-ratio: 1 / 1;
				border-radius: 9999px;
				padding: 0.65rem;

				background-color: #e4e4e7;

				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			#text {
				flex: 1;

				h3 {
					font-size: 1.125rem;
					font-weight: 700;
					color: #18181b;
				}

				p {
					color: #3f3f46;

					font-size: 0.75rem;
					font-weight: 400;
				}
			}
		}
	}

	@media (max-width: 860px) {
		fieldset {
			grid-template-columns: 1fr;
		}
	}
</style>
