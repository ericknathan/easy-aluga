<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

  $: session = $page.data.session;
</script>

<h1>SvelteKit Auth Example</h1>
<p>
	{#if session}
		{#if session.user?.image}
			<span style="background-image: url('{session.user.image}')" class="avatar" />
		{/if}
		<span class="signedInText">
      <img src={session.user?.image} alt="">
			<small>Signed in as</small><br />
			<strong>{session.user?.name ?? 'User'}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<button on:click={() => signIn('google')}>Sign In with Google</button>
	{/if}
</p>
