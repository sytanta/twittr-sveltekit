<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import Trending from '$lib/components/Trending.svelte';
</script>

<div class="container">
	<Navigation />
	<main class="feed">
		<slot />
	</main>
	<Trending />
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: min-content 50ch;
		height: 100vh;
		margin: 0 auto;
		max-width: min-content;
	}

	.feed {
		border: 1px solid var(--color-border-primary);
		border-bottom: none;
		border-top: none;
	}

	@media (min-width: 1024px) {
		.container {
			grid-template-columns: 1fr 50ch 1fr;
			margin: 0 auto;
			max-width: 1240px;
		}
	}
</style>
