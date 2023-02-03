import type { PostgrestError } from '@supabase/supabase-js';
import { createClient } from '@supabase/auth-helpers-sveltekit';

import type { User } from './types';

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function getUser() {
	const { data: authUserData, error } = await supabase.auth.getUser();

	if (authUserData.user) {
		const { data: userData, error } = await supabase
			.from('User')
			.select('id, name, handle, email')
			.eq('id', authUserData.user.id)
			.limit(1);

		const user = userData?.[0] as User;

		return { data: user, error };
	}

	return { data: null, error };
}

export async function signup({
	name,
	username,
	email,
	password
}: {
	name: string;
	username: string;
	email: string;
	password: string;
}) {
	const { error: errSignUp, data: authUser } = await supabase.auth.signUp({ email, password });

	if (errSignUp) return { data: !errSignUp, error: errSignUp };

	let errCreateUser: PostgrestError | null = null;
	if (!errSignUp) {
		const handle = username
			.toLowerCase()
			.split(' ')
			.filter((char) => !!char.trim())
			.join('-');

		const { error } = await supabase
			.from('User')
			.insert({ id: authUser.user?.id, name, handle, email });
		errCreateUser = error;
	} else {
		// TODO - remove auth user
	}

	const error = errSignUp || errCreateUser;
	return { data: !error, error };
}

export async function signIn({ email, password }: { email: string; password: string }) {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	return { data: !error, error };
}

export async function signOut() {
	await supabase.auth.signOut();
}
