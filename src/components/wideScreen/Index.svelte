<template>
    <button on:click={wideScreen} class="reset-button">
        {isWide ? "Свернуть окно видео" : "Растянуть окно видео"}
    </button>
</template>

<script>
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
