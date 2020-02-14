<script>
	import Disclaimer from "./components/disclaimer/Index.svelte";
	import VideoArea from "./components/videoArea/Index.svelte";
	import ThemeToggler from "./components/themeToggler/Index.svelte";
	import Settings from "./components/settings/Index.svelte";
	import WideScreen from "./components/wideScreen/Index.svelte"
</script>

<template>
		<Disclaimer />

	<header>
		<div>
			<Settings />
			<WideScreen />
		</div>
		<ThemeToggler />
	</header>
	<main>
		<VideoArea />
	</main>
</template>

<style global>
		body {
        --main-background: #fafafa;
        --main-background-dark: #343434;

        --ancent-color: #1a1a1a;
        --ancent-color-light: #353535;
        --ancent-color-dark: #000;

        --text-shadow-color: #d8d8d8;
    }

    body.dark-theme {
        --main-background: #151515;
        --main-background-dark: #010101;

        --ancent-color: #d7d7d7;
        --ancent-color-light: #adadad;
        --ancent-color-dark: #989898;

        --text-shadow-color: #5c5c5c;
    }
</style>
