<script lang="ts">
	import { faker } from '$lib/utils';
	import { differenceInDays, format } from 'date-fns';
	import type { LayoutData } from '../$types';

	import { Button } from '$lib/components/shared';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';

	export let data: LayoutData;
	const { company, vehicle, session } = data;

	const user = session?.user;
	const pickDate = faker.date.future();
	const endDate = faker.date.future({ refDate: pickDate });

	function formatDate(date: Date) {
		return format(date, 'dd/MM/yyyy');
	}

	function formatHour(date: Date) {
		return format(date, 'HH:mm');
	}

	function handlePrintPage() {
		window.print();
	}
</script>

<main class="container">
	<header>
		<img src="/assets/companies/{company.id}/vehicles/{vehicle.image}" alt="" />
		<div>
			<h1>
				<CheckCircle size={36} weight="fill" color="var(--primary)" /> Veículo alugado com sucesso!
			</h1>
			<p>
				Sua reserva foi realizada com sucesso. Em breve você receberá um e-mail com as informações
				do aluguel. Para mais informações, entre em contato com a {company.name} pelo telefone {faker.phone.number(
					'(##) #####-####'
				)}.
			</p>
		</div>
	</header>
	<div>
		<div>
			<h2>Informações do veículo</h2>
			<p><strong>Modelo:</strong> {vehicle.title}</p>
			<p><strong>Cor:</strong> {vehicle.colors[0]}</p>
			<p><strong>Placa:</strong> {faker.vehicle.vrm()}</p>
		</div>
		<div>
			<h2>Informações do pagamento</h2>
			<p><strong>Valor:</strong> {vehicle.month_value}</p>
			<p><strong>Forma de pagamento:</strong> Cartão de crédito</p>
			<p>
				<strong>Data de pagamento:</strong>
				{formatDate(new Date())} às {formatHour(new Date())}
			</p>
		</div>
		<div>
			<h2>Informações para a retirada</h2>
			<p><strong>Endereço:</strong> {faker.location.streetAddress()}</p>
			<p><strong>Data:</strong> {formatDate(pickDate)}</p>
			<p><strong>Horário:</strong> 08:00 às 18:00</p>
		</div>
		<div>
			<h2>Informações para a devolução</h2>
			<p><strong>Endereço:</strong> {faker.location.streetAddress()}</p>
			<p><strong>Data:</strong> {formatDate(endDate)}</p>
			<p><strong>Horário:</strong> 08:00 às 18:00</p>
		</div>
		<div>
			<h2>Informações do locatário</h2>
			<p><strong>Nome:</strong> {user?.name}</p>
			<p><strong>E-mail:</strong> {user?.email}</p>
			<p><strong>Telefone:</strong> {faker.phone.number('(##) #####-####')}</p>
		</div>
		<div>
			<h2>Resumo do pedido</h2>
			<p><strong>Código de referência:</strong> #{faker.string.uuid()}</p>
			<p><strong>Duração: </strong> {differenceInDays(pickDate, endDate)} dias</p>
			<p><strong>Valor total: </strong> {vehicle.month_value}</p>
		</div>
	</div>
	<footer>
		<Button on:click={handlePrintPage}>Imprimir confirmação</Button>
		<Button variant="link" href="/company/{company.id}">Retornar ao início</Button>
	</footer>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		padding: 3.5rem 1.25rem;

		> header {
			display: flex;
			align-items: center;
			gap: 2rem;

			h1 {
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;
			}

			img {
				max-height: 100px;
			}
		}

		> div {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;

			h2 {
				margin-bottom: 0.5rem;
			}

			p {
				opacity: 0.85;
			}
		}

		footer {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		@media print {
			> div {
				grid-template-columns: 1fr;
			}
			footer {
				display: none;
			}
		}

		@media (max-width: 768px) {
			> header {
				flex-direction: column;

				img {
					width: auto;
					max-height: 200px;
					max-width: 100%;
				}
			}
			> div {
				grid-template-columns: 1fr;
			}

			> footer {
				flex-direction: column;
				align-items: stretch;
			}
		}
	}
</style>
