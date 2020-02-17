<script>
	export let alignItems = "normal";
	export let justifyContent = "normal";
	export let maxWidth = "1200px";
	export let fill = false;
</script>

<template>
	<div
			class="container"
			class:container--fill="{fill}"
			style="--align-items: {alignItems}; --justify-content: {justifyContent}; --max-width: {maxWidth}">
		<div class="container__content">
			<slot/>
		</div>
	</div>
</template>

<style>
	.container {
		max-width: var(--max-width);
		padding: 0 20px;
		margin: auto;
		display: flex;
		align-items: var(--align-items);
		justify-content: var(--justify-content)
	}

	.container--fill {
		min-height: 100vh;
	}
</style>

