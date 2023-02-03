<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';

	import { enhance } from '$app/forms';

	import Icon from './Icon.svelte';

	let tweet = '';
	let maxCharacters = 140;
	let loading = false;

	$: charactersLeft = maxCharacters - tweet.length;

	const handleSubmit: SubmitFunction = ({ data, cancel }) => {
		const content = data.get('tweet');
		if (!content || content.length > 140) cancel();

		loading = true;

		return async ({ update }) => {
			await update();

			tweet = '';
			loading = false;
		};
	};
</script>

<div class="compose">
	<img src="/profile/matia/avatar.webp" alt="Avatar" />
	<form action="?/createTweet" method="post" autocomplete="off" use:enhance={handleSubmit}>
		<fieldset disabled={loading}>
			<input
				aria-label="Enter your Tweet"
				bind:value={tweet}
				name="tweet"
				placeholder="What's your hot take?"
				type="text"
			/>
			<button
				class="btn"
				class:error={charactersLeft < 0}
				disabled={charactersLeft <= 0}
				type="submit"
			>
				{#if loading}
					<Icon name="loading" height="16" width="16" viewBoxX={38} viewBoxY={38} />
				{:else}
					{charactersLeft === maxCharacters ? 'Tweet' : charactersLeft}
				{/if}
			</button>
		</fieldset>
	</form>
</div>

<style>
	.compose {
		align-items: center;
		border-bottom: 1px solid var(--color-border-primary);
		display: grid;
		gap: var(--spacing-16);
		grid-template-columns: min-content 1fr;
		padding: var(--spacing-16) var(--spacing-24);
	}

	img {
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}

	form {
		align-items: center;
		display: flex;
		gap: var(--spacing-16);
	}

	input {
		background-color: transparent;
		color: var(--color-text-primary);
	}

	button {
		font-size: var(--font-16);
		min-width: 80px;
		padding: var(--spacing-16);
	}

	.error {
		color: tomato;
	}
</style>
