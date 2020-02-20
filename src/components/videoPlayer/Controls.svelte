<template>
	<div class="controls-visible controls" class:controls-visible={$duration && $UI.showControls}>
		<ul class="elements">
			<li>
				<Button transparent on:click={handlePreviousVideo} title="Предыдущее видео">
					<Icon name="rewind" />
				</Button>
			</li>
			<li>
				<Button transparent on:click="{paused.toggle}" title="{$paused ? `Начать просмотр` : `Поставить на паузу`}">
					<Icon name="{$paused ? `play` : `pause`}" />
				</Button>
			</li>
			<li>
				<Button transparent on:click={handleNextVideo} title="Следующее видео">
					<Icon name="fast-fw" />
				</Button>
			</li>
		</ul>

		<div class="controls-progress">
			<Progress  />
		</div>

		<ul class="elements">
			<li class="time">{format($time)} / {format($duration)}</li>
			<li class="sound progress-hack">
				<input
						on:input={e => volume.input(+e.target.value)}
						value={$volume.value}
						type="range"
						min="0"
						max="1"
						style="--min: 0; --max: 1; --val: {$volume.value}"
						step="any">
				<button
						on:click={volume.toggleVolume}
						class="controls-sound button button-sound"
						class:button-sound-disable={!$volume.value}
						title="Изменить громкость"></button>
			</li>
			<li>
				<button
					on:click={UI.toggleFullScreen}
					class="button button-fullScreen"
					title={$UI.isFullScreen ? "Выйти из полноэкранного режима" : "Развернуть на весь экран"}>
				</button>
			</li>
			<li>
				<button class="button button-other" title="Дополнительные возможности"></button>
			</li>
		</ul>
	</div>
</template>

<script>
	import Button from "../../ui-elements/Button.svelte";
	import Icon from "../../ui-elements/Icon.svelte";
	import Progress from "./Progress.svelte";
	import { time, paused, duration, volume, UI } from "../../stores/player";

	function format (seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}

	function handlePreviousVideo () {

	}

	function handleNextVideo () {

	}
</script>

<style src="./styles/controls.css"></style>
