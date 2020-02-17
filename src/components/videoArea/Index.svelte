<template>
	<div class="page-wrapper">
		<header>
			<div class="padding">
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
				<VideoPlayer {video} />
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
		min-height: calc(100vh - 80px);
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

	import { getLocalSchema } from "../../utils/localSchema";
	import { onMount } from "svelte"
	import { getFilesByStruct } from "../../api";

	let files = [];
	let video;

	const fetchFiles = async () => {
		files = await getFilesByStruct(getLocalSchema());
		video = files.shift();
	};

	onMount(async () => await fetchFiles());
</script>
