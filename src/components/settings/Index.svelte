<template>
	<Button transparent on:click="{() => modalWindowState = true}">
		Настройки
	</Button>

	<ModalWindow open="{modalWindowState}" on:close="{handleModalWindowClose}">
		<Container>
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

	import Vendor from "./Vendor.svelte";
	import { onMount } from "svelte";
	import { getSchema } from "../../api";
	import { getLocalSchema, saveLocalSchema, mergeSchemes } from "../../utils/localSchema";

	let modalWindowState = false;
	let needUpdate = false;
	let schema;

	function handleModalWindowClose () {
		modalWindowState = false;
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
