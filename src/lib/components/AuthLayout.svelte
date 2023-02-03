<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Twittr</title>
</svelte:head>

<main
	class="container"
	in:fly={{ x: -100, duration: 250, delay: 300 }}
	out:fly={{ x: -100, duration: 250 }}
>
	<section class="hero">
		<h1 class="title">Twittr 🐦️</h1>
		<p class="text">Share your hot take with everyone.</p>
	</section>

	<section class="content">
		<slot />
	</section>
</main>

<style>
	.container {
		display: grid;
		height: 100vh;
	}

	.hero {
		background-color: var(--color-brand);
		display: grid;
		place-content: center;
		text-align: center;
	}

	.content {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.title {
		font-size: var(--font-80);
		z-index: 2;
	}

	.text {
		background: var(--color-bg-primary);
		font-size: var(--font-24);
		font-weight: bold;
		padding: var(--spacing-16);
		transform: rotate(2deg) translateY(-40%);
		z-index: 1;
	}

	@media (min-width: 1024px) {
		.container {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
