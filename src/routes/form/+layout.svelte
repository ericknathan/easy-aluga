<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { fade } from 'svelte/transition';

	import Brain from 'phosphor-svelte/lib/Brain';
	import IdentificationCard from 'phosphor-svelte/lib/IdentificationCard';
	import MapPin from 'phosphor-svelte/lib/MapPin';
	import PaintBrush from 'phosphor-svelte/lib/PaintBrush';
	import User from 'phosphor-svelte/lib/User';

	import { Header } from '$lib/components/pages/home';
	import { Button } from '$lib/components/shared';

	import { companyData } from '$lib/stores';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const steps = [
		{
			button: {
				name: 'Tipo de usuário',
				description: 'Pessoa física, empresa ou agricultor',
				Icon: User
			},
			title: 'Qual seu tipo de usuário?',
			description: 'Informe-nos em qual tipo de usuário você se enquadra.'
		},
		{
			button: {
				name: 'Dados cadastrais',
				description: 'Nome, CPF, CNH, etc',
				Icon: IdentificationCard
			},
			title: 'Dados cadastrais',
			description: 'Informe-nos os dados para criação do seu perfil.'
		},
		{
			button: {
				name: 'Localização atual',
				description: 'Para recomendações nas proximidades',
				Icon: MapPin
			},
			title: 'Onde você está localizado?',
			description: 'Informe-nos onde você prefere recomendações de carros em localidades próximas.'
		},
		{
			button: {
				name: 'Personalização',
				description: 'Sistema customizado.',
				Icon: PaintBrush
			},
			title: 'Personalize o sistema com sua cara',
			description: 'Informe-nos onde você prefere recomendações de carros em localidades próximas.'
		},
		{
			button: {
				name: 'Easy IA',
				description: 'Aplicando Inteligência artificial ao perfil',
				Icon: Brain
			},
			title: 'Utilização da Easy IA',
			description:
				'A Easy IA é uma inteligência artificial para gerar recomendações para você baseado nos dados informados anteriormente. Ao prosseguir, você aceita a utilização dos dados.'
		}
	];

	$: currentStepIndex = data.step - 1;
	$: step = steps[currentStepIndex];
	$: isSubmitting = false;

	async function saveData(formData: any) {
		await fetch(`/api/preferences`, {
			method: 'PATCH',
			body: JSON.stringify(formData)
		});
	}

	async function handleSubmitForm(event: Event) {
		try {
			isSubmitting = true;

			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			const data = Object.fromEntries(formData.entries());

			
			if (currentStepIndex === steps.length - 1) {
				toast.success('Cadastro realizado com sucesso!');
				return goto(`/company/${$companyData.id}`);
			}

			await toast.promise(saveData(data), {
				loading: 'Salvando dados...',
				success: 'Dados salvos com sucesso!',
				error: 'Erro ao salvar dados.'
			});

			goto(`/form/${currentStepIndex + 2}`);
		} catch (error) {
			console.error(error);
			toast.error('Erro ao salvar dados.');
		} finally {
			isSubmitting = false;
		}
	}

	onMount(() => {
		if (!$companyData.id) {
			return goto('/form/1');
		}

		if (!document.querySelector('body')?.style.getPropertyValue('--primary')) {
			document.querySelector('body')?.style.setProperty('--primary', $companyData.primary_color);
		}
	});
</script>

<svelte:head>
	<title>Easy Aluga | Formulário de cadastro</title>
</svelte:head>

<main>
	<Header />
	<form class="container" id="content" on:submit|preventDefault={handleSubmitForm}>
		<h1>Cadastro de usuário</h1>
		<span>Siga as etapas para criar seu perfil</span>
		<div>
			<aside>
				{#each steps as { button: { name, description, Icon } }, index}
					<a
						href="/form/{index + 1}"
						class:active={currentStepIndex === index}
						class:disabled={currentStepIndex < index}
					>
						<div>
							<strong>{name}</strong>
							<small>{description}</small>
						</div>
						<div>
							<Icon class="icon" />
						</div>
					</a>
				{/each}
			</aside>
			<main>
				{#if step}
					<span>Etapa {currentStepIndex + 1}/{steps.length}</span>
					<h2>{step.title}</h2>
					<p>{step.description}</p>
					<hr />
					<div in:fade={{ duration: 200, delay: 300 }} out:fade={{ duration: 200 }}>
						<slot />
					</div>
				{/if}
			</main>
		</div>
		<footer>
			<Button type="button" variant="link">Voltar</Button>
			<Button type="submit" disabled={isSubmitting}>
				{#if isSubmitting}
					Salvando dados
				{:else if currentStepIndex === steps.length - 1}
					Finalizar cadastro
				{:else}
					Próxima etapa
				{/if}
			</Button>
		</footer>
	</form>
</main>

<style lang="scss">
	main {
		/* min-height: 100%; */

		> #content {
			display: flex;
			flex-direction: column;
			justify-content: center;

			/* min-height: calc(100% - 6.25rem); */
			margin: 4rem auto;

			> div {
				display: grid;
				grid-template-columns: 17rem 1fr;

				flex: 1;
				margin: 1rem 0;
				border-top: 1px solid #d4d4d8;

				aside {
					display: flex;
					flex-direction: column;

					padding: 0.5rem 0;
					border-right: 1px solid #d4d4d8;

					a {
						display: flex;
						gap: 0.75rem;

						padding: 1rem 1.5rem;

						background: transparent;
						border: none;

						text-decoration: none;
						cursor: pointer;
						color: inherit;

						&.active div:last-child {
							background-color: var(--primary);
							color: #fff;
						}

						&.disabled {
							pointer-events: none;
							opacity: 0.5;
						}

						div:first-child {
							display: flex;
							flex-direction: column;
							flex: 1;

							text-align: end;

							span {
								color: #18181b;

								font-weight: 700;
								font-size: 1.125rem;
							}

							small {
								color: #3f3f46;

								font-size: 0.75rem;
								font-weight: 500;
							}
						}

						div:last-child {
							display: flex;
							align-items: center;
							justify-content: center;

							height: 3rem;
							width: 3rem;
							border-radius: 9999px;

							background-color: #e4e4e7;

							:global(.icon) {
								width: 1.5rem;
								height: 1.5rem;
							}
						}
					}
				}

				main {
					display: flex;
					flex-direction: column;

					padding: 1.5rem 2rem;

					h2 {
						margin: 0.5rem 0;
					}

					hr {
						background-color: #d4d4d8;
						height: 1px;
						border: 0;
						margin: 1rem 0;
					}

					> div {
						flex: 1;
					}
				}

				@media (max-width: 660px) {
					grid-template-columns: 1fr;

					aside {
						display: none;
					}

					main {
						padding: 1.5rem 0;
					}
				}
			}

			> footer {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 1rem;
			}
		}
	}
</style>
