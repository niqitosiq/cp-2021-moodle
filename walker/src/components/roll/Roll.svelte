<script>
	import Icon from "../ui/Icon.svelte";

	let items = [
		{ preview: "/my/assets/nikita.png", rare: true },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen.png", rare: false },
		{ preview: "/my/assets/cup.png", rare: false },
		{ preview: "/my/assets/nikita.png", rare: true },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen.png", rare: false },
		{ preview: "/my/assets/cup.png", rare: false },
		{ preview: "/my/assets/nikita.png", rare: true },
		{ preview: "/my/assets/stickers.png", rare: false },
		{ preview: "/my/assets/pen.png", rare: false },
		{ preview: "/my/assets/cup.png", rare: false },
	];
</script>

<div class="roll">
	<div class="active">
		<div class="arrow top">
			<Icon name="arrow" />
		</div>
		<div class="arrow bottom">
			<Icon name="arrow" />
		</div>
		<div class="items">
			{#each items as { preview, rare }}
				<div class="item" class:rare>
					<img src={preview} alt="" />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.roll {
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 20;
	}
	.item {
		&.rare {
			background: linear-gradient(
				180deg,
				#fed027 0%,
				rgba(254, 155, 39, 0) 100%
			);
		}
	}
</style>
