<script>
	import Icon from "./ui/Icon.svelte";
</script>

<div class="user">
	<div class="picture">
		<img
			src="https://otvet.imgsmail.ru/download/49056727_b4076d725aa34ac69a87e28b99218ad3_800.jpg"
			alt=""
		/>
	</div>

	<div class="person">
		<span class="name">Ищенко Александр</span>

		<div class="team">
			<span class="team-label">Команда</span>
			<span class="color">Синяя</span>
		</div>
	</div>

	<div class="coins">
		<div class="count">
			<Icon name="coins" />
		</div>

		<span>54</span>
	</div>
</div>

<style lang="scss">
	@keyframes circleZoom1 {
		0% {
			transform: scale(0.6);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
	@keyframes circleZoom2 {
		0% {
			transform: scale(0.6);
			opacity: 1;
		}
		100% {
			transform: scale(1.4);
			opacity: 0;
		}
	}
	.picture {
		width: 90px;
		height: 90px;
		border-radius: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #fff;
		&:before,
		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 100%;
			border: solid 1px #1b2d6b;
			animation: circleZoom1 ease 1.5s infinite;
			z-index: 2;
		}
		&:after {
			animation-name: circleZoom2;
		}
		img {
			width: 70px;
			height: 70px;
			border-radius: 70px;
			object-fit: cover;
			position: relative;
			background-color: #fff;
			z-index: 5;
		}
	}
	.user {
		display: flex;
		align-items: center;
		&:after {
			content: "";
			height: 58px;
			width: 1px;
			background: #e0e0e0;
			margin-left: 40px;
		}
	}
	.person {
		margin-left: 20px;
		margin-right: 40px;
	}
	.name {
		font-weight: bold;
		font-size: 14px;
		color: #282828;
		margin-bottom: 2px;
	}
	.team {
		display: flex;
		&-label {
			font-size: 12px;
			line-height: 15px;
			color: #9b9b9b;
		}
		.color {
			font-size: 12px;
			color: #1b2d6b;
			display: flex;
			align-items: center;
			margin-left: 10px;
			&:before {
				content: "";
				width: 5px;
				height: 5px;
				border-radius: 5px;
				background: #1b2d6b;
				margin-right: 4px;
			}
		}
	}
	.coins {
		display: flex;
		align-items: center;
		span {
			margin-left: 10px;
			font-weight: 600;
			font-size: 14px;
			color: #282828;
		}
	}
</style>
