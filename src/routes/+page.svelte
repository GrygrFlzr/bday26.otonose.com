<script lang="ts">
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<h1>Example chain letter</h1>

<div lang="en" class="page">
	{#each data.messages as m (m.name)}
		<div class="paper">
			<p class="message">{m.message}</p>
			<span class="author">{m.name}</span>
		</div>
	{/each}
</div>

<style>
	.page {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: flex-start;
		min-height: 100vh;
		padding: 2rem 0;
	}

	.paper {
		position: relative;
		padding: 2rem 1rem;
		margin: 1rem;
		font-size: 2rem;
		box-shadow: -0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.3);
		background-position: 0% 1em;
		background-size: 100% 1em;
		background-repeat: repeat-y;
		font-family: 'Caveat', cursive;
		font-optical-sizing: auto;
		font-style: normal;
		background-image: linear-gradient(
			to bottom,
			lch(85.993% 20.394 0) calc(1em - 1px),
			lch(72.985% 32.272 0) calc(1em - 1px),
			lch(72.985% 32.272 0) 1em,
			lch(85.993% 20.394 0) 1em
		);
		color: lch(30.731% 74.271 0);
	}
	.paper:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		height: 80px;
		width: 80px;
		transform: translate(30px, -40px);
		background-size: cover;
	}

	.author {
		position: absolute;
		bottom: 0.25rem;
		right: 1rem;
		font-size: 1rem;
	}
	.message {
		text-wrap: nowrap;
		font-size: 2rem;
	}
</style>
