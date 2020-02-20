<template>
	<div class="progress-hack" style="width: 100%">
		<input
				step="any"
				on:input={e => time.set(+e.target.value)}
				style="--min: 0; --max: {$duration}; --val: {$time}"
				type="range"
				min="0"
				max="{$duration}"
				value="{$time}">
	</div>
</template>

<script>
	import { time, duration } from "../../stores/player";
</script>

<style src="./styles/progress.css"></style>
