// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare namespace App {
	// interface Error {}
	// interface PageData {}
	// interface Platform {}

	interface Locals {
		user: import('@supabase/supabase-js').User | null;
	}
}
