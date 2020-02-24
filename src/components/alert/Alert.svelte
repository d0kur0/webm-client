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
		background-color: rgb(15, 167, 103);
		color: #164221;
		padding: 10px 20px;
	}
</style>