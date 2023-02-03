import { error } from '@sveltejs/kit';

import type { PageServerLoad, RouteParams } from '../../$types';
import type { TweetType } from '$lib/types';

import prisma from '$lib/server/prisma';
import { timePosted } from '$lib/utils/date';

type Params = RouteParams & { username: string };

export const load: PageServerLoad = async ({ locals, params }) => {
	const { username } = params as Params;

	const profile = await prisma.user.findFirst({
		where: { handle: username }
	});

	if (!profile) {
		throw error(404, 'User not found');
	}
	const userId = profile?.id;

	const tweets = await prisma.tweet.findMany({
		where: { user: { id: userId } },
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	const liked = await prisma.like.findMany({
		where: { userId },
		select: { tweetId: true }
	});

	const likedTweets = liked.map((like) => like.tweetId);

	const userTweets = tweets.map((tweet) => {
		return {
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
	});

	return {
		profile,
		tweets: userTweets as TweetType[]
	};
};
