<svelte:body on:keydown={handleEscapeKey}></svelte:body>

<template>
	<Button transparent on:click={showModalWindow}>
		Настройки
	</Button>

	<Overlay>
		<span class="close-button">
			<Button transparent rounded>
				<Icon size="20px" name="cancel" />
			</Button>
		</span>

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
	</Overlay>
</template>

<script>
	import Icon from "../../ui-elements/Icon.svelte";
	import Button from "../../ui-elements/Button.svelte";
	import Overlay from "../../ui-elements/Overlay.svelte";
	import Container from "../../ui-elements/Container.svelte";
	import Heading from "../../ui-elements/Heading.svelte";

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

<style>
	.close-button {
		position: absolute;
		top: 20px;
		right: 20px;
	}
</style>
