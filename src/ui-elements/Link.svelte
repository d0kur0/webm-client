<template>
	<a {...$$props}><slot/></a>
</template>

<style>
	a {
		color: var(--ancent-color);
		text-decoration: none;
		border-bottom: 2px solid transparent;
	}

	a:visited {
		color: var(--ancent-color-dark)
	}

	a:focus {
		outline: none;
		color: var(--ancent-color-light);
		border-color: var(--focused-color);
	}
</style>
