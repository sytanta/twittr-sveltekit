<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>{$page.error?.message}</h1>
	<img src="/dancing.webp" alt="Person dancing" />
</div>

<style>
	.error {
		display: grid;
		gap: var(--spacing-32);
		padding: var(--spacing-24) var(--spacing-32);
		place-items: center;
	}

	img {
		border-radius: 50%;
		height: 200px;
		object-fit: cover;
		width: 200px;
	}
</style>
