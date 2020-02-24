<template>
	<Button transparent on:click="{() => modalWindowState = true}">
		Настройки
	</Button>

	<ModalWindow open="{modalWindowState}" on:close="{handleModalWindowClose}">
		<Container>
			<Margin top="30px" />
			<Heading size="2">Настройка схемы граббера</Heading>

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
		</Container>
	</ModalWindow>
</template>

<script>
	import Icon from "../../ui-elements/Icon.svelte";
	import Button from "../../ui-elements/Button.svelte";
	import ModalWindow from "../../ui-elements/ModalWindow.svelte";
	import Container from "../../ui-elements/Container.svelte";
	import Heading from "../../ui-elements/Heading.svelte";
	import Margin from "../../ui-elements/Margin.svelte";

	import Vendor from "./Vendor.svelte";
	import { onMount } from "svelte";
	import { getSchema, getFilesByStruct } from "../../api";
	import { getLocalSchema, saveLocalSchema, mergeSchemes } from "../../utils/localSchema";
	import { videos } from "../../stores/videos";

	let modalWindowState = false;
	let needUpdate = false;
	let schema;

	function handleModalWindowClose () {
		modalWindowState = false;

		if (needUpdate) {
			document.dispatchEvent(new CustomEvent("alert", {
				detail: {
					message: "Обновление списка файлов...",
					uniqueName: "afterUpdateSchema",
					isNeedCancel: true
				}
			}));

			getFilesByStruct(getLocalSchema())
					.then(responseFiles => {
						videos.save(responseFiles);


						document.dispatchEvent(new CustomEvent("alertCancel", {
							detail: {
								newMmessage: "Файлы успешно обновлены",
								uniqueName: "afterUpdateSchema"
							}
						}));

						if (!responseFiles.length) {
							document.dispatchEvent(new CustomEvent("alert", {
								detail: {
									message: "Кажется файлов нет, попробуй изменить схему в настройках",
									uniqueName: "filesIsEmpty"
								}
							}));
						}
					})
					.catch(error => {
						document.dispatchEvent(new Event("globalError"));
						console.log(error);
					});
		}
	}

	function handleToggleVendor (event) {
		const vendor = event.detail;

		schema = schema.map(schema => {
			return {
				...schema,
				expanded: schema.vendor === vendor ? !schema.expanded : schema.expanded
			}
		});

		needUpdate = true;
		saveLocalSchema(schema);
	}

	function handleToggleBoard (event) {
		const { vendor, board } = event.detail;

		schema = schema.map(schema => {
			if (schema.vendor === vendor) {
				schema.boards = schema.boards.map(schemaBoard => {
					return {
						...schemaBoard,
						disabled: schemaBoard.name === board ? !schemaBoard.disabled : schemaBoard.disabled
					};
				});
			}

			return schema;
		});

		needUpdate = true;
		saveLocalSchema(schema);
	}

	onMount(async () => {
		const serverSchema = await getSchema();
		const localSchema = getLocalSchema();

		schema = localSchema
				? mergeSchemes(serverSchema)
				: serverSchema;

		(!localSchema) && saveLocalSchema(serverSchema);
	});
</script>
