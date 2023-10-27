<script lang="ts">
	import { page } from '$app/stores';
	import { Input } from '$lib/components/shared';
	import { parseDate } from '$lib/utils';
	import type { LayoutData } from '../../$types';

	const years = 18 * 365 * 24 * 60 * 60 * 1000;
	const maxDate = new Date(new Date().getTime() - years);

	$: session = $page.data.session!;

	export let data: LayoutData;
	$: preferences = data.preferences;
</script>

<div>
	<Input
		type="text"
		label="Nome completo"
		name="name"
		placeholder="João Antônio da Silva"
		required
		value={session.user?.name}
	/>
	<Input
		type="email"
		label="E-mail"
		name="email"
		placeholder="joao.silva@exemplo.com"
		required
		minlength={3}
		value={session.user?.email}
		readOnly
	/>
	<Input
		type="text"
		label="CPF"
		name="cpf"
		placeholder="314.156.265-35"
		required
		mask="###.###.###-##"
		value={preferences?.cpf || ''}
	/>
	<Input
		type="text"
		label="CNH"
		name="cnh"
		placeholder="20778353404"
		required
		minlength={10}
		value={preferences?.cnh || ''}
	/>
	<Input
		type="date"
		label="Data de nascimento"
		name="birthDate"
		placeholder="24/05/2000"
		required
		min="1900-01-01"
		max={maxDate.toISOString().split('T')[0]}
		value={parseDate(preferences?.birthDate) || ''}
	/>
	<Input
		type="tel"
		label="Telefone de contato"
		name="phone"
		placeholder="(11) 94002-8922"
		required
		minlength={10}
		mask="(##) #####-####"
		value={preferences?.phone || ''}
	/>
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 1rem;
	}

	@media (max-width: 450px) {
		div {
			grid-template-columns: 1fr;
		}
	}
</style>
