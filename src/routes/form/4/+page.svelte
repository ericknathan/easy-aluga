<script lang="ts">
</script>

<fieldset>
	<label>
		<input type="radio" name="price" value="hourly" required />
		<span>Por hora</span>
	</label>
	<label>
		<input type="radio" name="price" value="daily" required />
		<span>Por dia</span>
	</label>
	<label>
		<input type="radio" name="price" value="monthly" required />
		<span>Por mês</span>
	</label>
</fieldset>

<style lang="scss">
	fieldset {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 0.75rem;

		border: none;

		label {
			position: relative;

			display: flex;
			align-items: center;
      justify-content: center;
			gap: 0.75rem;

      height: 3rem;
			padding: 0 1rem;
			border-radius: 4px;

			background-color: #ffffff;

			cursor: pointer;

			&:focus-within,
			&:has(input:checked) {
				outline: 2px solid var(--primary);
				outline-offset: 2px;
			}

			input {
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				width: 0;
			}

			span {
				font-size: 1rem;
				color: #27272a;
        text-align: center;
			}
		}
	}
</style>
