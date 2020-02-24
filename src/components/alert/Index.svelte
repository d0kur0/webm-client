<template>
	<div class="alerts">
		{#each alerts as { message, isNeedCancel } }
			<Alert {isNeedCancel} {message} />
		{/each}
	</div>
</template>

<style>
	.alerts {
		width: 350px;
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 50;
	}
</style>

<script>
	import Alert from "./Alert.svelte";

	let alerts = [];

	document.addEventListener("alert", function (event) {
		/*
		* { message, isNeedCancel?, uniqueName } = event.details
		* */

		alerts = [...alerts.filter(alert => alert.uniqueName !== event.detail.uniqueName), event.detail];

		if (!event.detail.isNeedCancel) {
			setTimeout(() => alerts = alerts.filter(alert => alert.uniqueName !== event.detail.uniqueName), 5000);
		}
	});

	document.addEventListener("alertCancel", function (event) {
		const { newMessage, uniqueName } = event.detail;

		alerts = alerts.map(alert => {
			if (alert.uniqueName === uniqueName) {
				alert.message = newMessage;
			}

			return alert;
		});

		setTimeout(() => {
			alerts = alerts.filter(alert => alert.uniqueName !== uniqueName);
		}, 2000);
	});
</script>