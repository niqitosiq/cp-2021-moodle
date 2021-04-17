<script>
	import Dice from "../Dice.svelte";
	import Button from "../ui/Button.svelte";
	import { gsap } from "gsap";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	onMount(() => {
		const tl = gsap.timeline();
		tl.to(
			"#map",
			{
				x: -700,
				y: -300,
				duration: 5,
			},
			"-=2"
		)
			.to(
				"#map",
				{
					x: 400,
					y: -300,
					duration: 5,
				},
				"-=2"
			)
			.to("#map", { scale: 1, duration: 9, ease: "power2.out" }, "-=10");
	});

	let isRolled = false;

	function rollDice() {
		if (!isRolled) setTimeout(() => (isRolled = false), 3000);
		isRolled = true;
	}

	const points = [
		{ x: 201, y: 163, type: "prize" },
		{ y: 223, x: 261, type: "prize" },
		{ y: 295, x: 301, type: "prize" },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
		// { y: , x:, type: 'prize' },
	];
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
		<div id="map">
			<img src="./city.svg" alt="" />

			{#each points as { x, y }}
				<div class="point" style="left: {x}px; top: {y}px;" />
			{/each}
		</div>

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
		transform: translate(-750px, -100px);
		transform-origin: right top;
		z-index: 10;
	}
	img {
		width: 2400px;
	}
	.point {
		position: absolute;
		width: 30px;
		height: 30px;
		z-index: 300;
		background-color: #000;
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
