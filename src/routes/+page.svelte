<script lang="ts">
	import {
		DiscoveryVehicleSection,
		Header,
		HeroSection,
		OurClientsSection,
		TestimoniesSection
	} from '$lib/components/pages/home';
</script>

<svelte:head>
	<title>Easy Aluga | Página inicial</title>

	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
	/>
</svelte:head>

<Header />
<main>
	<HeroSection />
	<OurClientsSection />
	<TestimoniesSection />
	<DiscoveryVehicleSection />
</main>

<style>
	main {
		--primary: #18181b;
		--primary-opaque: #18181b66;

		--foreground: #18181b;
		--foreground-opaque: #18181b66;
		--background: #fafafa;
	}
</style>
