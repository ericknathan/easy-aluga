<script lang="ts">
	import { Faker, pt_BR } from '@faker-js/faker';

	export const faker = new Faker({
		locale: [pt_BR]
	});

	import type { ApexOptions } from 'apexcharts';
	import { onMount } from 'svelte';

	import { Input } from '$lib/components/shared';

	import CreditCard from 'phosphor-svelte/lib/CreditCard';
	import CurrencyDollar from 'phosphor-svelte/lib/CurrencyDollar';
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
	import Pulse from 'phosphor-svelte/lib/Pulse';
	import Users from 'phosphor-svelte/lib/Users';

	let options: ApexOptions = {
		chart: {
			type: 'bar'
		},
		series: [
			{
				name: 'Alugueis',
				data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 60) + 60)
			}
		],
		xaxis: {
			categories: [
				'Out',
				'Nov',
				'Dez',
				'Jan',
				'Fev',
				'Mar',
				'Abr',
				'Mai',
				'Jun',
				'Jul',
				'Ago',
				'Set'
			]
		},
		colors: ['var(--primary)'],
		plotOptions: {
			bar: {
				borderRadius: 5
			}
		},
		dataLabels: {
			enabled: false
		}
	};

	const rentals = faker.helpers.multiple(
		() => ({
			imageUrl: faker.image.avatar(),
			name: `${faker.person.firstName()} ${faker.person.lastName()}`,
			email: faker.internet.email().toLowerCase(),
			price: faker.commerce
				.price({
					min: 150,
					max: 2000,
					dec: 2,
					symbol: 'R$ '
				})
				.replace('.', ',')
		}),
		{ count: 20 }
	);

	async function createChart() {
		const ApexCharts = (await import('apexcharts')).default;
		const container = document.getElementById('chart');

		if (!container || container.childElementCount) return;

		var chart = new ApexCharts(container, options);
		return chart.render();
	}

	onMount(() => {
		createChart();

		return () => {
			createChart();
		};
	});
</script>

<div id="dashboard-container" class="container">
	<aside />
	<main>
		<header>
			<h2>Dashboard</h2>
			<Input
				name="pesquisa"
				type="search"
				placeholder="Pesquisar"
				hideError
				icon={MagnifyingGlass}
			/>
		</header>

		<div class="highlights">
			<div class="card">
				<header>
					<h3>Receita total</h3>
					<CurrencyDollar />
				</header>
				<p>R$45,231.89</p>
				<span>+20.1% desde o último mês</span>
			</div>
			<div class="card">
				<header>
					<h3>Usuários</h3>
					<Users />
				</header>
				<p>+2350</p>
				<span>+180.1% desde o último mês</span>
			</div>
			<div class="card">
				<header>
					<h3>Vendas</h3>
					<CreditCard />
				</header>
				<p>+12,234</p>
				<span>+19% desde o último mês</span>
			</div>
			<div class="card">
				<header>
					<h3>Aluguéis</h3>
					<Pulse />
				</header>
				<p>+573</p>
				<span>+201 desde o último mês</span>
			</div>
		</div>

		<div class="data">
			<div class="card">
				<h4>Visão Geral</h4>
				<div id="chart" />
			</div>
			<div class="card">
				<h4>Aluguéis recentes</h4>
				<ol class="rent-list">
					{#each rentals as rental}
						<li>
							<img src={rental.imageUrl} alt="" />
							<div>
								<p>{rental.name}</p>
								<span>{rental.email}</span>
							</div>
							<p>{rental.price}</p>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</main>
</div>

<style lang="scss">
	#dashboard-container {
		main {
			display: flex;
			flex-direction: column;
			gap: 2rem;

			padding: 3rem 1.25rem;

			> header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;
			}

			.card {
				border-radius: 5px;
				padding: 1.5rem;

				background-color: #fff;
				border: 1px solid #d4d4d8;
			}

			.highlights {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
				gap: 1rem;

				> div {
					display: flex;
					flex-direction: column;

					> header {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 1rem;

						margin-bottom: 0.5rem;

						h3 {
							font-size: 0.875rem;
							font-weight: 500;
						}

						> :global(svg) {
							color: var(--primary);
						}
					}

					> p {
						font-weight: 700;
						font-size: 1.5rem;
						line-height: 2rem;
					}

					> span {
						color: #4b5563;

						font-size: 0.75rem;
					}
				}
			}

			.data {
				display: grid;
				grid-template-columns: 4fr 3fr;
				gap: 1.5rem;

				.card {
					display: flex;
					flex-direction: column;
					gap: 1.5rem;

					padding: 1.5rem;
				}

				ol {
					height: 24rem;
					overflow: auto;
					padding-right: 0.25rem;

					/* width */
					&::-webkit-scrollbar {
						width: 0.5rem;
					}

					/* Track */
					&:hover::-webkit-scrollbar-track {
						background-color: #f1f1f1;
						border-radius: 999px;
					}

					/* Handle */
					&:hover::-webkit-scrollbar-thumb {
						background-color: #8885;
						border-radius: 999px;
					}

					/* Handle on hover */
					&:hover::-webkit-scrollbar-thumb:hover {
						background-color: #5555;
					}

					&::-webkit-scrollbar-track,
					&::-webkit-scrollbar-thumb {
						background-color: #fff;
					}
				}

				ol.rent-list {
					display: flex;
					flex-direction: column;
					gap: 1.25rem;

					li {
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 1rem;

						img {
							width: 2.25rem;
							height: 2.25rem;
							border-radius: 9999px;
						}

						> div {
							flex: 1;

							font-size: 0.875rem;
							line-height: 1.25rem;

							p {
								font-weight: 500;
							}

							span {
								color: #4b5563;
							}
						}

						> p {
							font-weight: 500;
						}
					}
				}

				@media (max-width: 768px) {
					grid-template-columns: 1fr;

					.card {
						padding: 1rem;
					}
				}
			}

			@media (max-width: 450px) {
				> header {
					flex-direction: column;
					align-items: flex-start;
					gap: 0.5rem;
	
					& > :global(*) {
						width: 100%;
					}
				}
			}
		}
	}
</style>
