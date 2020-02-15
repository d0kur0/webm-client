<script>
	export let top = "0px";
	export let left = "0px";
	export let right = "0px";
	export let bottom = "0px";
</script>

<template>
	<div style="--margin: {top} {right} {bottom} {left}">
		<slot/>
	</div>
</template>

<style>
	div {
		margin: var(--margin);
	}
</style>
