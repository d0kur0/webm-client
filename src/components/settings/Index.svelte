<template>
	<button on:click={showModalWindow} class="reset-button">
		Настройки
	</button>

	<div class="modal-window" class:modal-window-visibly={isOpen}>
		<button class="reset-button">
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--ancent-color)" d="M77.6 21.1l-28 28.1-28.1-28.1-1.9 1.9 28 28.1-28 28.1 1.9 1.9L49.6 53l28 28.1 2-1.9-28.1-28.1L79.6 23z"/></svg>
		</button>

		<div class="container">

		</div>
	</div>
</template>

<script>
	import { onMount } from "svelte";
	import { getSchema } from "../api";

	let isOpen = false;
	const showModalWindow = () => isOpen = !isOpen;

	let schema = {};

	onMount(() => {
		getSchema().then(res => schema = res);
	});
</script>

<style lang="scss">
	.modal-window {
		position: absolute;
		clip: rect(0 0 0 0);
		width: 1px;
		height: 1px;
		margin: -1px;

		.reset-button {
			position: absolute;
			right: 20px;
			top: 20px;
			width: 45px;
			height: 45px;
			display: flex;
			align-items: center;
			justify-content: center;

			svg {
				width: 100%;
				height: 100%;
			}
		}
	}

	.modal-window-visibly {
		clip: unset;
		top: 0;
		left: 0;
		width: 100vw;
		min-height: 100vh;
		margin: auto;
		background-color: var(--main-background);
		z-index: 10;
	}
</style>
