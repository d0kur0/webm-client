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
					<Vendor
									on:toggleVendor={handleToggleVendor}
									on:toggleBoard={handleToggleBoard}
									{vendor}
									{boards}
									{expanded} />
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
	import { getLocalSchema, saveLocalSchema, mergeSchemes } from "../../utils/localSchema";

	let isOpen = false;
	let needUpdate = false;

	const dispatchUpdateFiles = () => {
		const event = new CustomEvent("updateFiles");
		document.body.dispatchEvent(event);
	};

	const showModalWindow = () => isOpen = true;

	const hideModalWindow = () => {
		isOpen = false;

		if (needUpdate) {
			dispatchUpdateFiles();
			needUpdate = false;
		}
	};

	const handleEscapeKey = e => {
		if (e.which === 27) {
			hideModalWindow();

			if (needUpdate) {
				dispatchUpdateFiles();
				needUpdate = false;
			}
		}
	};

	const handleToggleVendor = e => {
		schema = schema.map(v => {
			if (v.vendor === e.detail) v.expanded = !v.expanded;

			return v;
		});

		needUpdate = true;
		saveLocalSchema(schema);
	};

	const handleToggleBoard = e => {
		const { vendor, board } = e.detail;

		schema = schema.map(v => {
			if (v.vendor === vendor) {
				v.boards = v.boards.map(b => {
					if (b.name === board) b.disabled = !b.disabled;

					return b;
				});
			}

			return v;
		});

		needUpdate = true;
		saveLocalSchema(schema);
	};

	let schema;
	onMount(async () => {
		const serverSchema = await getSchema();
		const localSchema = getLocalSchema();

		schema = localSchema
				? mergeSchemes(serverSchema)
				: serverSchema;

		(!localSchema) && saveLocalSchema(serverSchema);
	});
</script>

<style lang="scss">
	@import "./styles/modalWindow.scss";
</style>
