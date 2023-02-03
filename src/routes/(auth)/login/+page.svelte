<script lang="ts">
	import type { AuthError } from '@supabase/supabase-js';

	import { signIn } from '$lib/supabase';

	import AuthLayout from '$lib/components/AuthLayout.svelte';

	let loading = false;
	let errorSignin: AuthError | null = null;
	let email = 'john@yahoo.com';
	let password = 'password';

	const handleLogin = async () => {
		loading = true;
		const { error } = await signIn({ email, password });

		errorSignin = error;
		loading = false;
	};
</script>

<svelte:head><title>Login | Twittr</title></svelte:head>

<AuthLayout>
	<form on:submit|preventDefault={handleLogin}>
		<fieldset class="login-form">
			<input class="input" type="email" placeholder="Your email" bind:value={email} required />
			<input class="input" type="password" placeholder="Password" bind:value={password} required />
			<input type="submit" class="btn" value={loading ? 'Loading' : 'Login'} disabled={loading} />
		</fieldset>
	</form>
	{#if errorSignin}
		<div class="error-message">
			{errorSignin.message}
		</div>
	{/if}
	<div class="sign-up">
		Not have an account yet? <a class="signup-link" href="/signup">Sign up</a>
	</div>
</AuthLayout>

<style>
	form {
		max-width: 30rem;
		padding: 1rem;
		width: 100%;
	}

	.login-form {
		border: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}

	.input,
	.sign-up {
		font-size: var(--font-16);
	}

	.sign-up {
		margin-top: var(--spacing-16);
	}

	.signup-link {
		text-decoration: underline;
	}

	.error-message {
		font-size: var(--font-16);
		padding: var(--spacing-8) var(--spacing-16);
		text-align: center;
	}
</style>
