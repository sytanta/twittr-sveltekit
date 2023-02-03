<script lang="ts">
	import { page } from '$app/stores';
	import { setAppLoading } from '$lib/stores/uiStore';
	import { userStore } from '$lib/stores/userStore';
	import { signOut } from '$lib/supabase';

	import Icon from '$lib/components/Icon.svelte';

	$: path = $page.url.pathname;

	async function handleSignout() {
		setAppLoading(true);

		await signOut();

		setAppLoading(false);
	}
</script>

<aside>
	<div class="container">
		<nav>
			<ul>
				<li>
					<a href="/" class="logo">🐦️</a>
				</li>

				<li class:active={path === '/home'}>
					<a class="link" href="/home">
						<Icon width="32" height="32" name="home" />
						<span>Home</span>
					</a>
				</li>

				<li class:active={path.startsWith('/home/profile/')}>
					<a class="link" href={`/home/profile/${$userStore?.handle}`}>
						<Icon width="32" height="32" name="profile" />
						<span>Profile</span>
					</a>
				</li>

				<li class:active={path.startsWith('/home/settings')}>
					<a class="link" href="/home/settings">
						<Icon width="32" height="32" name="settings" />
						<span>Settings</span>
					</a>
				</li>

				<li class:active={path === '/home/about'}>
					<a class="link" href="/home/about">
						<Icon width="32" height="32" name="about" />
						<span>About</span>
					</a>
				</li>

				<li>
					<button class="link" on:click={handleSignout}>
						<Icon width="32" height="32" name="signout" viewBoxX={490.3} viewBoxY={490.3} />
						<span>Sign out</span>
					</button>
				</li>
			</ul>
		</nav>

		<button class="btn tweet">Tweet</button>
	</div>
</aside>

<style>
	.container {
		padding-top: var(--spacing-20);
		position: sticky;
		top: 0;
	}

	ul {
		display: grid;
		gap: var(--spacing-8);
	}

	li .link {
		align-items: center;
		background: none;
		border: none;
		border-radius: var(--radius-base);
		color: var(--color-text-primary);
		cursor: pointer;
		display: inline-flex;
		font-size: var(--font-18);
		gap: var(--spacing-16);
		padding: 1.4rem;
		transition: all 0.2s ease;
	}

	li .link:hover {
		background-color: var(--color-link-hover);
	}

	li.active {
		font-weight: 700;
	}

	.logo {
		font-size: var(--font-32);
	}

	span {
		display: none;
	}

	.tweet {
		display: none;
		text-align: center;
	}

	.tweet:hover {
		background-color: var(--color-btn-primary-active-hover);
	}

	@media (min-width: 1024px) {
		aside {
			padding: 0 var(--spacing-32);
		}

		span {
			display: block;
		}

		.tweet {
			display: block;
			margin-top: var(--spacing-16);
			width: 100%;
		}
	}
</style>
