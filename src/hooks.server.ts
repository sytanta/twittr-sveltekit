import type { Handle } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

import '$lib/supabase';

export const handle: Handle = async ({ event, resolve }) => {
	const { session } = await getSupabase(event);

	event.locals.user = session?.user ?? null;

	const response = await resolve(event);
	return response;
};
