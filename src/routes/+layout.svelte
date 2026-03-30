<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	const { children }: LayoutProps = $props();
	const canonicalHref = $derived(
		`https://bday26.otonose.com${page.url.pathname}${page.url.search}`
	);
</script>

<svelte:head>
	<link rel="canonical" href={canonicalHref} />
</svelte:head>
{@render children()}
