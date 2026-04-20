<script lang="ts">
	import Signature from './Signature.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		dateOfTravel: string;
		serial: string;
		name: string;
		/** CSS color string */
		accent: string;
		/** 400 - 700 */
		weight?: number;
		/** degrees rotation (left = negative) */
		angle?: number;
		children?: Snippet;
	};

	const {
		title,
		dateOfTravel,
		serial,
		name,
		accent,
		weight = 500,
		angle = 0,
		children
	}: Props = $props();

	let flipped = $state(false);
</script>

<div class="root" style:--accent={accent} style:--angle="{angle}deg" style:font-weight={weight}>
	<button
		type="button"
		class="card"
		class:flipped
		onclick={() => (flipped = !flipped)}
		aria-label={flipped ? `Show ticket front for ${name}` : `Show ticket back for ${name}`}
	>
		<!-- Front -->
		<div class="face front">
			<div class="frame front-frame">
				<header class="band band-top">
					<h2 class="title">{title}</h2>
				</header>

				<div class="row white date-row">
					<div class="date">
						<span class="date-label">Date of travel:</span>
						<span class="date-value">{dateOfTravel}</span>
					</div>
				</div>

				<div class="row tint"></div>
				<div class="row white"></div>

				<footer class="band band-bottom">
					<span class="sig-badge"><Signature class="sig-svg" /></span>
					<span class="serial">{serial}</span>
				</footer>

				{#if children}
					<div class="front-content">{@render children()}</div>
				{/if}
			</div>
		</div>

		<!-- Back -->
		<div class="face back">
			<div class="frame back-frame">
				<div class="back-bar"></div>
				<div class="back-body">
					<div class="passenger">
						<span class="passenger-label">Passenger</span>
						<span class="passenger-name">{name}</span>
					</div>
					<span class="sig-line"></span>
				</div>
			</div>
		</div>
	</button>
</div>

<style>
	.root {
		--ink: #2a0608;
		--border: 0.45rem;
		--radius: 0.35rem;
		--inner-radius: calc(var(--radius) - var(--border) / 2);
		--tint: color-mix(in srgb, var(--accent) 14%, white);

		display: inline-block;
		width: 100%;
		max-width: 36rem;
		color: var(--ink);
		rotate: var(--angle);
		perspective: 1400px;
		filter: drop-shadow(0 0.6rem 0.9rem rgba(42, 6, 8, 0.2));
	}

	.card {
		all: unset;
		position: relative;
		display: block;
		width: 100%;
		aspect-ratio: 1380 / 780;
		border-radius: var(--radius);
		cursor: pointer;
		transform-style: preserve-3d;
		transition: transform 650ms cubic-bezier(0.2, 0.9, 0.25, 1);
		will-change: transform;
	}

	.card:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 6px;
	}
	.card.flipped {
		transform: rotateY(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		padding: var(--border);
		background: var(--ink);
		border-radius: var(--radius);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		isolation: isolate;
		translate: 0 0 0.01px;
	}
	.back {
		transform: rotateY(180deg);
	}

	.frame {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: white;
		border-radius: var(--inner-radius);
		container-type: inline-size;
		font-size: clamp(0.75rem, 1.6cqi, 1.25rem);
	}

	/* Front */
	.front-frame {
		display: grid;
		grid-template-rows: 22% 22% 16% 16% 24%;
	}
	.band {
		display: flex;
		align-items: center;
		padding-inline: 1.5em;
		background: var(--accent);
	}
	.band-top {
		justify-content: flex-start;
	}
	.band-bottom {
		justify-content: space-between;
		gap: 1em;
	}

	.title {
		margin: 0;
		font-size: 1.9em;
		font-weight: inherit;
		letter-spacing: 0.04em;
		font-variant-caps: all-small-caps;
	}

	.row {
		display: flex;
	}
	.white {
		background: white;
	}
	.tint {
		background: var(--tint);
	}

	.date-row {
		align-items: center;
		justify-content: flex-end;
		padding: 0.4em 1.5em;
	}
	.date {
		line-height: 1.05;
		text-align: right;
	}
	.date-label {
		display: block;
		font-size: 0.95em;
		letter-spacing: 0.05em;
		font-variant-caps: all-small-caps;
	}
	.date-value {
		font-size: 1.6em;
	}

	.sig-badge {
		display: inline-grid;
		place-items: center;
		width: 2.8em;
		height: 2.8em;
		background: white;
		border-radius: 9999px;
		color: var(--accent);
	}
	:global(.sig-svg) {
		width: 72%;
		height: 72%;
	}

	.serial {
		font-size: 1em;
		letter-spacing: 0.02em;
		font-variant-numeric: tabular-nums;
	}

	.front-content {
		position: absolute;
		inset: 22% 0 24% 0;
		display: grid;
		place-items: center;
		padding: 1em 1.5em;
		pointer-events: none;
	}

	/* Back */
	.back-frame {
		display: flex;
		flex-direction: column;
	}
	.back-bar {
		flex: 0 0 13%;
		margin-top: 9%;
		background: var(--ink);
	}
	.back-body {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.5em;
		padding: 1.8em 2em 2em;
		background: white;
	}
	.passenger {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}
	.passenger-label {
		font-size: 0.9em;
		letter-spacing: 0.05em;
		font-variant-caps: all-small-caps;
		color: color-mix(in srgb, var(--ink) 70%, transparent);
	}
	.passenger-name {
		font-size: 1.5em;
		font-weight: inherit;
		word-break: break-word;
	}
	.sig-line {
		display: block;
		width: 55%;
		height: 0.4em;
		margin-left: auto;
		background: var(--ink);
		border-radius: 9999px;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}
	}
</style>
