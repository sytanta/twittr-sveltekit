import PrismaClientPkg from '@prisma/client';

// Prisma doesn't support ES Modules so we have to do this
const PrismaClient = PrismaClientPkg.PrismaClient;
const prisma = new PrismaClient();

export function randomUrl(): string {
	return Math.random().toString(16).slice(2);
}

// Gets random time starting from now and
// going back one day whenever you seed the
// database in the future
export function randomDate(): string {
	// This is set to one day
	const offset = 24 * 60 * 60 * 1000 * 1;

	const current = new Date().getTime();
	const random = Math.random() * offset;
	const difference = new Date(current - random);

	return difference.toISOString();
}

function getUsers() {
	return [
		{
			name: 'matia',
			handle: '@matia',
			email: 'matia@email.test',
			avatar: '/profile/matia/avatar.webp',
			about: 'Likes long walks on the beach. 😘',
			tweets: {
				create: [
					{
						url: randomUrl(),
						posted: randomDate(),
						content: `SvelteKit is lit. 🔥`,
						likes: 10
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content: `I love Svelte! ❤️`,
						likes: 24
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content: `Sometimes when I'm writing JavaScript I want to throw up my hands and say "this is crazy!" but I can't remember what "this" refers to. 🤪`,
						likes: 0
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content: `How do you comfort a JavaScript bug? You console it. 🤭`,
						likes: 0
					}
				]
			}
		},
		{
			name: 'bob',
			handle: '@bobross',
			email: 'bob@email.test',
			avatar: '/profile/bob/avatar.webp',
			about: 'Likes painting.',
			tweets: {
				create: [
					{
						url: randomUrl(),
						posted: randomDate(),
						content: `Use your imagination. Wind it up, blend it together. The joy of painting really is universal.`,
						likes: 1
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content: `The only thing I have control over is taking out the trash. 😂`,
						likes: 4
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content: 'Painting is as individual as people are. 👩‍🎨',
						likes: 0
					},
					{
						url: randomUrl(),
						posted: randomDate(),
						content:
							'All we do is just sorta have an idea in our mind, and we just sorta let it happen. 🌈',
						likes: 10
					}
				]
			}
		}
	];
}

async function seed() {
	await prisma.like.deleteMany();
	await prisma.tweet.deleteMany();
	await prisma.user.deleteMany();

	const users = getUsers();

	for (const user of users) {
		await prisma.user.create({ data: user });
	}
}

seed();
