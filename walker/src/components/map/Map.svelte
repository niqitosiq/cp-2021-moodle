<script>
	import Dice from "../Dice.svelte";
	import { gsap } from "gsap";
	import { onMount } from "svelte";

	onMount(() => {
		const tl = gsap.timeline();
		tl.to("#map", {
			x: -400,
			y: -200,
			duration: 5,
		}).to("#map", { x: 0, y: 0, duration: 5 });
	});
</script>

<Dice />

<div class="wrapper">
	<img id="map" src="./city.svg" alt="" />

	<div id="rect" />
</div>

<style>
	.wrapper {
		width: 1152px;
		height: 692px;
		position: relative;
		overflow: hidden;
	}
	#map {
		width: 2400px;
		z-index: -1;
		pointer-events: none;
		transform: translate(-700px, -700px);
		transform-origin: right top;
	}
	/* svg {
		width: 2400px;
		height: 2400px;
	} */
</style>
