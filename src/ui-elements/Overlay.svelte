<script>

</script>

<template>
	<div class="overlay">
		<slot/>
	</div>
</template>

<style>
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		min-height: 100vh;
		background-color: var(--main-background);
	}
</style>
