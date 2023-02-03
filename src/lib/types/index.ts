export type TweetType = {
	id: number;
	content: string;
	likes: number;
	posted: string;
	url: string;
	avatar: string;
	handle: string;
	name: string;
	liked: boolean;
};

export interface User {
	id: string;
	email: string;
	name: string;
	handle: string;
	avatar?: string;
	about?: string;
}
