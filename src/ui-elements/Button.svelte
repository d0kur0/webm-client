<script>
	export let rounded = false;
	export let transparent = false;
	export let ariaLabel = "";
</script>

<template>
	<button aria-label="{ariaLabel}" class:rounded class:transparent on:click on:focus><slot/></button>
</template>

<style>
	button {
		border: 3px solid transparent;
		margin: 0;
		color: var(--main-background);
		padding: 7px 12px;
		border-radius: 5px;
		background-color: var(--ancent-color-light);
		cursor: pointer;
		font: inherit;
		transition: 0.3s;
	}

	button:hover {
		filter: contrast(2.0);
	}

	button:focus {
		outline: none;
		border-color: var(--focused-color);
	}

	.transparent {
		padding: 7px 0;
		background-color: transparent;
		color: var(--ancent-color);
	}

	.transparent:hover {
		filter: invert(35%);
	}

	.transparent:focus {
		border-color: transparent;
		border-bottom-color: var(--focused-color);
	}

	.rounded {
		border-radius: 50%;
		padding: 0;
		height: 50px;
		width: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rounded:focus {
		border-color: var(--focused-color);
	}
</style>
