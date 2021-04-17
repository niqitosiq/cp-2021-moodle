<script>
	import Icon from "./ui/Icon.svelte";

	export let active = "map";

	const headers = [
		{ icon: "map", label: "Карта" },
		{ icon: "collection", label: "Коллекция" },
		{ icon: "bag", label: "Инвентарь" },
		{ icon: "achivment", label: "Достижения" },
	];
</script>

<div class="header">
	{#each headers as { icon, label }}
		<div
			class="item {icon}"
			class:active={active === icon}
			on:click={() => {
				active = icon;
			}}
		>
			<Icon name={icon} />
			<span>{label}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.header {
		height: 88px;
		display: flex;
		align-items: stretch;
	}
	.item {
		width: 103px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #f8f8f8;
		color: #1b2d6b;
		transition: background-color ease 0.3s, color ease 0.3s;
		border-radius: 25px;
		cursor: pointer;
		&:hover {
			background: #e9e9e9;
		}
		span {
			font-size: 10px;
			font-style: normal;
			font-weight: 700;
			line-height: 12px;
			letter-spacing: 0em;
			text-align: left;
			text-transform: uppercase;
			margin-top: 7px;
		}
		:global(svg) {
			fill: #1b2d6b;
			stroke: #1b2d6b;
			font-size: 24px;
			transition: fill ease 0.3s, stroke ease 0.3s;
		}
		&:not(:last-child) {
			margin-right: 10px;
		}
		&.bag {
			:global(svg) {
				font-size: 28px;
			}
		}
		&.active {
			background-color: #1b2d6b;
			color: #f8f8f8;
			&:hover {
				background: #3a519f;
			}
			:global(svg) {
				fill: #fff;
				stroke: #fff;
			}
		}
	}
</style>
