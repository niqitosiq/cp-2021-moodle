<script>
	export let disabled = false;
</script>

<button on:click class:disabled>
	<slot />
</button>

<style lang="scss">
	button {
		width: 268px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1b2d6b;
		font-size: 10px;
		line-height: 12px;
		text-transform: uppercase;
		color: #ffffff;
		outline: none;
		border-radius: 17px;
		border: none;
		transition: background-color ease 0.3s;
		cursor: pointer;
		&:hover {
			background: #3a519f;
		}
		&.disabled {
			pointer-events: none;
			background: #6b8af4;
		}
	}
</style>
