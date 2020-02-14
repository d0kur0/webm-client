<script>
	export const type;
	export const isLoading = false;
</script>

<template>
	<button><slot/></button>
</template>

<style>
	button {
		margin: 0;
		padding: 0;
		border: none;
		color: var(--ancent-color);
	}
</style>
