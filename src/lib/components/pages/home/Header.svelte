<script lang="ts">
	import { UserButton } from '$lib/components/global';
</script>

<header>
	<div class="container">
		<a href="/">
			<img src="/assets/images/logo.svg" alt="" />
		</a>
		<nav>
			<a href="#our-clients">Nossas soluções</a>
			<a href="#testimonies">Depoimentos</a>
			<a href="#discovery-vehicle">Vantagens</a>
		</nav>
		<UserButton />
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;

		height: 6.25rem;
		border-bottom: 2px solid #1a4199;
	}

	header .container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	header nav {
		display: flex;
		align-items: center;
		gap: 3.25rem;
	}

	header nav a {
		position: relative;

		color: #18181b;

		text-decoration: none;
		font-size: 1rem;
	}

	header nav a:focus {
		outline: none;
	}

	header nav a::after,
	header nav a::after {
		content: '';

		position: absolute;
		bottom: -4px;
		left: 50%;
		transform: translateX(-50%);

		width: 0;
		height: 2px;
		border-radius: 2px;

		background-color: transparent;

		transition: all 0.2s ease-in-out;
	}

	header nav a:focus-visible::after,
	header nav a:hover::after {
		width: 3rem;
		background-color: #1a4199;
	}
	header a {
		text-decoration: none;
	}

	@media only screen and (max-width: 760px) {
		header nav {
			display: none;
		}
	}
</style>
