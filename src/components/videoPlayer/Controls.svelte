<template>
	<div class="controls-visible controls" class:controls-visible={$duration && $UI.showControls}>
		<ul class="elements">
			<li>
				<Button transparent on:click={videos.previous} title="Предыдущее видео">
					<Icon name="rewind" />
				</Button>
			</li>
			<li>
				<Button transparent on:click="{paused.toggle}" title="{$paused ? `Начать просмотр` : `Поставить на паузу`}">
					<Icon name="{$paused ? `play` : `pause`}" />
				</Button>
			</li>
			<li>
				<Button transparent on:click={videos.next} title="Следующее видео">
					<Icon name="fast-fw" />
				</Button>
			</li>
		</ul>

		<div class="controls-progress">
			<Progress  />
		</div>

		<ul class="elements">
			<li class="time">{format($time)} / {format($duration)}</li>
			<li class="sound">
				<Volume />
			</li>
			<li>
				<Button transparent on:click={UI.toggleFullScreen} title={$UI.isFullScreen ? "Выйти из полноэкранного режима" : "Развернуть на весь экран"}>
					<Icon name="resize-full-alt" />
				</Button>
			</li>
		</ul>
	</div>
</template>

<script>
	import Button from "../../ui-elements/Button.svelte";
	import Icon from "../../ui-elements/Icon.svelte";
	import Progress from "./Progress.svelte";
	import Volume from "./Volume.svelte";
	import { videos } from "../../stores/videos";
	import { time, paused, duration, volume, UI } from "../../stores/player";

	function format (seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}
</script>

<style src="./styles/controls.css"></style>
