<script>
	import Header from "./components/Header.svelte";
	import Map from "./components/map/Map.svelte";
	import { fade } from "svelte/transition";

	export let user;
	export let tries;

	let active = "map";

	function getActiveView(view) {
		return {
			map: Map,
			collection: Map,
		}[view];
	}
	let activeView;
	$: activeView = getActiveView(active);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<Header bind:active />

	{#key active}
		<div
			class="wrapper"
			in:fade={{ delay: 210, duration: 200 }}
			out:fade={{ delay: 0, duration: 200 }}
		>
			<svelte:component this={activeView} {tries} {user} />
		</div>
	{/key}
</main>

<style lang="scss">
	main {
		overflow: hidden;
		:global(*) {
			font-family: "Montserrat", sans-serif;
			font-weight: 400;
			box-sizing: border-box;
		}
	}
	.wrapper {
		position: relative;
	}
</style>
