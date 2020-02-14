<template>
	<div class="progress-hack">
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

<style lang="scss">
	@import "src/components/videoPlayer/styles/progress";
</style>
