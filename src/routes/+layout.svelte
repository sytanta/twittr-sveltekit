<script lang="ts">
	import { onMount } from 'svelte';

	import type { User } from '$lib/types';

	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { appLoadingStore } from '$lib/stores/uiStore';
	import { setUserStore } from '$lib/stores/userStore';

	import { getUser, supabase } from '$lib/supabase';
	import { validateUser } from '$lib/utils/auth';

	import '$lib/styles/global.css';

	import Loading from '$lib/components/Loading.svelte';

	onMount(async () => {
		const { data } = await getUser();
		setUserStore(data);

		validateUser(data?.id ?? null, $page.url.pathname);

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			invalidate('supabase:auth');

			let user: User | null = null;
			if (session?.user) {
				const { data } = await getUser();
				user = data;
			}

			setUserStore(user);
			validateUser(user?.id ?? null, $page.url.pathname);
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />

{#if $appLoadingStore}
	<Loading />
{/if}
