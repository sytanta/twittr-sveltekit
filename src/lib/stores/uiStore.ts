import { writable } from 'svelte/store';

export const appLoadingStore = writable(true);
export const appLoadingMessageStore = writable('Loading...');

export function setAppLoading(
	loading: boolean | null | undefined,
	message: string | undefined = 'Loading...'
) {
	appLoadingStore.update((pre) => (loading != null ? !!loading : !pre));
	appLoadingMessageStore.set(message);
}
