<script lang="ts">
	import { page } from '$app/stores';
	import { companyData } from '$lib/stores';

	let loggedUser = {
		name: 'Flávio Mendes',
		avatar: '/assets/images/fake-user-avatar.png'
	};

	import CaretDown from 'phosphor-svelte/lib/CaretDown';
	import { onMount } from 'svelte';
	import HeaderDropdown from './HeaderDropdown.svelte';
	import UserButton from './UserButton.svelte';

	let dropdownIsOpen = false;

	function handleToggleDropdown() {
		dropdownIsOpen = !dropdownIsOpen;
	}

	onMount(() => {
		const clickEvent = (event: MouseEvent) => {
			const element = event.target as HTMLElement;
			if (dropdownIsOpen && !element.closest('#dropdown') && !element.closest('#dropdown-toggle')) {
				dropdownIsOpen = false;
			}
		};

		const scrollEvent = (event: Event) => {
			if (dropdownIsOpen) {
				dropdownIsOpen = false;
			}
		};

		document.addEventListener('click', clickEvent);
		document.addEventListener('scroll', scrollEvent);

		return () => {
			document.removeEventListener('click', clickEvent);
			document.removeEventListener('scroll', scrollEvent);
		};
	});
</script>

<header id="app-header">
	<div class="container">
		<a
			href={$page.url.pathname.includes(`${$page.params.slug}/`)
				? `/company/${$page.params.slug}`
				: '/'}
		>
			<img src="/assets/images/logo.svg" alt="" />
		</a>
		<button on:click={handleToggleDropdown} on:keydown={handleToggleDropdown} id="dropdown-toggle">
			<CaretDown weight="bold" />
			<h1 id="company-name">{$companyData.name}</h1>
			<div id="divider" />
			<p id="company-description">{$companyData.short_description}</p>
			{#if dropdownIsOpen}
				<HeaderDropdown />
			{/if}
		</button>
		<UserButton />
	</div>
</header>

<style>
	header#app-header {
		display: flex;
		align-items: center;

		height: 6.25rem;
		border-bottom: 2px solid var(--primary, #1a4199);
	}

	header#app-header .container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	header#app-header .container > button {
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;

		width: 90%;
		max-width: 36rem;

		background-color: transparent;
		border: none;

		cursor: pointer;
	}

	header#app-header .container > button h1 {
		position: relative;

		font-size: 1.25rem;
		font-weight: 700;
	}

	header#app-header .container > button #divider {
		flex: 1;
		height: 1px;
		background-color: #a1a1aa;
	}

	header#app-header .container > button p {
		font-size: 1rem;
		font-weight: 400;
	}

	header#app-header a {
		text-decoration: none;
	}

	@media (max-width: 650px) {
		header#app-header .container > button p,
		header#app-header .container > button #divider {
			display: none;
			opacity: 0;
			position: absolute;
		}

		header#app-header .container {
			position: relative;
		}

		header#app-header .container > button {
			position: initial;
		}
	}
</style>
