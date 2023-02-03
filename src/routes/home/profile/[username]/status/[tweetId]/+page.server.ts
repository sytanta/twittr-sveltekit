import { error } from '@sveltejs/kit';

import type { TweetType } from '$lib/types';
import type { PageServerLoad, RouteParams } from '../../$types';

import prisma from '$lib/server/prisma';
import { timePosted } from '$lib/utils/date';

type Params = RouteParams & { username: string; tweetId: string };

export const load: PageServerLoad = async ({ params }) => {
	const { username, tweetId } = params as Params;

	const profile = await prisma.user.findFirst({
		where: { handle: username }
	});

	if (!profile) {
		throw error(404, 'User or not found');
	}

	const tweet = await prisma.tweet.findFirst({
		where: { id: Number(tweetId) },
		include: { user: true }
	});

	if (!tweet) throw error(404, 'Tweet not found');

	const liked = await prisma.like.findMany({
		where: { userId: profile.id },
		select: { tweetId: true }
	});

	const likedTweets = liked.map((like) => like.tweetId);

	const userTweet = {
		id: tweet.id,
		content: tweet.content,
		likes: tweet.likes,
		posted: timePosted(tweet.posted),
		url: tweet.url,
		avatar: tweet.user.avatar,
		handle: tweet.user.handle,
		name: tweet.user.name,
		liked: likedTweets.includes(tweet.id)
	};

	return { tweet: userTweet as TweetType };
};
