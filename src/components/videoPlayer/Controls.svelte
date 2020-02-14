<template>
	<div class="controls" class:controls-visible={$duration && $UI.showControls}>
		<div class="controls-progress">
			<Progress  />
		</div>

		<ul class="elements">
			<li>
				<button
						on:click={handlePreviousVideo}
						title="Предыдущее видео"
						class="button button-previous">
				</button>
			</li>
			<li>
				<button
						on:click={paused.toggle}
						title={$paused ? 'Начать просмотр' : 'Пауза'}
						class={$paused ? "button button-play" : "button button-pause"}>
				</button>
			</li>
			<li>
				<button
						on:click={handleNextVideo}
						title="Следующее видео" class="button button-next">
				</button>
			</li>
			<li class="time">{format($time)} / {format($duration)}</li>
			<li class="divider"></li>
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

<style lang="scss">
	@import "./styles/controls.scss";
	@import "./styles/controlsButton.scss";
	@import "src/components/videoPlayer/styles/progress";
</style>
