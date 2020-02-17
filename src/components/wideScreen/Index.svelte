<template>
    <Button on:click={wideScreen} transparent>
        {isWide ? "Свернуть окно видео" : "Растянуть окно видео"}
    </Button>
</template>

<script>
    import Button from "../../ui-elements/Button.svelte";
    import { onMount } from "svelte";
    import { UI } from "../../stores/player";

    let isWide = localStorage.wideScreen !== undefined;

    const wideScreen = () => {
        isWide = !isWide;

        isWide
            ? localStorage.setItem("wideScreen", "true")
            : localStorage.removeItem("wideScreen");

        $UI.isWide = isWide;
    };

    onMount(() => $UI.isWide = isWide);
</script>
