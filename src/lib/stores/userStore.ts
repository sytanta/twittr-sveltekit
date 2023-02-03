import { writable } from 'svelte/store';

import type { User } from '$lib/types';

export const userStore = writable<User | null>(null);

export function setUserStore(user: User | null) {
	userStore.set(user);
}
