<script lang="ts">
	import Select from '$lib/components/shared/Select.svelte';
	import { companyData } from '$lib/stores';
	import type { LayoutData } from '../../$types';

	const vehicleBrands = $companyData.brands;
	const vehicleModels = ($companyData.vehicles || []).map((vehicle) => vehicle.title);

	export let data: LayoutData;
	$: preferences = data.preferences;
</script>

<main>
	<div id="price-field">
		<p>Exibição de preço</p>
		<fieldset>
			<label>
				<input
					checked={preferences?.priceDisplay === 'hourly'}
					type="radio"
					name="priceDisplay"
					value="hourly"
					required
				/>
				<span>Por hora</span>
			</label>
			<label>
				<input
					checked={preferences?.priceDisplay === 'daily' || !preferences?.priceDisplay}
					type="radio"
					name="priceDisplay"
					value="daily"
					required
				/>
				<span>Por dia</span>
			</label>
			<label>
				<input
					checked={preferences?.priceDisplay === 'monthly'}
					type="radio"
					name="priceDisplay"
					value="monthly"
					required
				/>
				<span>Por mês</span>
			</label>
		</fieldset>
	</div>

	<div>
		<p>Marca preferida</p>
		<Select
			name="preferredBrand"
			options={vehicleBrands}
			value={preferences?.preferredBrand && vehicleBrands.includes(preferences?.preferredBrand)
				? preferences?.preferredBrand
				: vehicleBrands[0]}
		/>
	</div>

	<div>
		<p>Modelo preferido</p>
		<Select
			name="preferredModel"
			options={vehicleModels}
			value={preferences?.preferredModel && vehicleModels.includes(preferences?.preferredModel)
				? preferences?.preferredModel
				: vehicleModels[0]}
		/>
	</div>
	<div>
		<p>Quantidade mínima de passageiros</p>
		<Select
			name="minPassengers"
			options={['1', '2', '3', '5', '7']}
			value={preferences?.minPassengers?.toString()}
		/>
	</div>

	<div>
		<p>Raio de distância</p>
		<Select
			name="distanceRange"
			options={[
				{
					label: '10km',
					value: 10
				},
				{
					label: '20km',
					value: 20
				},
				{
					label: '30km',
					value: 30
				},
				{
					label: '40km',
					value: 40
				},
				{
					label: '50km',
					value: 50
				},
				{
					label: '60km',
					value: 60
				},
				{
					label: '70km',
					value: 70
				},
				{
					label: '80km',
					value: 80
				},
				{
					label: '90km',
					value: 90
				},
				{
					label: '100km',
					value: 100
				}
			]}
			value={preferences?.distanceRange}
		/>
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;

		> div {
			&#price-field {
				grid-column: 1 / 3;
			}

			p {
				padding-bottom: 0.5rem;
			}

			fieldset {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-gap: 0.75rem;

				border: none;

				label {
					position: relative;

					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.75rem;

					height: 3rem;
					padding: 0 1rem;
					border-radius: 4px;

					background-color: #ffffff;
					border: 1px solid #d4d4d8;

					cursor: pointer;

					&:focus-within,
					&:has(input:checked) {
						outline: 2px solid var(--primary);
					}

					&:has(input:not(:checked)) {
						opacity: 0.75;
					}

					input {
						opacity: 0;
						position: absolute;
						top: 0;
						left: 0;
						width: 0;
					}

					span {
						font-size: 1rem;
						color: #27272a;
						text-align: center;
					}
				}
			}
		}

		@media (max-width: 560px) {
			grid-template-columns: 1fr;

			> div {
				&#price-field {
					grid-column: 1 / 2;
				}
			}
		}
	}
</style>
