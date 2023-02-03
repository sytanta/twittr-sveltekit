import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

import prisma from '$lib/server/prisma';
import { timePosted } from '$lib/utils/date';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (!session?.user) {
		throw redirect(307, '/login');
	}

	const userId = session.user.id;

	const data = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	// Get the liked tweets
	const likes = await prisma.like.findMany({
		where: { userId },
		select: { tweetId: true }
	});

	// We just want an array of the ids
	const likedTweets = likes.map((like) => like.tweetId);

	// We can shape the data however we want
	// so our user doesn't have to pay the cost for it
	const tweets = data.map((tweet) => {
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
		tweets: tweets ?? []
	};
};

export const actions: Actions = {
	createTweet: async (e) => {
		const { user } = e.locals;

		if (!user) {
			throw redirect(307, '/login');
		}

		const form = await e.request.formData();
		const tweet = String(form.get('tweet'));

		await prisma.tweet.create({
			data: {
				posted: new Date(),
				url: Math.random().toString(16).slice(2),
				content: tweet,
				likes: 0,
				userId: user.id
				// user: { connect: { id: user.id } }
			}
		});

		return { status: 200, body: 'Maximum tweet length exceeded', headers: { location: '/home' } };
	},
	likeTweet: async ({ locals, request }) => {
		const { user } = locals;

		if (!user) {
			throw redirect(307, '/login');
		}

		const form = await request.formData();
		let id = form.get('id');
		if (!id) return {};

		const tweetId = Number(id);
		const userId = user.id;

		const liked = await prisma.like.count({
			where: { tweetId, userId }
		});

		if (liked === 1) {
			await prisma.like.delete({
				where: {
					tweetId_userId: {
						tweetId,
						userId
					}
				}
			});

			const count = (await prisma.tweet.findUnique({
				where: { id: tweetId },
				select: { likes: true }
			})) || { likes: 0 };

			await prisma.tweet.update({
				where: { id: tweetId },
				data: { likes: count.likes ? 0 : count.likes - 1 }
			});

			return {
				status: 200
			};
		}

		await prisma.like.create({
			data: {
				tweetId,
				user: { connect: { id: userId } }
			}
		});

		const count = (await prisma.tweet.findUnique({
			where: { id: tweetId },
			select: { likes: true }
		})) || { likes: 0 };

		await prisma.tweet.update({
			where: { id: tweetId },
			data: { likes: count.likes + 1 }
		});

		return {
			status: 200
		};
	},
	deleteTweet: async ({ locals, request }) => {
		const { user } = locals;

		if (!user) {
			throw redirect(307, '/login');
		}

		const form = await request.formData();
		const id = form.get('id');
		if (!id) return {};

		await prisma.tweet.delete({ where: { id: Number(id) } });

		return {
			status: 200
		};
	}
};
