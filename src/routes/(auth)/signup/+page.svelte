<script lang="ts">
	import type { AuthError, PostgrestError } from '@supabase/supabase-js';

	import { signup } from '$lib/supabase';

	import AuthLayout from '$lib/components/AuthLayout.svelte';

	let loading = false;
	let error: AuthError | PostgrestError | null = null;
	let name = '';
	let username = '';
	let email = '';
	let password = '';

	const handleSignup = async () => {
		loading = true;

		const { error: authErr } = await signup({ name, username, email, password });

		error = authErr;
		loading = false;
	};
</script>

<svelte:head><title>Sign up | Twittr</title></svelte:head>

<AuthLayout>
	<form on:submit|preventDefault={handleSignup}>
		<fieldset class="signup-form" disabled={loading}>
			<input
				name="name"
				class="input"
				type="text"
				placeholder="Your name"
				bind:value={name}
				required
			/>
			<input
				name="username"
				class="input"
				type="text"
				placeholder="Username"
				bind:value={username}
				required
			/>
			<input
				name="email"
				class="input"
				type="email"
				placeholder="Email"
				bind:value={email}
				required
			/>
			<input
				name="password"
				class="input"
				type="password"
				placeholder="Password"
				bind:value={password}
				required
			/>
			<input
				type="submit"
				class="btn"
				value={loading ? 'Loading...' : 'Sign up'}
				disabled={loading}
			/>
		</fieldset>
	</form>
	{#if error}
		<div class="error-message">
			{error.message}
		</div>
	{/if}
	<div class="log-in">
		Already have an account? <a class="login-link" href="/login">Log in</a>
	</div>
</AuthLayout>

<style>
	form {
		max-width: 30rem;
		padding: 1rem;
		width: 100%;
	}

	.signup-form {
		border: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}

	.input,
	.log-in {
		font-size: var(--font-16);
	}

	.log-in {
		margin-top: var(--spacing-16);
	}

	.login-link {
		text-decoration: underline;
	}

	.error-message {
		font-size: var(--font-16);
		padding: var(--spacing-8) var(--spacing-16);
		text-align: center;
	}
</style>
