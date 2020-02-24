<template>
	<div class="progress-hack" style="display: flex; align-items: center">
		<span>
			<Button disabled="{!$duration}" transparent on:click={volume.toggleVolume} title="Изменить громкость">
				<Icon name="{$volume.value >= 0.5 ? `volume` : $volume.value === 0 ? `volume-off` : `volume-down`}" />
			</Button>
		</span>

		<input
				disabled="{!$duration && `disabled`}"
				on:input="{e => volume.input(+e.target.value)}"
				type="range"
				min="0"
				max="1"
				value="{$duration ? $volume.value : 0}"
				style="--min: 0; --max: 1; --val: {$duration ? $volume.value : 0}"
				step="0.1">
	</div>
</template>

<script>
	import Button from "../../ui-elements/Button.svelte";
	import Icon from "../../ui-elements/Icon.svelte";
	import { volume, duration } from "../../stores/player";
</script>

<style src="./styles/progress.css"></style>