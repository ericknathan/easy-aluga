<script lang="ts">
	import type { VehicleModel } from '$lib/types';
	import { Button, Dialog } from '$lib/components/shared';

	export let vehicle: VehicleModel;
	export let enabled: boolean;

	let dialog: HTMLDialogElement;

	import Backpack from 'phosphor-svelte/lib/Backpack';
	import CarProfile from 'phosphor-svelte/lib/CarProfile';
	import Lightbulb from 'phosphor-svelte/lib/Lightbulb';
	import Siren from 'phosphor-svelte/lib/Siren';
</script>

<div class="container card reservation-card">
	<img src="/assets/companies/auto-ride/vehicles/{vehicle.image}" alt="" />
	<header>
		<h3>{vehicle.title}</h3>
		<span>ID: {Math.random().toString(36).substr(2, 9)}</span>
	</header>
	<table>
		<tr>
			<td>Retirada:</td>
			<td>{vehicle.reservation.from}</td>
		</tr>
		<tr>
			<td>Devolução:</td>
			<td>{vehicle.reservation.to}</td>
		</tr>
		<tr>
			<td>Pagamento:</td>
			<td>{vehicle.reservation.payment}</td>
		</tr>
		<tr>
			<td>Local:</td>
			<td>{vehicle.reservation.location}</td>
		</tr>
	</table>
	<Button class="vehicle-button" on:click={() => dialog.showModal()} disabled={!enabled}>
		{enabled ? 'Ver chave' : 'Veículo já devolvido'}
	</Button>

	<div class="dialog">
		<Dialog bind:dialog>
			<h3>
				Chave
				<form method="dialog">
					<button> X </button>
				</form>
			</h3>

			<div class="key-card">
				<footer>
					<div>
						<span><strong>Veículo:</strong> Fiat Mobi</span>
						<span><strong>Chave:</strong> 15609049</span>
					</div>
					<div>
						<span><strong>Validade:</strong> 12/10/23</span>
					</div>
				</footer>
			</div>
			<div class="vehicle-props">
				<div>
					<CarProfile weight="fill" size={40} />
					<span>
						<strong>Carro</strong>
						Trancado
					</span>
				</div>
				<div>
					<Lightbulb weight="fill" size={40} />
					<span>
						<strong>Luz</strong>
						Ligada
					</span>
				</div>
				<div>
					<Siren weight="fill" size={40} />
					<span>
						<strong>Alarme</strong>
						Desligado
					</span>
				</div>
				<div>
					<Backpack weight="fill" size={40} />
					<span>
						<strong>Bagageiro</strong>
						Trancado
					</span>
				</div>
			</div>
		</Dialog>
	</div>
</div>

<style>
	.reservation-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		border-radius: 8px;
		padding: 0.5rem;
		width: 21.875rem;
	}

	.reservation-card img {
		width: calc(21.875rem - 1rem);
		background-color: #0001;
		border-radius: 6px;
	}

	.reservation-card > table {
		width: 100%;
		border-collapse: collapse;
		border-radius: 6px;
	}

	.reservation-card > table td {
		padding: 0.25rem;
		border: 1px solid #0004;
	}

	.reservation-card > table td:first-child {
		font-weight: 600;
	}

	.reservation-card :global(button) {
		height: 3rem;
	}

	.reservation-card :global(button):disabled {
		opacity: 0.5;
		cursor: default;
	}

	.dialog h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
	}

	.dialog h3 button {
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		border: none;

		background-color: transparent;

		font-weight: 600;

		cursor: pointer;
	}

	.dialog .key-card {
		display: flex;

		width: 100%;
		padding: 2rem;
		aspect-ratio: 5 / 3;
		border-radius: 0.5rem;

		color: #fff;
		background-color: var(--primary);
		background-image: url(/assets/images/card-base.svg);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.dialog .key-card footer {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		width: 100%;
		margin-top: auto;
	}

	.dialog .key-card footer div {
		display: flex;
		flex-direction: column;
	}

	.dialog .vehicle-props {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.dialog .vehicle-props > div {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		padding: 1rem;
		border-radius: 0.5rem;
		background-color: #0001;
	}

	.dialog .vehicle-props > div span {
		display: flex;
		flex-direction: column;
	}
</style>
