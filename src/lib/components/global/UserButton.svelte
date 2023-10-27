<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { companyData } from '$lib/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	$: session = $page.data.session;

	function handleAction() {
		if (!$page.url.pathname.includes('company')) {
			signOut();
		} else {
			goto(`/company/${$companyData.id}/profile`);
		}
	}
</script>

{#if !session || !session.user}
	<button on:click={() => signIn('google')}>
		<img src="/assets/images/avatar-fallback.svg" alt="" />
		<span>Entrar</span>
	</button>
{:else}
	<button on:click={handleAction}>
		<img src={session.user.image} alt="Foto de perfil do usuário {session.user.name}" />
		<span>
			{session.user.name}
		</span>
	</button>
{/if}

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.125rem;

		border-radius: 2.8125rem;
		padding: 0.5rem 1.375rem 0.5rem 0.5rem;

		background: none;
		border: 1px solid #71717a;

		font-size: 1rem;

		cursor: pointer;

    &:focus-visible {
      outline: none;
      box-shadow: 0px 0px 0px 2px var(--primary-opaque, #1a419966);
    }
  
    > img {
      padding: 2px;
      height: 2.5rem;
      width: 2.5rem;
  
      background-color: var(--primary, #1a4199);
      border-radius: 999px;
    }
	}

	@media (max-width: 500px) {
		button {
			padding: 0.5rem;

      span {
			  display: none;
		  }
		}
  }
</style>
