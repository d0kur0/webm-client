<svelte:body on:widescreen={onWideScreen}/>

<template>
  <div class="player progress-hack" bind:this={player}>
    <div class="player-container" on:mousemove={handleMouseMove} class:player-wide={isWide || isFullScreen}>
      <video
              src="https://2ch.hk/b/src/212736581/15806420021410.mp4"
              on:click={handlePlayPause}
              bind:currentTime={time}
              bind:duration
              bind:paused
              bind:volume
      ></video>

      <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
        <div class="controls-progress">
          <input
                  step="any"
                  on:input={handleProgressChange}
                  style="--min: 0; --max: {duration}; --val: {time}"
                  type="range"
                  min="0"
                  max="{duration}"
                  value="{time}">
        </div>

        <ul class="elements">
          <li>
            <button
                    on:click={handlePlayPause}
                    title={paused ? 'Начать просмотр' : 'Пауза'}
                    class={paused ? "button button-play" : "button button-pause"}
            ></button>
          </li>
          <li class="time">{format(time)} / {format(duration)}</li>
          <li class="divider"></li>
          <li class="sound">
            <input
                    on:input={handleInputVolume}
                    value={volume}
                    type="range"
                    min="0"
                    max="1"
                    style="--min: 0; --max: 1; --val: {volume}"
                    step="any">
            <button
                    on:click={handleDisableSound}
                    class="controls-sound button button-sound"
                    class:button-sound-disable={volume === 0}
                    title="Изменить громкость"></button>
          </li>
          <li>
            <button
                    on:click={handleFullScreen}
                    class="button button-fullScreen"
                    title={isFullScreen ? "Выйти из полноэкранного режима" : "Развернуть на весь экран"}></button>
          </li>
          <li>
            <button
                    class="button button-other"
                    title="Дополнительные возможности"></button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMount } from "svelte"

  let time = 0;
  let duration;
  let paused = true;
  let isWide = false;
  let volume = 0.5;
  let isDisableVolume = false;

  let player;
  let isFullScreen = false;

  let showControls = true;
  let showControlsTimeout;

  onMount(() => {
    volume = localStorage.volume || volume;
  });

  const handleInputVolume = e => {
    volume = +e.target.value;
    localStorage.volume = volume;
  };

  const handleDisableSound = e => {
    isDisableVolume = !isDisableVolume;
    volume = isDisableVolume ? 0 : localStorage.volume;
  };

  const handleFullScreen = () => {
    isFullScreen ? document.exitFullscreen() : player.requestFullscreen();
    isFullScreen = !isFullScreen;
  };

  const onWideScreen = e => isWide = e.detail;

  const handleProgressChange = e => time = +e.target.value;

  const handlePlayPause = () => paused = !paused;

  const handleMouseMove = e => {
      clearTimeout(showControlsTimeout);
      showControlsTimeout = setTimeout(() => showControls = false, 2500);
      showControls = true;
  };

  const handleMousedown = e => {
      function handleMouseup() {
          if (paused) e.target.play();
          else e.target.pause();
          cancel();
      }

      function cancel() {
          e.target.removeEventListener('mouseup', handleMouseup);
      }

      e.target.addEventListener('mouseup', handleMouseup);

      setTimeout(cancel, 200);
  };

  const format = seconds => {
      if (isNaN(seconds)) return '...';

      const minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      if (seconds < 10) seconds = '0' + seconds;

      return `${minutes}:${seconds}`;
  };
</script>

<style lang="scss">
  @import "./styles/player.scss";
  @import "./styles/progress.scss";
  @import "./styles/controls.scss";
  @import "./styles/controlsButton.scss";
</style>
