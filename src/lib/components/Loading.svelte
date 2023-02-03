<script lang="ts">
	import { appLoadingMessageStore } from '$lib/stores/uiStore';

	import Icon from './Icon.svelte';
</script>

<div class="message-container">
	<div class="container-inner">
		<Icon name="loading" height="28" width="28" viewBoxX={38} viewBoxY={38} />
		{$appLoadingMessageStore}
	</div>
</div>

<style>
	.message-container {
		align-items: center;
		background-color: var(--color-bg-primary);
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		left: 0;
		opacity: 0.7;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
	}

	.container-inner {
		align-items: center;
		display: flex;
		justify-content: center;
		gap: var(--spacing-16);
	}
</style>
