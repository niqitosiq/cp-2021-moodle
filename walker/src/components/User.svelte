<script>
	import Icon from "./ui/Icon.svelte";
</script>

<div>
	<div class="picture">
		<img
			src="https://2.bp.blogspot.com/-SYZeEKXWltA/W_F8zblq64I/AAAAAAAABec/c9L0mbjGgcYoFfnD6V1Zpd6gK-VhxzSWwCLcBGAs/w1200-h630-p-k-no-nu/rect1313.png"
			alt=""
		/>
	</div>

	<span class="name">Ищенко Александр</span>

	<div class="team">
		<span>Команда</span>
		<span>Синяя</span>
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
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.4);
			opacity: 0;
		}
	}
	@keyframes circleZoom2 {
		0% {
			transform: scale(0.6);
			opacity: 1;
		}
		100% {
			transform: scale(1.2);
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
		}
		&:after {
			animation-name: circleZoom2;
		}
		img {
			width: 70px;
			height: 70px;
			border-radius: 70px;
			object-fit: cover;
		}
	}
</style>
