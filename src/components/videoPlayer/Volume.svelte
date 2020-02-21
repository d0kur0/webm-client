<template>
	<div class="progress-hack" style="display: flex; align-items: center">
		<span style="margin-top: -3px;">
			<Button transparent on:click={volume.toggleVolume} title="Изменить громкость">
				<Icon name="{$volume.value >= 0.5 ? `volume` : $volume.value === 0 ? `volume-off` : `volume-down`}" />
			</Button>
		</span>

		<input
				on:input={e => volume.input(+e.target.value)}
				value={$volume.value}
				type="range"
				min="0"
				max="1"
				style="--min: 0; --max: 1; --val: {$volume.value}"
				step="any">
	</div>
</template>

<script>
	import Button from "../../ui-elements/Button.svelte";
	import Icon from "../../ui-elements/Icon.svelte";
	import { volume } from "../../stores/player";
</script>

<style src="./styles/progress.css"></style>