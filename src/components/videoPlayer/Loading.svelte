<template>
	<div class="loading">
		<Icon size="3.0em" name="spin" />
	</div>
</template>

<style>
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		z-index: 2;
		animation: rotate 1s linear infinite;
	}

	@keyframes rotate {
		to {
			transform: translate(-50%, -50%) rotate(359deg);
		}
	}
</style>

<script>
import Icon from "../../ui-elements/Icon.svelte";
</script>