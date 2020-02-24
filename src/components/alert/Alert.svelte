<template>
	<div class="alert">
		{message}
	</div>
</template>

<script>
	export let message;
	export let isNeedCancel = false;
</script>

<style>
	.alert {
		border-radius: 4px;
		background-color: rgba(21, 244, 69, 0.68);
		color: #164221;
		padding: 10px 20px;
	}
</style>