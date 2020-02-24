<Button transparent rounded ariaLabel="Изменить тему сайта" on:click={toggle}>
	<Icon size="20px" name="{isNight ? `sun` : `moon`}" />
</Button>

<script>
	import Icon from "../../ui-elements/Icon.svelte";
	import Button from "../../ui-elements/Button.svelte";

	let isNight = localStorage.isNightTheme !== undefined;

	isNight
		&& document.body.classList.add('dark-theme');

	!isNight
		&& window.matchMedia("(prefers-color-scheme: dark)").matches
		&& document.body.classList.add('dark-theme');


	let timeout;

	function toggle () {
		isNight = !isNight;

		if (!timeout) {
			document.body.classList.add("transition");

			const TRANSITION_TIME = 1000;
			const clearTransition = () => {
				document.body.classList.remove("transition");
				timeout = clearTimeout(timeout);
			};

			timeout = setTimeout(clearTransition, TRANSITION_TIME);
		}

		if (isNight) {
			localStorage.setItem("isNightTheme", "true");
			document.body.classList.add('dark-theme');
		} else {
			localStorage.removeItem("isNightTheme");
			document.body.classList.remove('dark-theme');
		}
	}
</script>
