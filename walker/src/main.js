import App from './App.svelte';

window.initWalker = (props) => {
	return new App({
		target: document.querySelector("#walker"),
		props
	});
}

window.initWalker();