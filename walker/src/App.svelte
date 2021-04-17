<script>
	import Header from "./components/Header.svelte";
	import Dice from "./components/Dice.svelte";

	let active = "map";
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<Header {active} />
	<Dice />
</main>

<style lang="scss">
	main {
		:global(*) {
			font-family: "Montserrat", sans-serif;
			font-weight: 400;
			box-sizing: border-box;
		}
	}
</style>
