<template>
	<div class="page-wrapper">
		<header>
			<div style="padding-right: 15px;">
				<Settings />
			</div>

			<div class="padding">
				<WideScreen />
			</div>

			<div class="pull-right">
				<ThemeToggler />
			</div>
		</header>

		<main>
			<div class="video-area">
				<VideoPlayer />
			</div>
		</main>
	</div>
</template>

<style>
	header {
		padding: 0 20px;
		height: 80px;
		display: flex;
		align-items: center;
	}


	.pull-right {
		margin-left: auto;
	}

	main {
		height: calc(100vh - 80px);
	}

	.page-wrapper {
		background-color: var(--main-background);
	}

	.video-area {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
</style>

<script>
	import VideoPlayer from "../videoPlayer/Index.svelte";
	import ThemeToggler from "../themeToggler/Index.svelte";
	import WideScreen from "../wideScreen/Index.svelte";
	import Settings from "../settings/Index.svelte";
</script>
