<Button aria-label="Изменить тему сайта" on:click={toggle}>
	<Icon size="" iconName="{isNight ? `sun` : `moon`}" />
</Button>

<script>
	import Icon from "../../ui-elements/Icon.svelte";
	import Button from "../../ui-elements/Button.svelte";

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
