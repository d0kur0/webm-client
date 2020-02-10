<svelte:body on:updateFiles={handleUpdateFiles}></svelte:body>

<div class="video-area">
	<VideoPlayer
					on:error={() => removeBadVideo() + nextVideo() }
					on:ended={nextVideo}
					on:previous={previousVideo}
					on:next={nextVideo}
					{video} />
</div>

<style>
	.video-area {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
</style>

<script>
	import VideoPlayer from "../videoPlayer/Index.svelte";
	import { getLocalSchema } from "../../utils/localSchema";
	import { onMount } from "svelte"
	import { getFilesByStruct } from "../../api";

	let cursor = 0;
	let files = [];
	let video;

	const removeBadVideo = () => {
		files = files.splice(cursor - 1, 1);
		console.log('remove');
	};

	const previousVideo = () => {
		if (cursor - 1 >= 0) {
			cursor -= 1;
			video = files[cursor];
		}
	};

	const nextVideo = () => {
		console.log('next');
		if (cursor + 1 <= files.length) {
			cursor += 1;
			video = files[cursor];
			console.log('next 2', cursor, video);
		}
	};

	const fetchFiles = async () => {
		files = await getFilesByStruct(getLocalSchema());
		video = files.shift();
	};

	const handleUpdateFiles = async () => await fetchFiles();

	onMount(async () => await fetchFiles());
</script>
