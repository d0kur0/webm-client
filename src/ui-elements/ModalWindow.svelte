<svelte:body on:keydown={handleEscapeKey}></svelte:body>

<template>
	<div class="modal-window" class:modal-window--visible="{open}">
		<Overlay>
			<span class="close-button">
				<Button transparent rounded>
					<Icon size="20px" name="cancel" />
				</Button>
			</span>

			<slot />
		</Overlay>
	</div>
</template>

<script>
	import Icon from "./Icon.svelte";
	import Button from "./Button.svelte";
	import Overlay from "./Overlay.svelte";

	export let open = false;

	function handleEscapeKey (event) {
		if (event.key === "Escape") {
			open = false;
		}
	}
</script>

<style>
	.close-button {
		position: absolute;
		top: 20px;
		right: 20px;
	}

	.modal-window {
		display: none;
	}

	.modal-window--visible {
		display: block;
	}
</style>
