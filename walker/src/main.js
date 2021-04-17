import App from './App.svelte';

const initWalker = () => {
	const walker = document.querySelector("#walker");

	return new App({
		target: walker,
		props: walker.dataset
	});
}

initWalker()