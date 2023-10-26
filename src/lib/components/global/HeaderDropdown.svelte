<script lang="ts">
	import { companyData } from '$lib/stores';

	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import companies from '$lib/database/companies.json';
	import { updateCompanyColors } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

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

	// beforeNavigate(() => {
	// 	updateCompanyColors($companyData);
	// });
</script>

<div
	id="dropdown"
	in:fly={{ duration: 250, y: -15, opacity: 1 }}
	out:fly={{ duration: 250, y: -15, opacity: 0 }}
>
	{#each companies as company}
		{@const newUrl = $page.data.url.replace(
			/\/company\/[a-z0-9-]+/,
			'/company/' + company.id
		)}
		<a href={newUrl} data-sveltekit-preload-data="tap">
			<label class:active={company.id === $companyData.id}>
				<input type="radio" />
				<img src="/assets/companies/{company.id}/icon.png" alt="" />
				<span>{company.audience}</span>
			</label>
		</a>
	{/each}
</div>
<span class="background" transition:fade={{ duration: 250 }} />

<style>
	#dropdown {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;

		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 2.5rem;

		width: 100%;
		padding: 1.5rem;
		border-radius: 0 0 12px 12px;

		border: 1px solid #d4d4d8;
		border-top: none;
		background-color: #fafafa;

		cursor: default;
		z-index: 100;
	}

	.background {
		content: '';
		position: fixed;
		bottom: 0;
		left: 0;

		width: 100%;
		height: calc(100% - 6.25rem);

		background-color: #0002;

		cursor: default;
		z-index: 50;
	}

	#dropdown a {
		color: inherit;
	}

	#dropdown a {
		text-decoration: none;
	}

	#dropdown a label.active {
		border-color: var(--primary);
	}

	#dropdown a label {
		display: flex;
		align-items: center;
		gap: 0.75rem;

		padding: 1.5rem;
		border-radius: 8px;

		border: 2px solid transparent;
		color: inherit;
		background-color: #ffffff;

		font-size: 1rem;
		font-weight: 700;

		cursor: pointer;
	}

	#dropdown a label img {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 4rem;
		height: 4rem;
		padding: 0.75rem;
		border-radius: 9999px;

		background-color: #e4e4e7;
	}

	#dropdown input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	@media (max-width: 850px) {
		#dropdown {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	@media (max-width: 650px) {
		#dropdown {
			margin-top: 1.65rem;
		}
	}
</style>
