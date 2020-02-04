<template>
	<div class="vendor">
		<label class="name checkbox">
			<input on:change={toggle} type="checkbox" name="vendors[]">
			<span>{vendor}</span>
		</label>

		<ul class="boards" class:expanded>

			{#each boards as { name, description }}
				<li>
					<label class="checkbox">
						<input type="checkbox" name="boards[{vendor}][]">
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
	export let expanded = false;
	export let boards;

	console.log(expanded)

	const toggle = () => expanded = !expanded;
</script>

<style lang="scss">
	@import "./styles/vendor.scss";
</style>
