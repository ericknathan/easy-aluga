<script lang="ts">
	import { ReservationCard } from '$lib/components/pages/profile';

	import ClipboardText from 'phosphor-svelte/lib/ClipboardText';
	import CreditCard from 'phosphor-svelte/lib/CreditCard';
	import IdentificationBadge from 'phosphor-svelte/lib/IdentificationBadge';
	import ListMagnifyingGlass from 'phosphor-svelte/lib/ListMagnifyingGlass';
	import PaperPlaneTilt from 'phosphor-svelte/lib/PaperPlaneTilt';
	import Signature from 'phosphor-svelte/lib/Signature';
	import User from 'phosphor-svelte/lib/User';

	import type { PageData } from './$types';

	export let data: PageData;
	const { reservations } = data;

	let filterQuery = '';

	$: filteredReservations = reservations.filter((reservation) => {
		const query = filterQuery.toLowerCase();
		const vehicle = reservation.title.toLowerCase();
		const brand = reservation.brand.toLowerCase();

		return vehicle.includes(query) || brand.includes(query);
	});
</script>

<svelte:head>
	<title>Profile</title>

	<link
		rel="stylesheet"
		type="text/css"
		href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/fill/style.css"
	/>
</svelte:head>

<main class="container">
	<div id="profile">
		<h2>Meu perfil</h2>
		<div>
			<img src="/assets/images/fake-user-avatar.png" alt="" />
			<div>
				<h3>Flávio Mendes</h3>
				<span>@flaviomendes</span>
			</div>
			<div id="profile-actions">
				<button><User /> Informações pessoais</button>
				<button><PaperPlaneTilt /> Endereço</button>
				<button><CreditCard /> Pagamentos</button>
				<button><Signature /> Assinatura eletrônica</button>
				<button><IdentificationBadge /> CNH</button>
				<button><ClipboardText /> Termos de serviço</button>
				<button><ListMagnifyingGlass /> Política de privacidade</button>
			</div>
		</div>
	</div>
	<div id="reservations">
		<h2>Minhas reservas</h2>
		<input type="search" placeholder="Pesquisar reserva" bind:value={filterQuery} />
		<div id="reservations-list">
			{#each filteredReservations as vehicle, index}
				<ReservationCard {vehicle} enabled={index === 0} />
			{/each}
		</div>
	</div>
</main>

<style>
	.container {
		padding: 3rem 1.25rem;
	}

	#profile {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	#profile > div {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	#profile > div img {
		height: 5rem;
		width: 5rem;
		border-radius: 8px;
	}

	#profile > div #profile-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		max-width: 38rem;
		margin-left: auto;
		justify-content: flex-end;
	}

	#profile > div #profile-actions button {
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	#profile > div #profile-actions button :global(svg) {
		color: var(--primary);
	}

	#profile > div #profile-actions button + button {
		border-left: 1px solid #0002;
		padding-left: 1rem;
	}

	#reservations {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	#reservations > div {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		max-width: 100%;
	}

	#reservations > input {
		width: 100%;
		padding: 1rem;
		border-radius: 8px;
		border: 1px solid #0002;
	}

	@media (max-width: 640px) {
		#profile > div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			text-align: end;
		}

		#profile > div #profile-actions {
			grid-column: 1 / -1;
			justify-content: center;
			max-width: 100%;
			margin-top: 1rem;
		}
	}
</style>
