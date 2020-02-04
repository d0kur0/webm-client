<svelte:body on:keydown={handleEscapeKey}></svelte:body>

<template>
	<button on:click={showModalWindow} class="reset-button">
		Настройки
	</button>

	<div class="modal-window" class:modal-window-visibly={isOpen}>
		<button on:click={hideModalWindow} class="reset-button">
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--ancent-color)" d="M77.6 21.1l-28 28.1-28.1-28.1-1.9 1.9 28 28.1-28 28.1 1.9 1.9L49.6 53l28 28.1 2-1.9-28.1-28.1L79.6 23z"/></svg>
		</button>

		<div class="container">
			<h2>Настройка схемы граббера</h2>

			{#if schema}
				{#each schema as { vendor, boards, expanded }}
					<Vendor vendor={vendor} boards={boards} expanded={expanded} />
				{/each}
			{:else}
				Загрузка данных...
			{/if}
		</div>
	</div>
</template>

<script>
	import Vendor from "./Vendor.svelte";
	import { onMount } from "svelte";
	import { getSchema } from "../../api";

	let isOpen = true;
	const showModalWindow = () => isOpen = true;
	const hideModalWindow = () => isOpen = false;
	const handleEscapeKey = (e) => (e.which === 27) && hideModalWindow();

	let schema;
	onMount(() => {
		getSchema().then(res => {
			const serverSchema = Object.entries(res.data).map(function (vendor) {
				const boards = vendor[1].map(function (board) {
					board.disabled = false;
					return board;
				});

				return {
					vendor: vendor[0],
					expanded: true,
					boards: boards
				}
			});

			let schemaSettings = localStorage.schemaSettings;
			if (!schemaSettings) schema = serverSchema;

			try {
				schemaSettings = JSON.parse(schemaSettings);
			} catch  {
				schema = serverSchema;
			}

		});
	});
</script>

<style lang="scss">
	@import "./styles/modalWindow.scss";
</style>
