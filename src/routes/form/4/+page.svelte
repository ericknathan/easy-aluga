<script lang="ts">
	import Select from '$lib/components/shared/Select.svelte';
	import { companyData } from '$lib/stores';

	const vehicleBrands = $companyData.brands;
	const vehicleModels = ($companyData.vehicles || []).map((vehicle) => vehicle.title);

	$: console.log({ $companyData })
</script>

<main>
	<div id="price-field">
		<p>Exibição de preço</p>
		<fieldset>
			<label>
				<input type="radio" name="price" value="hourly" required />
				<span>Por hora</span>
			</label>
			<label>
				<input checked type="radio" name="price" value="daily" required />
				<span>Por dia</span>
			</label>
			<label>
				<input type="radio" name="price" value="monthly" required />
				<span>Por mês</span>
			</label>
		</fieldset>
	</div>

	<div>
		<p>Marca preferida</p>
		<Select options={vehicleBrands} />
	</div>

	<div>
		<p>Modelo preferido</p>
		<Select options={vehicleModels} />
	</div>
	<div>
		<p>Quantidade mínima de passageiros</p>
		<Select options={['1', '2', '3', '4', '5', '6', '7']} />
	</div>

	<div>
		<p>Raio de distância</p>
		<Select options={['10km', '20km', '30km', '40km', '50km', '60km', '70km', '80km', '90km', '100km']} />
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
	}
</style>
