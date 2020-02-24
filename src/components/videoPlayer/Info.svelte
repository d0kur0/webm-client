<template>
	{#if $videos.currentVideo}
		<div class="info" class:info-visible={$UI.showControls}>
			<div title="{$videos.currentVideo.name}" class="info-element">{name}{extension}</div>
			<a target="_blank" href="{sourceLink}" class="info-element">{$videos.currentVideo.vendor} source thread</a>
			<div class="info-divider"></div>
			<div class="info-element">{$videos.index} / {$videos.files.length}</div>
		</div>
	{/if}
</template>

<script>
	import { videos } from "../../stores/videos";
	import { UI } from "../../stores/player";

	let name;
	let extension;

	$: {
		if ($videos.currentVideo) {
			const MAX_ALLOWED_LENGTH = 15;
			[ name, extension ] = $videos.currentVideo.name.split(".");
			name = name.length <= MAX_ALLOWED_LENGTH ? name : name.slice(0, MAX_ALLOWED_LENGTH) + "...";
			extension = extension ? name.length !== $videos.currentVideo.length ? `.${extension}` : extension : "";
		}
	}

	let sourceLink;
	$: {
		if ($videos.currentVideo) {
			const domain = $videos.currentVideo.vendor === "4chan"
					? "https://boards.4channel.org/"
					: "https://2ch.hk/";

			const threadLink = $videos.currentVideo.vendor === "4chan"
					? `${$videos.currentVideo.board}/thread/${$videos.currentVideo.threadId}`
					: `${$videos.currentVideo.board}/res/${$videos.currentVideo.threadId}.html`;

			sourceLink = domain + threadLink;
		}
	}
</script>

<style src="./styles/info.css"></style>