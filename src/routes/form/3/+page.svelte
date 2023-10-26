<script>
	import cities from '$lib/database/cities.json';
	import MapTrifold from 'phosphor-svelte/lib/MapTrifold';
</script>

<div class="map">
	<label>
		<input type="text" placeholder="Insira sua localização" value="Barueri, SP" list="locations" />
		<datalist id="locations">
			{#each cities.SP as city}
				<option value="{city}">
					{city}, SP
				</option>
			{/each}
		</datalist>
		<div class="icon">
			<MapTrifold size={24} />
		</div>
	</label>
	<iframe
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1722277061335!2d-46.65545488687333!3d-23.56225712022109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c92a3b5939%3A0xd80224e64ad3f154!2sAv.%20Paulista%2C%201471%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1spt-BR!2sbr!4v1696195622088!5m2!1spt-BR!2sbr"
		allowfullscreen
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		title="Mapa"
	/>
</div>

<style lang="scss">
	.map {
		position: relative;

		flex: 1;
		height: 100%;
		border-radius: 8px;

		border: 2px solid var(--primary);
		background-color: #e4e4e7;

		overflow: hidden;

		label {
			position: absolute;
			top: 1rem;
			left: 1rem;

			display: flex;
			align-items: center;
			justify-content: center;

			width: 18.75rem;
			height: 3rem;
			max-width: calc(100% - 2rem);
			border-radius: 4px;

			background-color: #fff;
			border: 1px solid #d4d4d8;

			&:focus-within {
				outline: 2px solid var(--primary);
			}

			input {
				height: 100%;
				flex: 1;

				border: none;
				padding-left: 1rem;

				&:focus {
					outline: none;
				}
			}

			.icon {
				padding: 0 1rem;
				pointer-events: none;
			}
		}

		iframe {
			width: 100%;
			height: 100%;

			border: none;
		}

		@media (max-width: 660px) {
			height: 18.75rem;
		}
	}
</style>
