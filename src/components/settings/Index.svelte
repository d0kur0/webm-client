<template>
	<Button transparent on:click="{() => modalWindowState = true}">
		Настройки
	</Button>

	<ModalWindow open="{modalWindowState}">
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

<style>

</style>
