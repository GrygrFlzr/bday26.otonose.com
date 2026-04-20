<script lang="ts">
	import './font.css';
	import Card from './Card.svelte';
	import { cardDraws } from './cards.remote';
	import { asset } from '$app/paths';

	type Letter = readonly [name: string, text: string];
	type Lang = 'en' | 'ja' | 'ko';

	const PALETTE = [
		'#d13f4a',
		'#e0883c',
		'#b5b840',
		'#4aa367',
		'#3f8bb0',
		'#5b5aa8',
		'#a558a0',
		'#c75478'
	] as const;
	const WEIGHTS = [400, 500, 600, 700] as const;
	const angleFor = (i: number) => (i < 5 ? i - 5 : i - 4); // skip zero

	const TITLES: Record<Lang, string> = {
		en: 'Otonose Express',
		ja: '音乃瀬特急',
		ko: '오토노세 특급'
	};
	const SECTIONS: Record<Lang, { label: string; platform: string }> = {
		en: { label: 'English', platform: 'Platform 1' },
		ja: { label: '日本語', platform: 'Platform 2' },
		ko: { label: '한국어', platform: 'Platform 3' }
	};

	const LETTERS: Record<Lang, readonly Letter[]> = {
		en: [
			['Eldritchreality', 'My oshi is the GREAAAAATEST!'],
			['TEA.P', 'She is a Utahime and'],
			['Hayate', 'I love Monday!'],
			['dimvssometimes', 'Her singing brightens every day'],
			['darren', 'Monday is the GREATEST! '],
			['Xorta', 'I look forward to Sunday'],
			['Omaera Mitz', 'Kanade the Monday GOAT!'],
			['Kevan', 'Best Monday oshi ever!'],
			['Sloth', 'Her Utawaku bless the soul'],
			['bustin', 'Stephanie is invited to party'],
			['Blue08', 'Every day we wait for'],
			['Pr. Riceman®', 'our favourite utahime to '],
			['Music137', 'shine energetically, sing cheerfully, and '],
			['Zekalia', 'make our day the GREATEST!!'],
			['Keishima', 'May her days be happy from'],
			['Ez (thisismyusernameokay)', 'the day the beautiful 🐣 hatched!'],
			['nalds', 'Our aspiring musician has grown'],
			['Loy-kun', 'to be someone we admire'],
			['HoyMate', 'Even though she denies being PUNI PUNI'],
			['sidray', 'she absolutely is'],
			['永日', 'but also KAWAII'],
			['A_Vocaloid_Nerd', 'Her ahoge is tasty to eat'],
			['Sketch', 'with lots of shabu shabu'],
			['FyreWhale', 'together with Suba Mama and'],
			['ヴィー', 'galaxy-brain Ririka!'],
			['Blukip だよ', 'Monday is now Funday'],
			['Udon', "and Kanade's birthday is on Monday too!"],
			['krog', 'It lands on the twentieth of April'],
			['Isssma', "and it's gonna be smoking hot"],
			['azumi', 'and fun and mukamuka'],
			['cyneph', 'and bakabakashii and daebak!']
		],
		ja: [
			['Eldritchreality', '奏のペンペンは'],
			['超凹GG棒汁', '世界一ぷにぷにそして'],
			['Bloody Hero', '超綺麗な歌声'],
			['Zekalia', '我々の推しは']
		],
		ko: [
			['하수', '저는 오토노세 카나데의 커버곡을'],
			['빠독이', '두 키 낮춰서 부르는데'],
			['永日', '템포는 +10 해서요'],
			['꽁정마(THE RANG)', '카나데의 노래에는'],
			['amedoko', '월요일을 즐겁게 맞이하는 힘을 주는 마법이 깃들어 있다']
		]
	};

	const ORDER = ['en', 'ja', 'ko'] as const;
	const draws = await cardDraws();
</script>

<svelte:head>
	<link rel="canonical" href="https://bday26.otonose.com/" />
</svelte:head>

<header class="hero">
	<img class="hero-art" src={asset('/kanade.webp')} alt="Otonose Kanade" />
	<div class="hero-text">
		<p class="hero-kicker">All aboard the</p>
		<h1 class="hero-title">Otonose Express</h1>
		<p class="hero-sub">Kanade's 2026 Birthday Letters</p>
	</div>
</header>

