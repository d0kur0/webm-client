<template>
  {#if !checked}
  <div class="container" transition:fade>
    <div class="content">
      <h1 class="header">Обратите внимание</h1>

      <p class="description">
        Весь контент на данном ресурсе взят с таких сайтов как: <a href="https://2ch.hk">2ch.hk</a>, <a href="https://4chan.org">4chan.org</a> и принадлежит его пользователям.
      </p>

      <p class="description">
        Некоторые из "досок" могут содержать в себе файлы для взрослых, рачленёнку и тому подобное.
        Хоть показываемые доски и можно настроить, это не исключает возможности просмотра возможно не самого приятного контента.
      </p>
      <p class="description">
        Если вам нет 18 лет или если вы слишком впечатлителен, то вам стоит покинуть сайт.
      </p>

      <button on:click={closeDisclaimer} class="continue-button">Перейти к сайту →</button>
    </div>
  </div>
  {/if}
</template>

<script>
  import { fade } from 'svelte/transition';

  let checked = localStorage.checkedDisclaimer !== undefined;

  function closeDisclaimer ()  {
    localStorage.checkedDisclaimer = true;
    checked = true;
  }
</script>

<style src="./styles/disclaimer.scss"></style>
