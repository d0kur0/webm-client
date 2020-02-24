<template>
	<div class="progress-hack" style="width: 100%">
		{#if !$duration}
			<input
					disabled
					step="any"
					on:input={e => time.set(+e.target.value)}
					style="--min: 0; --max: 1; --val: 0"
					type="range"
					min="0"
					max="1"
					value="0">
		{:else}
			<input
					step="any"
					on:input={e => time.set(+e.target.value)}
					style="--min: 0; --max: {$duration}; --val: {$time}"
					type="range"
					min="0"
					max="{$duration}"
					value="{$time}">
		{/if}
	</div>
</template>

<script>
	import { time, duration } from "../../stores/player";
</script>

<style src="./styles/progress.css"></style>
