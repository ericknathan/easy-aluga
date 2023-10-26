<script lang="ts">
	import { Header } from '$lib/components/global';
	import { fade } from 'svelte/transition';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: pathname = data.pathname;
</script>

<main>
	<Header />
	{#key pathname}
		<div in:fade={{ duration: 200, delay: 300 }} out:fade={{ duration: 200 }}>
			<slot />
		</div>
	{/key}
</main>

<style>
	main {
		height: 100%;
	}

	main > div {
		height: calc(100% - 6.25rem);
	}
</style>
