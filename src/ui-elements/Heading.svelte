<script>
	export let size = 1;
</script>

<template>
	{#if +size === 1}
		<h1><slot/></h1>
	{:else if +size === 2}
		<h2><slot/></h2>
	{:else if +size === 3}
		<h3><slot/></h3>
	{:else if +size === 4}
		<h4><slot/></h4>
	{:else if +size === 5}
		<h5><slot/></h5>
	{:else if +size === 6}
		<h6><slot/></h6>
	{/if}
</template>

<style>
	h1, h2, h3, h4, h5, h6 {
		color: var(--ancent-color);
	}
</style>
