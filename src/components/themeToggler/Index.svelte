<button class="theme-toggler" aria-label="Изменить тему сайта" on:click={toggle}>
	{#if isNight}
		<svg  width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
			<g fill="none" style="stroke: var(--ancent-color)" stroke-miterlimit="10" stroke-width="30">
				<circle cx="255.899" cy="256.45" r="105.706"/>
				<path d="M255 58v57M56 256h58M399 256h57M255 397v57M355.034 159.118l40.77-40.77M355.034 356.186l40.77 40.77M109.989 396.956l40.77-40.77M109.989 118.348l40.77 40.77"/>
			</g>
		</svg>
	{:else}
		<svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
			<path
					d="M386 248.478c0 78.864-63.941 142.805-142.805 142.805-48.513 0-91.395-24.202-117.195-61.194 14.54 4.687 30.037 7.215 46.135 7.215 83.018 0 150.321-67.303 150.321-150.321 0-23.778-5.521-46.258-15.346-66.237C353.886 144.197 386 192.587 386 248.478z"
					fill="none"
					style="stroke: var(--ancent-color)"
					stroke-linecap="round"
					stroke-miterlimit="10"
					stroke-width="30"/>
		</svg>
	{/if}
</button>

<style lang="scss">
	.theme-toggler {
		width: 32px;
		height: 32px;
		margin: 0;
		padding: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;
		filter: opacity(70%);
		transition: 0.3s;
		display: flex;
		align-items: center;

		&:hover {
			filter: opacity(100%);
		}

		svg {
			width: 100%;
			height: 100%;
		}
	}
</style>

<script>
	let isNight = localStorage.isNightTheme !== undefined;
	if (isNight) document.body.classList.add('dark-theme');

	function toggle () {
		isNight = !isNight;

		if (isNight) {
			localStorage.setItem("isNightTheme", "true");
			document.body.classList.add('dark-theme');
		} else {
			localStorage.removeItem("isNightTheme");
			document.body.classList.remove('dark-theme');
		}
	}
</script>
