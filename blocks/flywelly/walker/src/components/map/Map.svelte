<script>
	import Dice from "../Dice.svelte";
	import Button from "../ui/Button.svelte";
	import { gsap } from "gsap";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import Roll from "../roll/Roll.svelte";
	import axios from "axios";

	export let activePosition = 0;
	export let tries = 0;
	export let user;

	let isRolled = false;
	let roulette = false;
	let loaded = false;
	let rollTries;

	function rollDice() {
		rollTries--;
		localStorage.setItem("rolled", rollTries);
		if (!isRolled)
			setTimeout(() => {
				isRolled = false;
				const rolled = points[activePosition];

				gsap.to("#user", {
					x: rolled.x,
					y: rolled.y,
					duration: 2,
				});
				gsap.to("#map", {
					y: -rolled.y,
					duration: 4,
				});

				if (rolled.type === "prize") {
					setTimeout(() => {
						roulette = true;
					}, 2500);
				}

				axios.get(
					`/my/backend/walker.save.php?id=${user}&pos=${activePosition}`
				);
			}, 3000);
		isRolled = true;
	}

	const points = [
		{ x: 384, y: 464, type: "start" },
		{ x: 438, y: 527, type: "empty" },
		{ x: 508, y: 567, type: "empty" },
		{ x: 575, y: 607, type: "prize" },
		{ x: 642, y: 647, type: "empty" },
		{ x: 847, y: 760, type: "empty" },
		{ x: 910, y: 790, type: "empty" },
	];

	onMount(async () => {
		const rolled = localStorage.getItem("rolled") || 0;
		rollTries = tries - rolled;

		const { data } = await axios.get(
			`http://localhost:8000/my/backend/walker.get.php?id=${user}`
		);
		activePosition = data.pos;

		loaded = true;

		const tl = gsap.timeline();
		tl.to(
			"#map",
			{
				x: -880,
				y: -120,
				duration: 5,
			},
			"-=2"
		)
			.to(
				"#map",
				{
					x: 460,
					y: -470,
					duration: 5,
				},
				"-=2"
			)
			.to("#map", { scale: 1.2, duration: 9, ease: "power2.out" }, "-=6");

		gsap.to("#user", {
			x: points[activePosition].x,
			y: points[activePosition].y,
			duration: 1,
		});
	});
</script>

<div class="map-section">
	{#if isRolled}
		<div
			class="dice"
			in:fade={{ delay: 210, duration: 200 }}
			out:fade={{ delay: 0, duration: 200 }}
		>
			<Dice bind:random={activePosition} />
		</div>
	{/if}
	{#if roulette}
		<Roll bind:roulette />
	{/if}
	<div class="wrapper">
		<div id="map" class:loaded>
			<img src="./city.svg" alt="" />

			<div id="user">
				<div class="picture">
					<img
						src="https://otvet.imgsmail.ru/download/49056727_b4076d725aa34ac69a87e28b99218ad3_800.jpg"
						alt=""
					/>
				</div>
			</div>
		</div>

		<Button on:click={rollDice} disabled={rollTries <= 0}>
			Бросить кубик ({rollTries})
		</Button>
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
		transform: translate(-1040px, 30px);
		transform-origin: left top;
		z-index: 10;
		position: relative;
		opacity: 0;
		transition: opacity ease 0.3s;
		&.loaded {
			opacity: 1;
		}
		> img {
			width: 2400px;
		}
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
	.picture {
		width: 50px;
		height: 50px;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #f55063;
		img {
			width: 40px;
			height: 40px;
			border-radius: 70px;
			object-fit: cover;
			position: relative;
			background-color: #fff;
			z-index: 5;
		}
	}
	#user {
		left: 0;
		top: 0;
		position: absolute;
		z-index: 30;
	}
</style>
