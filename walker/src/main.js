import App from './App.svelte';

const walker = document.querySelector("#walker");

export default new App({
	target: walker,
	props: walker.dataset
});