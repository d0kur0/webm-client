<template>
  <Overlay bind:this={overlayElement}>
    <Container maxWidth="700px" alignItems="center" justifyContent="center" fill>
      <div class="theme-toggler">
        <ThemeToggler />
      </div>

      <Heading size="1">Обратите внимание</Heading>

      <Paragraph>
        Весь контент на данном ресурсе взят с таких сайтов как: <Link href="https://2ch.hk">2ch.hk</Link>, <Link href="https://4chan.org">4chan.org</Link> и принадлежит его пользователям.
      </Paragraph>

      <Paragraph>
        Некоторые из "досок" могут содержать в себе файлы для взрослых, рачленёнку и тому подобное.
        Хоть показываемые доски и можно настроить, это не исключает возможности просмотра не самого приятного контента.
      </Paragraph>

      <Paragraph>
        Если вам нет 18 лет или если вы слишком впечатлителен, то вам стоит покинуть сайт.
      </Paragraph>

      <Margin top="25px">
        <Button transparent on:click={closeDisclaimer}>Перейти к сайту →</Button>
      </Margin>
    </Container>
  </Overlay>
</template>

<script>
  import Overlay from "../../ui-elements/Overlay.svelte";
  import Container from "../../ui-elements/Container.svelte";
  import Paragraph from "../../ui-elements/Paragraph.svelte";
  import Heading from "../../ui-elements/Heading.svelte";
  import Button from "../../ui-elements/Button.svelte";
  import Margin from "../../ui-elements/Margin.svelte";
  import Link from "../../ui-elements/Link.svelte";

  import { fade } from 'svelte/transition';
  import ThemeToggler from '../themeToggler/Index.svelte';

  let overlayElement;
  function closeDisclaimer ()  {
    localStorage.checkedDisclaimer = true;
    overlayElement && overlayElement.$destroy();
  }
</script>

<style>
  .theme-toggler {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
