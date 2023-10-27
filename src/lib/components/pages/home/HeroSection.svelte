<script>
	import { Button } from '$lib/components/shared';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';

	$: session = $page.data.session;
	$: preferences = $page.data.preferences;

	function handleAction() {
		if (!session) {
			signIn('google');
		} else if (preferences.preferredCompanyId) {
			goto(`/company/${preferences.preferredCompanyId}`);
		} else {
			goto(`/form/1`);
		}
	}
</script>

<section id="hero">
	<div class="container">
		<div>
			<div class="texts-container">
				<h1 class="animate__animated animate__fadeInUp">
					Aventure-se em uma nova
					<span>
						experiência
						<img src="/assets/images/title-detail.svg" alt="" />
					</span>
					na locação de veículos
				</h1>
				<p class="animate__animated animate__fadeInUp animate__slow">
					Experimente o poder do aluguel de veículos perfeito com nossa solução. Leve o desempenho a
					novos patamares e aproveite a colaboração multifuncional como nunca antes.
				</p>
			</div>
			<div class="buttons-container">
				<Button on:click={handleAction} class="animate__animated animate__fadeInLeft">
					Descobrir o veículo ideal
					<img src="/assets/icons/ph_lightbulb.svg" alt="" />
				</Button>
				<Button
					variant="link"
					href="#our-clients"
					class="animate__animated animate__fadeInLeft animate__fast"
				>
					Nossas soluções
				</Button>
			</div>
		</div>
	</div>
	<img
		class="animate__animated animate__fadeInRight"
		id="hero-image"
		src="/assets/images/car-image.png"
		alt="Um veículo automotivo pessoal branco com circulos de gradiente ao seu redor e a escrita 'Easy Aluga' em sua placa"
	/>
</section>

<style lang="scss">
	#hero {
		position: relative;

		display: flex;
		align-items: center;
		justify-content: space-between;

		background: url(/assets/images/background.png) no-repeat center;
		background-size: cover;
		height: calc(92vh - 6.25rem);

		.container {
			display: flex;
			align-items: center;
			justify-content: space-between;

			> div {
				flex: 1;
				max-width: 33rem;
				display: flex;
				flex-direction: column;
				gap: 3rem;
			}

			.texts-container {
				h1 {
					font-size: 3rem;
					font-weight: 700;
					line-height: 140%;

					span {
						position: relative;

						img {
							position: absolute;
							width: 75%;
							height: auto;
							bottom: -4px;
							right: 4px;
						}
					}
				}

				p {
					color: #71717a;
					line-height: 150%;
				}
			}

			.buttons-container {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
		}

		#hero-image {
			position: absolute;
			/* top: 50%; */
			right: 0;
			transform: translateY(-50%);

			max-height: 80%;
			max-width: 45%;

			object-fit: cover;

			transition: all 0.2s ease-in-out;
		}
	}

	@media only screen and (max-width: 850px) {
		#hero #hero-image {
			max-width: 40%;
		}
	}

	@media only screen and (max-width: 760px) {
		#hero {
			.container {
				> div {
					margin: 0 auto;
				}

				.texts-container h1 {
					font-size: 2.5rem;
				}

				.buttons-container {
					flex-direction: column;
					gap: 1rem;
				}
			}

			#hero-image {
				display: none;
			}
		}
	}
</style>
