<script>
	import Dice from "../Dice.svelte";
	import Button from "../ui/Button.svelte";
	import { gsap } from "gsap";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	onMount(() => {
		const tl = gsap.timeline();
		tl.to("#map", {
			x: -400,
			y: -200,
			duration: 5,
		}).to("#map", { x: 0, y: 0, duration: 5 });
	});

	let isRolled = false;

	function rollDice() {
		if (!isRolled) setTimeout(() => (isRolled = false), 5100);
		isRolled = true;
	}
</script>

<div class="map-section">
	{#if isRolled}
		<div
			class="dice"
			in:fade={{ delay: 210, duration: 200 }}
			out:fade={{ delay: 0, duration: 200 }}
		>
			<Dice />
		</div>
	{/if}
	<div class="wrapper">
		<img id="map" src="./city.svg" alt="" />

		<Button on:click={rollDice}>Бросить кубик</Button>
	</div>
</div>

<style lang="scss">
	.wrapper {
		max-width: 1152px;
		height: 692px;
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -20px;

		@media screen and (max-width: 1480px) {
			height: 520px;
		}
		:global(button) {
			position: absolute;
			bottom: 20px;
			z-index: 25;
		}
	}
	#map {
		width: 2400px;
		transform: translate(-700px, -700px);
		transform-origin: right top;
		z-index: 10;
	}
	.dice {
		position: absolute;
		margin: auto;
		z-index: 25;
	}
	.map-section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
