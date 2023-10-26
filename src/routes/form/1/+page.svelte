<script lang="ts">
	import companies from '$lib/database/companies.json';
	import type { CompanyModel } from '$lib/types';

	let selectedCompany: string;

	function handleSelectUserType(company: CompanyModel) {
		selectedCompany = company.id;
		document.querySelector('body')?.style.setProperty('--primary', company.primary_color);
	}
</script>

<fieldset>
	{#each companies as company}
		<label style="--primary: {company.primary_color}">
			<input
				checked={selectedCompany === company.id}
				on:change={() => handleSelectUserType(company)}
				on:focus={() => handleSelectUserType(company)}
				type="radio"
				name="userType"
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
