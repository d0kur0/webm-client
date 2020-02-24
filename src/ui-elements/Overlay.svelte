<template>
	<div class="overlay" style="--opacity: {opacity}">
		<slot/>
	</div>
</template>

<script>
	export let opacity = 1;
</script>

<style>
	.overlay {
		color: var(--ancent-color);
		z-index: 5;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		min-height: 100vh;
		background-color: var(--main-background);
		opacity: var(--opacity);
	}
</style>
