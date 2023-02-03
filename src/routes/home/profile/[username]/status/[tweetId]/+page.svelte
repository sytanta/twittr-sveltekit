<script lang="ts">
	import type { PageData } from './$types';

	import Tweet from '$lib/components/Tweet.svelte';

	export let data: PageData;

	$: name = data.tweet.name;
	$: content = data.tweet.content.slice(0, 60);
</script>

<svelte:head>
	<title>{name} on Twittr: "{content}..."</title>
</svelte:head>

<Tweet tweet={data.tweet} />
