<script lang="ts">
	import { updateCompanyColors } from '$lib/utils';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { company } = data;

	onMount(() => {
		updateCompanyColors(company);
	});
</script>

<slot />
