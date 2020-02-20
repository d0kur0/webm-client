<template>
	<div class="vendor">
		<label class="name checkbox">
			<input checked="{!expanded ? 'checked' : ''}" on:change={() => toggleVendor(vendor)} type="checkbox">
			<span>{vendor}</span>
		</label>

		<ul class="boards" class:expanded>
			{#each boards as { name, description, disabled }}
				<li>
					<label class="checkbox">
							<input checked="{disabled ? 'checked' : ''}" on:change={() => toggleBoard(vendor, name)} type="checkbox">
						<span class="name">
							{name} <span class="description">({description})</span>
						</span>
					</label>
				</li>
			{/each}
		</ul>
	</div>
</template>

<script>
	export let vendor;
	export let boards;
	export let expanded;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const toggleVendor = (vendor) => dispatch("toggleVendor", vendor);
	const toggleBoard = (vendor, board) => dispatch("toggleBoard", { vendor, board });
</script>

<style>
	.vendor {
		user-select: none;
		margin-top: 25px;
	}

	.vendor .checkbox {
		cursor: pointer;
		display: block;
	}

	.vendor .checkbox input {
		display: none;
	}

	.vendor .checkbox span {
		font-size: 1.1em;
	}

	.vendor .checkbox input:checked ~ span {
		text-decoration: line-through;
		color: var(--ancent-color-light);
	}

	.vendor .name {
		padding: 10px 0;
	}

	.vendor .expanded {
		height: auto !important;
		overflow: unset !important;
	}

	.vendor .boards {
		height: 0;
		overflow: hidden;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.vendor .boards li {
		padding: 0;
		padding-left: 10px;
		margin: 0 0 0 10px;
		border-left: 1px solid var(--ancent-color-light);
	}

	.vendor .boards .name .description {
		color: var(--ancent-color-light);
	}
</style>
