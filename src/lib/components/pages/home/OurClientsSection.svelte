<script>
	import companies from '$lib/database/companies.json';
</script>

<section id="our-clients" class="container">
	<div class="texts-container">
		<h2>Nossas soluções</h2>
		<h3>Nós temos o melhor serviço white-label para locação de veículos</h3>
		<p>
			Com uma ampla variedade de opções, oferecemos soluções flexíveis, preços competitivos e
			atendimento de excelência. Escolha a locação perfeita para suas necessidades.
		</p>
	</div>

	<div id="company-cards">
		{#each companies as company}
			<a
				class="company-card"
				href="/company/{company.id}"
				style="--primary-color: {company.primary_color}"
			>
				<h4>
					{company.name}
					<span>{company.icon}</span>
				</h4>
				<p>{company.description}</p>
				<img
					src="/assets/companies/{company.id}/banner.png"
					alt="Imagem de um veículo simbolizando a empresa {company.name}"
				/>
			</a>
		{/each}
	</div>
</section>

<style>
	#our-clients {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 3.75rem;
	}

	#our-clients::before {
		content: '';

		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: -1;

		height: 23.5rem;
		width: calc(100% - 2.5rem);
		border-radius: 4px;

		background-color: #ffffffbf;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(50px);
	}

	#our-clients .texts-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		max-width: 50rem;
		text-wrap: balance;
		text-align: center;
	}

	#our-clients .texts-container h2 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	#our-clients .texts-container h3 {
		font-size: 2.5rem;
		font-weight: 700;
	}

	#our-clients .texts-container p {
		color: #52525b;
		font-size: 1rem;
		background-color: #ffffff;
	}

	#our-clients #company-cards {
		display: flex;
		gap: 1rem;
		
		margin-top: 3.75rem;
		width: 100%;

		overflow-x: scroll;
		scroll-snap-type: x mandatory;
	}

	#our-clients #company-cards > .company-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		padding: 2rem 1.5rem;
		border-radius: 8px;
		border: none;

		min-width: 20.5rem;

		background-color: #ffffff;
		border-top: 10px solid var(--primary-color);
		box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.05);

		text-decoration: none;

		scroll-snap-align: start;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	#our-clients #company-cards > .company-card:hover,
	#our-clients #company-cards > .company-card:focus {
		transform: translateY(-5px);
		box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.1);
	}

	#our-clients #company-cards > .company-card:focus {
		outline: 2px solid var(--primary-color);
		outline-offset: -1px;
	}

	#our-clients #company-cards > .company-card h4 {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;

		color: #18181b;
		border-bottom: 1px solid #d4d4d8;

		font-size: 1.5rem;
		font-weight: 700;
	}

	#our-clients #company-cards > .company-card p {
		display: -webkit-box;

		color: #3f3f46;

		font-size: 1rem;
		text-align: start;

		overflow: hidden;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
	}

	#our-clients #company-cards > .company-card img {
		width: 100%;
		height: auto;
	}

	@media only screen and (max-width: 1110px) {
		#our-clients #company-cards {
			flex-wrap: wrap;
			justify-content: space-between;
			overflow: hidden;
			gap: 0.5rem;
		}

		#our-clients #company-cards > .company-card {
			max-width: calc(50% - 0.5rem);
		}
	}

	@media only screen and (max-width: 700px) {
		#our-clients #company-cards > .company-card {
			max-width: 100%;
		}
	}

	@media only screen and (max-width: 750px) {
		#our-clients::before {
			height: 32rem;
		}
	}

	@media only screen and (max-width: 560px) {
		#our-clients {
			padding: 3.75rem 3.75rem;
		}
	}
</style>
