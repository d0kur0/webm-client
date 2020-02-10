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

<style lang="scss">
	@import "./styles/vendor.scss";
</style>
