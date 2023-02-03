<script lang="ts">
	import { userStore } from '$lib/stores/userStore';

	import AuthLayout from '$lib/components/AuthLayout.svelte';
</script>

<svelte:head>
	<title>Twittr</title>
</svelte:head>

<AuthLayout>
	{#if $userStore?.id}
		<a class="btn" href="/home">🔥 Share Your Hot Take</a>
	{:else}
		<div class="buttons">
			<a class="btn" href="/login">Login</a>
			<a class="btn" href="/signup">Sign up</a>
		</div>
	{/if}
</AuthLayout>

<style>
	.buttons {
		display: flex;
		gap: var(--spacing-16);
	}
</style>
