<script lang="ts">
	import type { TweetType } from '$lib/types';
	import type { PageData } from './$types';

	import Tweet from '$lib/components/Tweet.svelte';
	import Compose from '$lib/components/Compose.svelte';

	export let data: PageData;

	$: tweets = data.tweets as TweetType[];
</script>

<svelte:head>
	<title>Home | Twittr</title>
</svelte:head>

<h1>Feed</h1>

<Compose />

{#each tweets as tweet (tweet.id)}
	<Tweet {tweet} />
{/each}

<style>
	h1 {
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
		margin-top: 1rem;
		padding: var(--spacing-8) var(--spacing-24);
		position: sticky;
		top: 0;
	}
</style>
