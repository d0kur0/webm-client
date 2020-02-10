<template>
  <div class="player" bind:this={$UI.playerContainer}>
    <div
            tabindex="0"
            class="player-container"
            class:player-wide={$UI.isWide || $UI.isFullScreen}
            on:mousemove={UI.toggleControls}
            on:keydown={(event) => handleHotKeysOnContainer(event) + UI.toggleControls()}>
      <video
              src="https://2ch.hk/b/src/213126903/15810662809650.mp4"
              on:click={paused.toggle}
              bind:paused={$paused}
              bind:volume={$volume.value}
              bind:duration={$duration}
              bind:currentTime={$time}
      >
      </video>

      <Controls />
    </div>
  </div>
</template>

<script>
  import Controls from "./Controls.svelte";
  import { time, paused, duration, volume, UI } from "../../stores/player";

  document.addEventListener("fullscreenchange", function () {
    $UI.isFullScreen = Boolean(document.fullscreenElement);
  });

  function handleHotKeysOnContainer (event) {
    if (!event.target.classList.contains("player-container")) return;

    (event.which === 39) && time.rewindRight();
    (event.which === 37) && time.rewindLeft();
    (event.which === 32) && paused.toggle();
    (event.which === 38) && volume.increment();
    (event.which === 40) && volume.decrement();
  }
</script>

<style lang="scss">
  @import "./styles/player.scss";
</style>
