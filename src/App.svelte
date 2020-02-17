<script>
	import Disclaimer from "./components/disclaimer/Index.svelte";
	import VideoArea from "./components/videoArea/Index.svelte";

	const isNeededDisclaimer = localStorage.checkedDisclaimer === undefined;
</script>

<template>
	{#if isNeededDisclaimer}
		<Disclaimer/>
	{/if}

	<VideoArea />
</template>

<style src="./ui-elements/basedStyles.css"></style>
