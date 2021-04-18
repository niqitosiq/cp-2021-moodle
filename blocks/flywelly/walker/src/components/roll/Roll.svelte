<script>
	import Button from "../ui/Button.svelte";
	import { slide, fade } from "svelte/transition";
	import Icon from "../ui/Icon.svelte";
	import { gsap } from "gsap";

	export let roulette;

	let active = 2;
	let winned = false;
	let items = [
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
			description: "Кейс Samsung IT-School",
		},
		{
			preview: "/my/assets/stickers.png",
			rare: false,
			description: "Стикеры Samsung IT-School для VK",
		},
		{
			preview: "/my/assets/pen_trans.png",
			rare: false,
			description: "Ручку Samsung IT-School",
		},
		{
			preview: "/my/assets/cup_trans.png",
			rare: false,
			description: "Кружку Samsung IT-School",
		},
	];

	let activeItem;
	$: activeItem = items[active];

	function getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function roll() {
		if (winned) {
			roulette = false;
			return;
		}
		const oldActive = active;
		active = getRandomNumber(0, items.length - 1);

		const tl = gsap.timeline();
		tl.to("#roll-items", {
			x: `${oldActive > active ? "-" : "+"}=100px`,
			duration: 0.5,
		}).to("#roll-items", {
			x: active * -180,
			duration: 2,
		});

		setTimeout(() => {
			winned = true;
		}, 2900);
	}
</script>

<div class="roll" transition:slide>
	{#if !winned}
		<h2 transition:slide>Вы выиграли подарок 1-го ранга</h2>
	{/if}
	<div class="wrapper">
		<div class="arrow top" class:winned>
			<Icon name="arrow" />
		</div>
		<div class="arrow bottom" class:winned>
			<Icon name="arrow" />
		</div>
		<div class="active-zone" class:winned>
			<div
				id="roll-items"
				class="items"
				style="width: {items.length * 150}px; transform: translateX(-360px)"
			>
				{#each items as { preview, rare }, index}
					<div
						class="item"
						class:active={index === active}
						class:winned
						class:rare
					>
						<img src={preview} alt="" />
					</div>
				{/each}
			</div>
		</div>
	</div>

	{#if winned}
		<div class="description" transition:slide>
			<h3>Поздравляю, вы выиграли {activeItem.description}</h3>
			<p>Поздравляю, вы выиграли {activeItem.description}</p>
		</div>
	{/if}

	<img class="happy" class:winned src="/my/assets/happy.png" alt="" />

	<Button on:click={roll}>{winned ? "Забрать" : "Крутить"}</Button>
</div>

<style lang="scss">
	h2 {
		font-weight: bold;
		font-size: 20px;
		line-height: 24px;
		text-align: center;
		color: #282828;
		margin: 15px 0px;
	}
	.roll {
		width: calc(100% - 80px);
		height: calc(100% - 54px);
		background-color: #fff;
		height: 446px;
		border-radius: 26px;
		position: absolute;
		left: 40px;
		top: 27px;
		z-index: 200;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50px;
		overflow: hidden;
	}
	.active-zone {
		width: 182px;
		border: 1px solid #1b2d6b;
		box-sizing: border-box;
		border-radius: 21px;
		position: relative;
		transition: border ease 0.3s;
		&.winned {
			border: 1px solid #fff;
		}
	}
	.items {
		display: flex;
	}
	.item {
		margin: 0 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150px;
		flex-shrink: 0;
		opacity: 0.4;
		&.rare {
			background: linear-gradient(
				180deg,
				#fed027 0%,
				rgba(254, 155, 39, 0) 100%
			);
		}
		&.winned {
			opacity: 0;
		}
		&.active {
			opacity: 1;
		}
	}
	.arrow {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		&.top {
			top: 0;
		}
		&.bottom {
			bottom: 0;

			transform: translateX(-50%) rotate(-180deg);
		}
		:global(svg) {
			fill: #1b2d6b;
		}
		transition: opacity ease 0.3s;
		&.winned {
			opacity: 0;
		}
	}
	.wrapper {
		max-width: 1069px;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30px 0;
		position: relative;
		margin-bottom: 20px;
	}

	.description {
		max-width: 390px;
		h3 {
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			text-align: center;

			/* Text */

			color: #282828;
		}
		p {
			font-size: 14px;
			line-height: 17px;
			text-align: center;

			color: #000000;

			opacity: 0.6;
		}
	}

	.happy {
		position: absolute;
		left: -10%;
		top: -20%;
		width: 120%;
		height: 120%;
		opacity: 0;
		pointer-events: none;
		transform: scale(0);
		transition: transform ease 0.6s, opacity ease 0.6s;
		z-index: -1;
		&.winned {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
