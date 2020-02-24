<template>
	{#if error}
		<ErrorOverlay />
	{/if}

	<div class="player" bind:this={$UI.playerContainer}>
		<div
				autofocus
				tabindex="0"
				class="player-container"
				class:player-wide={$UI.isWide || $UI.isFullScreen}
				on:mousemove={UI.toggleControls}
				on:keydown={event => handleHotKeysOnContainer(event) + UI.toggleControls()}
				on:mouseleave={() => $UI.showControls = false}>

			{#if $videos.currentVideo}
				<video
						src="{$videos.currentVideo.path}"
						autoplay
						on:click="{paused.toggle}"
						bind:paused="{$paused}"
						bind:volume="{$volume.value}"
						bind:duration="{$duration}"
						bind:currentTime="{$time}"
						on:playing="{() => loading = false}"
						on:error="{videos.next}"
						on:ended="{videos.next}"
						on:waiting="{() => loading = true}"
						on:loadstart="{() => loading = true}"
				>
				</video>
			{/if}

			{#if loading}
				<Loading />
			{/if}

			<Info />
			<Controls />
		</div>
	</div>
</template>

<script>
	import Controls from "./Controls.svelte";
	import Info from "./Info.svelte";
	import ErrorOverlay from "./ErrorOverlay.svelte";
	import Loading from "./Loading.svelte";
	import { time, paused, duration, volume, UI } from "../../stores/player";
	import { videos } from "../../stores/videos";
	import { getLocalSchema } from "../../utils/localSchema";
	import { onMount } from "svelte"
	import { getFilesByStruct } from "../../api";

	document.addEventListener("fullscreenchange", function () {
		$UI.isFullScreen = Boolean(document.fullscreenElement);
	});

	function handleHotKeysOnContainer (event) {
		if (!event.target.classList.contains("player-container")) return;

		(event.code === "ArrowRight") && time.rewindRight();
		(event.code === "ArrowLeft")  && time.rewindLeft();
		(event.code === "Space")      && paused.toggle();
		(event.code === "ArrowUp")    && volume.increment();
		(event.code === "ArrowDown")  && volume.decrement();
	}

	let loading = true;
	let error = false;

	document.addEventListener("globalError", () => error = true);

	onMount(() => {
		getFilesByStruct(getLocalSchema())
			.then(responseFiles => videos.save(responseFiles))
			.catch(() => document.dispatchEvent(new Event("globalError")));
	});
</script>

<style src="./styles/player.css"></style>
