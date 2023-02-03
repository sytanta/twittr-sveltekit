import { getServerSession } from '@supabase/auth-helpers-sveltekit';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);

	return {
		session
	};
};
