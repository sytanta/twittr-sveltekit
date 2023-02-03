<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	// import { fade, fly } from 'svelte/transition';

	import type { TweetType } from '$lib/types';

	import { enhance } from '$app/forms';
	import { setAppLoading } from '$lib/stores/uiStore';

	import Icon from '$lib/components/Icon.svelte';

	export let tweet: TweetType;

	const handleDelete: SubmitFunction = ({}) => {
		setAppLoading(true, 'Deleting tweet...');

		return async ({ update }) => {
			await update();
			setAppLoading(false);
		};
	};
</script>

<article class="tweet-container">
	<!-- transition:fade -->
	<a class="avatar" href="/home/profile/{tweet.handle}">
		<img
			width="140"
			height="140"
			src={tweet.avatar ?? '/profile/matia/avatar.webp'}
			alt={tweet.name}
		/>
	</a>

	<div class="tweet-details">
		<div>
			<a href="/home/profile/{tweet.handle}" class="user">
				{tweet.name}
			</a>
			<span class="handle">@{tweet.handle}</span>
			<span class="posted"> · {tweet.posted}</span>
		</div>

		<div class="tweet">
			<div class="content">
				{tweet.content}
			</div>

			<div class="actions">
				<form action="/home?/likeTweet" method="post" use:enhance>
					<input type="hidden" name="id" value={tweet.id} />
					<button class="btn like" title="Like" type="submit">
						<div class="circle">
							<Icon width="24" height="24" name="like" class={tweet.liked ? 'liked' : ''} />
						</div>
						<span class="count">
							{#key tweet.likes}
								{#if tweet.likes}
									<div>
										<!-- in:fly={{ y: 40 }} out:fly={{ y: 40 }} -->
										{tweet.likes}
									</div>
								{/if}
							{/key}
						</span>
					</button>
				</form>

				<a
					href="/home/profile/{tweet.handle}/status/{tweet.id}"
					class="permalink"
					title="Permalink"
				>
					<div class="circle">
						<Icon width="24" height="24" name="permalink" />
					</div>
				</a>

				<form action="/home?/deleteTweet" method="post" use:enhance={handleDelete}>
					<input type="hidden" name="id" value={tweet.id} />
					<button aria-label="Remove tweet" class="btn remove" title="Remove" type="submit">
						<div class="circle">
							<Icon width="24" height="24" name="remove" />
						</div>
					</button>
				</form>
			</div>
		</div>
	</div>
</article>

<style>
	.avatar {
		align-self: start;
	}

	img {
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}

	button {
		font-size: var(--font-16);
		padding: var(--spacing-16);
	}

	.tweet-container:hover {
		background-color: var(--color-bg-secondary);
	}

	.tweet-container {
		display: grid;
		gap: var(--spacing-16);
		grid-template-columns: min-content 1fr;
		padding: var(--spacing-16) var(--spacing-24);
		transition: all 0.3s;
	}

	.tweet-container:not(:last-child) {
		border-bottom: 1px solid var(--color-border-primary);
	}

	.tweet-details {
		display: grid;
		gap: var(--spacing-8);
	}

	.user {
		font-weight: 700;
		text-transform: capitalize;
	}

	.user:hover {
		text-decoration: underline;
	}

	.handle,
	.posted {
		color: var(--color-text-muted);
		font-size: var(--font-16);
	}

	.content {
		font-size: var(--font-16);
	}

	.actions {
		display: flex;
		gap: var(--spacing-32);
		margin-top: var(--spacing-16);
	}

	.actions button,
	.actions a {
		color: var(--color-text-muted);
		background: none;
		padding: 0;
		transition: all 0.3s;
	}

	.circle {
		border-radius: 50%;
		display: grid;
		height: 24px;
		padding: var(--spacing-16);
		place-content: center;
		transition: all 0.3s;
		width: 24px;
	}

	.circle > :global(.liked) {
		color: hsl(9 100% 64%);
		fill: hsl(9 100% 64%);
	}

	.like {
		align-items: center;
		display: flex;
	}

	.like:hover {
		color: hsl(9 100% 64%);
	}

	.like:hover .circle {
		background: hsla(9 100% 64% / 10%);
	}

	.permalink:hover {
		color: hsl(120 100% 40%);
	}

	.permalink:hover .circle {
		background-color: hsla(120 100% 50% / 4%);
	}

	.remove:hover {
		color: hsl(0 100% 50%);
	}

	.remove:hover .circle {
		background-color: hsla(0 100% 50% / 4%);
	}

	.like,
	.remove,
	.permalink {
		width: 80px;
	}

	.count {
		font-size: 1.4rem;
		font-weight: 400;
		margin-left: var(--spacing-16);
		overflow: hidden;
	}
</style>
