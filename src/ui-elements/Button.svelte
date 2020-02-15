<script>
	export let type;
	export let rounded = false;
	export let transparent;
</script>

<template>
	<button on:click on:focus><slot/></button>
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
</style>
