import { goto } from '$app/navigation';
import { setAppLoading } from '$lib/stores/uiStore';

export function validateUser(userId: string | null, pathname: string) {
	if (userId && ['/login', '/signup'].includes(pathname)) {
		setAppLoading(true, "You've already logged in, redirect to Homepage");

		goto('/home');

		setTimeout(() => {
			setAppLoading(false);
		}, 1500);

		return;
	}

	if (!userId && !['/', '/login', '/signup'].includes(pathname)) {
		goto('/login');
		window.location.pathname = '/login';
	}

	setAppLoading(false);
}
