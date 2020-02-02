<button on:click={wideScreen} class="reset-button">
    Wide Screen
</button>

<script>
    import { onMount } from "svelte";

    let isWide = localStorage.wideScreen !== undefined;

    const dispatchEvent = () => {
        const event = new CustomEvent("widescreen", { detail: isWide });
        document.body.dispatchEvent(event);
    };

    const wideScreen = () => {
        isWide = !isWide;
        isWide
            ? localStorage.setItem("wideScreen", "true")
            : localStorage.removeItem("wideScreen");

        dispatchEvent();
    };

    onMount(() => dispatchEvent());
</script>
