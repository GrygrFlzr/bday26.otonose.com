import type { PageLoad } from './$types';

const linesRaw = `GrygrFlzr 「グレイ」	We're no strangers to love.
Rain	You know the rules and
Hizu	so do I. A full
Nadeko	commitment's what I'm thinkin' of.` as const;

export const prerender = true;

export const load: PageLoad = () => {
	return {
		messages: linesRaw.split('\n').map((line) => {
			const [name, message] = line.split('\t');
			return { name, message };
		})
	};
};