<main>
	<aside class="boarding">
		<img class="conductor" src={asset('/conductor.webp')} alt="Conductor Kanade" />
		<blockquote class="boarding-note">
			<p>"It's Stephanie's birthday! Let's party!"</p>
			<footer>— self-proclaimed iPhone brain</footer>
		</blockquote>
	</aside>

	{#each ORDER as lang (lang)}
		{@const { label, platform } = SECTIONS[lang]}
		<section {lang} class="platform">
			<header class="platform-header">
				<span class="platform-stub">{platform}</span>
				<h2 class="platform-title">{label}</h2>
			</header>

			<div class="card-grid">
				{#each LETTERS[lang] as [name, text], i (name)}
					{@const { color, weight, angle, serial } = draws[lang][i]}
					<Card
						title={TITLES[lang]}
						dateOfTravel="2026-04-20"
						{serial}
						accent={PALETTE[color]}
						weight={WEIGHTS[weight]}
						angle={angleFor(angle)}
						{name}
					>
						{text}
					</Card>
				{/each}
			</div>
		</section>
	{/each}
</main>

<footer class="credits">
	<h3>Credits</h3>
	<ul>
		<li>ReGLOSS idol costume Kanade by <strong>Nyang-Kaz</strong></li>
		<li>Card design by <a rel="external" href="https://x.com/HiImNotSketch">Sketch</a></li>
		<li>Conductor Kanade art by <a rel="external" href="https://x.com/HiImNotSketch">Sketch</a></li>
		<li>Project from <a rel="external" href="https://discord.gg/gaha">Kanade's Opera House</a></li>
	</ul>
</footer>

<style>
	:global(:root) {
		--cream: #ffe7b5;
		--cream-deep: #f3cf8d;
		--ink: #2a0608;
		--accent-red: #d13f4a;
	}
	:global(body) {
		background: var(--cream);
		color: var(--ink);
		margin: 0;
	}

	/* -------------------- Hero -------------------- */
	.hero {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		align-items: center;
		gap: clamp(1.5rem, 4vw, 4rem);
		padding: clamp(2rem, 6vw, 5rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 8vw, 6rem);
		font-family: 'Merriweather Variable', serif;
		overflow: hidden;
	}
	.hero-art {
		width: 100%;
		max-width: 32rem;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 1rem;
		box-shadow:
			0 1rem 2.5rem rgba(42, 6, 8, 0.2),
			0 0 0 0.5rem #fff,
			0 0 0 0.65rem var(--ink);
		rotate: -2deg;
		justify-self: end;
	}
	.hero-text {
		max-width: 28rem;
		justify-self: start;
	}
	.hero-kicker {
		font-size: clamp(1rem, 2vw, 1.5rem);
		letter-spacing: 0.12em;
		font-variant-caps: all-small-caps;
		margin: 0;
		color: color-mix(in srgb, var(--ink) 75%, transparent);
	}
	.hero-title {
		font-size: clamp(2.5rem, 7vw, 5rem);
		margin: 0.2em 0 0.3em;
		letter-spacing: 0.04em;
		font-variant-caps: all-small-caps;
		line-height: 1;
		color: var(--accent-red);
		text-shadow: 0 0.1rem 0 var(--ink);
	}
	.hero-sub {
		font-size: clamp(1rem, 1.8vw, 1.25rem);
		margin: 0;
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 52rem) {
		.hero {
			grid-template-columns: minmax(0, 1fr);
			text-align: center;
		}
		.hero-art {
			justify-self: center;
		}
		.hero-text {
			justify-self: center;
		}
	}

	/* -------------------- Boarding mascot -------------------- */
	.boarding {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(1rem, 3vw, 3rem);
		max-width: 60rem;
		margin: 0 auto clamp(2rem, 5vw, 4rem);
		padding: 0 1.5rem;
		font-family: 'Merriweather Variable', serif;
	}
	.conductor {
		width: clamp(8rem, 18vw, 14rem);
		height: auto;
		flex: 0 0 auto;
		filter: drop-shadow(0 0.4rem 0.6rem rgba(42, 6, 8, 0.25));
	}
	.boarding-note {
		margin: 0;
		padding: 1rem 1.5rem;
		background: white;
		border-left: 0.4rem solid var(--accent-red);
		border-radius: 0.25rem;
		box-shadow: 0 0.25rem 0.75rem rgba(42, 6, 8, 0.1);
		max-width: 30rem;
	}
	.boarding-note p {
		margin: 0 0 0.3em;
		font-size: 1.25rem;
		font-style: italic;
	}
	.boarding-note footer {
		font-size: 0.9rem;
		color: color-mix(in srgb, var(--ink) 70%, transparent);
	}

	/* -------------------- Platform sections -------------------- */
	main {
		padding: 0 clamp(1rem, 4vw, 3rem) 4rem;
	}

	.platform + .platform {
		margin-top: clamp(3rem, 6vw, 5rem);
	}

	.platform[lang='en'] {
		font-family: 'Merriweather Variable', serif;
	}
	.platform[lang='ja'] {
		font-family:
			'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'YuGothic', 'Meiryo',
			'Noto Sans CJK JP', 'Noto Sans JP', sans-serif;
	}
	.platform[lang='ko'] {
		font-family:
			'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans CJK KR', 'Noto Sans KR', sans-serif;
	}

	.platform-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		max-width: 80rem;
		margin: 0 auto 2rem;
		padding-bottom: 0.75rem;
		border-bottom: 0.15rem dashed color-mix(in srgb, var(--ink) 40%, transparent);
	}
	.platform-stub {
		display: inline-block;
		padding: 0.35em 0.8em;
		background: var(--ink);
		color: var(--cream);
		border-radius: 0.25rem;
		font-family: 'Merriweather Variable', serif;
		font-size: 0.9rem;
		letter-spacing: 0.1em;
		font-variant-caps: all-small-caps;
	}
	.platform-title {
		margin: 0;
		font-size: clamp(1.75rem, 3.5vw, 2.75rem);
		letter-spacing: 0.02em;
	}

	/* -------------------- Card grid -------------------- */
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(26rem, 100%), 1fr));
		gap: clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem);
		justify-items: center;
		max-width: 80rem;
		margin: 0 auto;
	}

	/* -------------------- Credits -------------------- */
	.credits {
		max-width: 40rem;
		margin: 0 auto;
		padding: 3rem 1.5rem 4rem;
		text-align: center;
		font-family: 'Merriweather Variable', serif;
		border-top: 0.15rem dashed color-mix(in srgb, var(--ink) 40%, transparent);
	}
	.credits h3 {
		margin: 0 0 0.75rem;
		font-variant-caps: all-small-caps;
		letter-spacing: 0.1em;
	}
	.credits ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.credits a {
		color: var(--accent-red);
	}
</style>
