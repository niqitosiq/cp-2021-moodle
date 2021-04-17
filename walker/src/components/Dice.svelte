<script>
	function rollDice() {
		const dice = [...document.querySelectorAll(".die-list")];
		dice.forEach((die) => {
			toggleClasses(die);
			die.dataset.roll = getRandomNumber(1, 6);
		});
	}

	function toggleClasses(die) {
		die.classList.toggle("roll");
	}

	function getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
</script>

<div class="dice">
	<ol class="die-list roll">
		<li class="die-item" data-side="1">
			<span class="dot" />
		</li>
		<li class="die-item" data-side="2">
			<span class="dot" />
			<span class="dot" />
		</li>
		<li class="die-item" data-side="3">
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
		</li>
		<li class="die-item" data-side="4">
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
		</li>
		<li class="die-item" data-side="5">
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
		</li>
		<li class="die-item" data-side="6">
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
			<span class="dot" />
		</li>
	</ol>

	<button on:click={rollDice}>Вращать</button>
</div>

<style lang="scss">
	.dice {
		align-items: center;
		display: grid;
		grid-gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		grid-template-rows: auto;
		justify-items: center;
		padding: 2rem;
		perspective: 600px;
		* {
			box-sizing: content-box;
		}
	}
	.die-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		height: 6rem;
		list-style-type: none;
		transform-style: preserve-3d;
		width: 6rem;
	}
	.roll {
		transition: transform 5s ease;
	}
	.die-item {
		background-color: #4055f6;
		box-shadow: inset -0.35rem 0.35rem 0.75rem #6a7bff,
			inset 0.5rem -0.25rem 0.5rem #6a7bff;
		display: grid;
		grid-column: 1;
		grid-row: 1;
		grid-template-areas:
			"one two three"
			"four five six"
			"seven eight nine";
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		height: 100%;
		padding: 1rem;
		width: 100%;
	}
	.dot {
		align-self: center;
		background-color: #fff;
		border-radius: 50%;
		display: block;
		height: 1.25rem;
		justify-self: center;
		width: 1.25rem;
	}
	.dice {
		:global(.roll[data-roll="1"]) {
			transform: rotateX(-360deg) rotateY(-720deg) rotateZ(-360deg);
		}
		:global(.roll[data-roll="2"]) {
			transform: rotateX(-270deg) rotateY(-720deg) rotateZ(-360deg);
		}
		:global(.roll[data-roll="3"]) {
			transform: rotateX(-360deg) rotateY(-810deg) rotateZ(-360deg);
		}
		:global(.roll[data-roll="4"]) {
			transform: rotateX(-360deg) rotateY(-630deg) rotateZ(-360deg);
		}
		:global(.roll[data-roll="5"]) {
			transform: rotateX(-450deg) rotateY(-720deg) rotateZ(-360deg);
		}
		:global(.roll[data-roll="6"]) {
			transform: rotateX(-360deg) rotateY(-900deg) rotateZ(-360deg);
		}
	}
	[data-side="1"] {
		transform: rotate3d(0, 0, 0, 90deg) translateZ(4rem);
	}
	[data-side="2"] {
		transform: rotate3d(-1, 0, 0, 90deg) translateZ(4rem);
	}
	[data-side="3"] {
		transform: rotate3d(0, 1, 0, 90deg) translateZ(4rem);
	}
	[data-side="4"] {
		transform: rotate3d(0, -1, 0, 90deg) translateZ(4rem);
	}
	[data-side="5"] {
		transform: rotate3d(1, 0, 0, 90deg) translateZ(4rem);
	}
	[data-side="6"] {
		transform: rotate3d(1, 0, 0, 180deg) translateZ(4rem);
	}
	[data-side="1"] .dot:nth-of-type(1) {
		grid-area: five;
	}
	[data-side="2"] .dot:nth-of-type(1) {
		grid-area: one;
	}
	[data-side="2"] .dot:nth-of-type(2) {
		grid-area: nine;
	}
	[data-side="3"] .dot:nth-of-type(1) {
		grid-area: one;
	}
	[data-side="3"] .dot:nth-of-type(2) {
		grid-area: five;
	}
	[data-side="3"] .dot:nth-of-type(3) {
		grid-area: nine;
	}
	[data-side="4"] .dot:nth-of-type(1) {
		grid-area: one;
	}
	[data-side="4"] .dot:nth-of-type(2) {
		grid-area: three;
	}
	[data-side="4"] .dot:nth-of-type(3) {
		grid-area: seven;
	}
	[data-side="4"] .dot:nth-of-type(4) {
		grid-area: nine;
	}
	[data-side="5"] .dot:nth-of-type(1) {
		grid-area: one;
	}
	[data-side="5"] .dot:nth-of-type(2) {
		grid-area: three;
	}
	[data-side="5"] .dot:nth-of-type(3) {
		grid-area: five;
	}
	[data-side="5"] .dot:nth-of-type(4) {
		grid-area: seven;
	}
	[data-side="5"] .dot:nth-of-type(5) {
		grid-area: nine;
	}
	[data-side="6"] .dot:nth-of-type(1) {
		grid-area: one;
	}
	[data-side="6"] .dot:nth-of-type(2) {
		grid-area: three;
	}
	[data-side="6"] .dot:nth-of-type(3) {
		grid-area: four;
	}
	[data-side="6"] .dot:nth-of-type(4) {
		grid-area: six;
	}
	[data-side="6"] .dot:nth-of-type(5) {
		grid-area: seven;
	}
	[data-side="6"] .dot:nth-of-type(6) {
		grid-area: nine;
	}

	@media (min-width: 900px) {
		.dice {
			perspective: 1300px;
		}
	}
</style>
