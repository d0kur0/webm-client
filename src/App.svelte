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

<style lang="scss">
		main {
				height: 93vh;
		}

		header {
				padding: 0 20px;
				height: 7vh;
				display: flex;
				align-items: center;
				justify-content: space-between;
		}
</style>
