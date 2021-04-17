<div>
	<div class="dot" />
	<div class="dot" />
	<div class="dot" />
</div>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		cursor: pointer;
		&:hover {
			.dot {
				&:nth-child(1) {
					transform: translateX(2px) scale(1.3);
				}
				&:nth-child(2) {
					transform: scale(1.3);
				}
				&:nth-child(3) {
					transform: translateX(-2px) scale(1.3);
				}
			}
		}
	}
	.dot {
		width: 5px;
		height: 5px;
		border-radius: 5px;
		background: #c4c4c4;
		transition: transform ease 0.3s;
		&:not(:last-child) {
			margin-right: 7px;
		}
	}
</style>
