<script lang="ts">
	import type { PageData } from './$types';

	import Tweet from '$lib/components/Tweet.svelte';

	export let data: PageData;

	$: profile = data.profile;
	$: tweets = data.tweets;
</script>

<svelte:head>
	<title>Your profile | Twittr</title>
</svelte:head>

<div class="profile">
	<img class="banner" src="/profile/matia/banner.webp" alt="Profile banner" />
	<img class="avatar" src={profile.avatar ?? '/profile/matia/avatar.webp'} alt={profile.name} />
</div>

<div class="content">
	<div class="user">
		<span class="name">{profile.name}</span>
		<span class="handle">@{profile.handle}</span>
	</div>
	{#if profile.about}
		<div class="about">
			<span>{profile.about}</span>
		</div>
	{/if}
</div>

<nav>
	<a href="#" class="active">Tweets</a>
	<a href="#">Tweets & replies</a>
	<a href="#">Media</a>
	<a href="#">Likes</a>
</nav>

{#each tweets as tweet (tweet.id)}
	<Tweet {tweet} />
{/each}

<style>
	.profile {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 200px 60px;
	}

	.banner {
		grid-column: 1 / -1;
		grid-row: 1 / 2;
	}

	.avatar {
		align-self: flex-end;
		border: 4px solid var(--color-bg-primary);
		border-radius: 50%;
		grid-column: 1 / 2;
		grid-row: 1 / -1;
		height: 120px;
		margin: auto var(--spacing-16) 0;
		place-self: center;
		width: 120px;
	}

	img {
		height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.content {
		display: grid;
		gap: var(--spacing-16);
		margin-top: var(--spacing-16);
		padding: 0 var(--spacing-16);
	}

	.user {
		display: grid;
	}

	.name {
		font-size: var(--font-24);
		font-weight: 700;
		text-transform: capitalize;
	}

	.handle {
		color: var(--color-text-muted);
	}

	nav {
		border-bottom: 1px solid var(--color-border-primary);
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-32);
	}

	a {
		border-bottom: 4px solid transparent;
		color: var(--color-text-muted);
		font-size: var(--font-16);
		padding: var(--spacing-16) var(--spacing-32);
		transition: all 0.2s;
	}

	a:hover {
		background-color: var(--color-link-hover);
		border-bottom: 4px solid var(--color-brand);
	}

	.active {
		border-bottom: 4px solid var(--color-brand);
		font-weight: 700;
	}
</style>
