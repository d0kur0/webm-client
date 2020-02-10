{#if !checked}
<div class="disclaimer" transition:fade>
  <div class="disclaimer__content">
    <h1 class="disclaimer__header">Обратите внимание</h1>
    <p class="disclaimer__description">
      Весь контент на данном ресурсе взят с таких сайтов как: <a href="https://2ch.hk">2ch.hk</a>, <a href="https://4chan.org">4chan.org</a> и принадлежит его пользователям.
    </p>
    <p class="disclaimer__description">
      Некоторые из "досок" могут содержать в себе файлы для взрослых, рачленёнку и тому подобное, если вам нет 18 лет или если вы слишком впечатлителен, то вам стоит покинуть сайт.
    </p>

    <button on:click={closeDisclaimer} class="disclaimer__continue">Перейти к сайту →</button>
  </div>
</div>
{/if}

<script>
  import { fade } from 'svelte/transition';

  let checked = localStorage.checkedDisclaimer !== undefined;

  function closeDisclaimer ()  {
    localStorage.checkedDisclaimer = true;
    checked = true;
  }
</script>

<style>
  .disclaimer {
    background-color: var(--main-background);
    z-index: 1;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
  }

  .disclaimer__content {
    max-width: 600px;
    width: 100%;
    padding: 0 15px;
    margin: auto;
  }

  .disclaimer__header {
    color: var(--ancent-color-light);
    margin: 0;
    padding: 10px 0;
    text-shadow: 1px 1px 1px var(--text-shadow-color);
  }

  .disclaimer__description {
    font-size: 1.1em;
    color: var(--ancent-color-light);
    text-shadow: 1px 1px 1px var(--text-shadow-color);
  }

  .disclaimer__continue {
    font: inherit;
    font-size: 1.2em;
    cursor: pointer;
    padding: 1px 0;
    margin: 0;
    margin-top: 15px;
    border: none;
    background-color: transparent;
    color: var(--ancent-color-light);
  }

  .disclaimer__continue:active {
    background-color: transparent;
  }

  .disclaimer__continue:hover {
    color: var(--ancent-color-dark);
  }
</style>