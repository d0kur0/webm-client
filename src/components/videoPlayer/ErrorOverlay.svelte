<template>
		<Overlay>
			<div class="wrapper">
				<Container maxWidth="800px">
					<Heading>Ох... Что-то не так!</Heading>

					<Paragraph>
						При попытке загрузить список файлов с сервера вышла ошибка, ничего не могу с этим поделать.
						Но разработчик уже знает об этом и наверное в скором времени всё исправит!
					</Paragraph>

					<div class="error-girl"></div>
				</Container>
			</div>
		</Overlay>
</template>

<script>
	import Heading from "../../ui-elements/Heading.svelte";
	import Container from "../../ui-elements/Container.svelte";
	import Overlay from "../../ui-elements/Overlay.svelte";
	import Paragraph from "../../ui-elements/Paragraph.svelte";
</script>

<style>
	.wrapper {
		position: relative;
	}

	.error-girl {
		background-image: url("../images/grab-girl.png");
		background-repeat: no-repeat;
		background-size: contain;
		position: absolute;
		top: 0;
		right: 0;
		width: 40vw;
		height: 60vh;
		filter: contrast(1.5) opacity(0.1);
	}
</style>