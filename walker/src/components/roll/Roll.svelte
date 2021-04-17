<script>
	import Button from "../ui/Button.svelte";

	import Icon from "../ui/Icon.svelte";
	import { gsap } from "gsap";

	let active = 2;
	let items = [
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
		{
			preview: "/my/assets/case_trans.png",
			rare: true,
		},
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen_trans.png", rare: false },
		{ preview: "/my/assets/cup_trans.png", rare: false },
	];

	function getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function roll() {
		active = getRandomNumber(0, items.length - 1);
		const tl = gsap.timeline();
		tl.to("#roll-items", {
			x: "+=100px",
			duration: 0.5,
		}).to("#roll-items", {
			x: active * -180,
			duration: 2,
		});
	}
</script>

<div class="roll">
	<h2>Вы выиграли подарок 1-го ранга</h2>

	<div class="wrapper">
		<div class="arrow top">
			<Icon name="arrow" />
		</div>
		<div class="arrow bottom">
			<Icon name="arrow" />
		</div>
		<div class="active-zone">
			<div
				id="roll-items"
				class="items"
				style="width: {items.length * 150}px; transform: translateX(-360px)"
			>
				{#each items as { preview, rare }, index}
					<div class="item" class:active={index === active} class:rare>
						<img src={preview} alt="" />
					</div>
				{/each}
			</div>
		</div>
	</div>

	<Button on:click={roll}>Крутить</Button>
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
	}
	.active-zone {
		width: 182px;
		border: 1px solid #1b2d6b;
		box-sizing: border-box;
		border-radius: 21px;
		position: relative;
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
</style>
