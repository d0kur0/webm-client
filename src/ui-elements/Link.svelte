<template>
	<a {...$$props}><slot/></a>
</template>

<style>
	a {
		color: var(--ancent-color);
		text-decoration: none;
	}

	a:visited {
		color: var(--ancent-color-dark)
	}

	a:focus {
		outline: none;
		color: var(--ancent-color-light);
		text-decoration: underline;
	}
</style>
