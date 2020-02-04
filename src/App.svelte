<script>
	import Disclaimer from "./components/Disclaimer.svelte";
	import VideoArea from "./components/VideoArea.svelte";
	import ThemeToggler from "./components/ThemeToggler.svelte";
	import Settings from "./components/settings/Index.svelte";
	import WideScreen from "./components/WideScreen.svelte"
</script>

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
