<script>
	import Disclaimer from "./components/disclaimer/Index.svelte";
	import VideoArea from "./components/videoArea/Index.svelte";
	import Alerts from "./components/alert/Index.svelte";

	const isNeededDisclaimer = localStorage.checkedDisclaimer === undefined;
</script>

<template>
	{#if isNeededDisclaimer}
		<Disclaimer/>
	{/if}

	<Alerts />
	<VideoArea />
</template>

<style src="./ui-elements/basedStyles.css"></style>
