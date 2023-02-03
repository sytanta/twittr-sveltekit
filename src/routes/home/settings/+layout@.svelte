<script lang="ts">
	import { page } from '$app/stores';

	import Navigation from '$lib/components/Navigation.svelte';

	$: path = $page.url.pathname;
</script>

<div class="container">
	<Navigation />

	<main class="settings">
		<h1 class="title">Settings</h1>

		<section class="privacy">
			<h2>Privacy</h2>
			<a
				class:active={path === '/home/settings/personalization'}
				href="/home/settings/personalization"
			>
				Personalization and data
			</a>

			<a class:active={path === '/home/settings/data'} href="/home/settings/data">
				Your Twittr data
			</a>

			<a class:active={path === '/home/settings/cookies'} href="/home/settings/cookies">
				Cookie preferences
			</a>
		</section>

		<section class="general">
			<h2>General</h2>
			<a class:active={path === '/home/settings/resources'} href="/home/settings/resources">
				Additional resources
			</a>
		</section>
	</main>

	<aside>
		<slot />
	</aside>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: min-content 50ch;
		height: 100vh;
		margin: 0 auto;
		max-width: min-content;
	}

	.settings {
		border: 1px solid var(--color-border-primary);
		border-bottom: none;
		border-top: none;
		display: grid;
		gap: var(--spacing-24);
		grid-auto-rows: min-content;
	}

	.privacy,
	.general {
		display: grid;
	}

	h1 {
		font-size: var(--font-18);
		margin-top: var(--spacing-24);
		padding: 0 var(--spacing-16);
	}

	h2 {
		font-size: var(--font-24);
		padding: 0 var(--spacing-16);
	}

	h2 {
		margin-bottom: var(--spacing-16);
	}

	a {
		padding: 1.4rem var(--spacing-16);
	}

	.active {
		background: var(--color-link-hover);
	}

	aside {
		display: none;
		padding: var(--spacing-16);
	}

	@media (min-width: 1024px) {
		.container {
			grid-template-columns: 1fr 50ch 1fr;
			margin: 0 auto;
			max-width: 1240px;
		}

		aside {
			display: block;
			width: 400px;
		}
	}
</style>
