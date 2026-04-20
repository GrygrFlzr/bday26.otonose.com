import { prerender } from '$app/server';
import { createHash, createCipheriv } from 'node:crypto';

const SEED = 'https://www.youtube.com/watch?v=zZ2Ce3eDamU';
const SALT = 'https://www.youtube.com/channel/UCWQtYtq9EOB4-I5P-3fh8lA';

const COUNTS = { en: 31, ja: 4, ko: 5 } as const;
const COLORS = 8;
const WEIGHTS = 4;
const ANGLES = 10;

// ---------------- RNG ----------------

function makeRng(domain: string) {
	const key = createHash('sha256').update(SEED).update(SALT).update(domain).digest();
	const iv = Buffer.alloc(16);
	const zero = Buffer.alloc(16);
	let counter = 0n;

	const u32 = () => {
		iv.writeBigUInt64BE(counter++, 8);
		return createCipheriv('aes-256-ctr', key, iv).update(zero).readUInt32BE(0);
	};

	const below = (n: number) => {
		const limit = Math.floor(0x1_0000_0000 / n) * n;
		let x: number;
		do {
			x = u32();
		} while (x >= limit);
		return x % n;
	};

	return { below };
}

function stratified(buckets: number, length: number, rng: ReturnType<typeof makeRng>) {
	const base = Math.floor(length / buckets);
	const extra = length % buckets;
	const bag: number[] = [];
	for (let b = 0; b < buckets; b++) {
		const n = base + (b < extra ? 1 : 0);
		for (let j = 0; j < n; j++) bag.push(b);
	}
	for (let i = bag.length - 1; i > 0; i--) {
		const j = rng.below(i + 1);
		[bag[i], bag[j]] = [bag[j], bag[i]];
	}
	return bag;
}

// ---------------- Serial ----------------
// 12 decimal digits derived from SHA-256(SALT || name), grouped 4-4-4.
function serialFor(name: string): string {
	const digest = createHash('sha256').update(SALT).update(name).digest();
	// First 6 bytes → 48 bits → fits safely in a JS number (< 2^53).
	const n =
		digest[0] * 2 ** 40 +
		digest[1] * 2 ** 32 +
		digest[2] * 2 ** 24 +
		digest[3] * 2 ** 16 +
		digest[4] * 2 ** 8 +
		digest[5];
	const twelve = (n % 1_000_000_000_000).toString().padStart(12, '0');
	return `${twelve.slice(0, 4)}-${twelve.slice(4, 8)}-${twelve.slice(8, 12)}`;
}

// ---------------- Exports ----------------

export type CardDraw = {
	color: number;
	weight: number;
	angle: number;
	serial: string;
};
export type CardDraws = Record<'en' | 'ja' | 'ko', CardDraw[]>;

export const cardDraws = prerender((): CardDraws => {
	const lang = (l: 'en' | 'ja' | 'ko'): CardDraw[] => {
		const rng = makeRng(l);
		const colors = stratified(COLORS, COUNTS[l], rng);
		const weights = stratified(WEIGHTS, COUNTS[l], rng);
		const angles = stratified(ANGLES, COUNTS[l], rng);
		return Array.from({ length: COUNTS[l] }).map((_, i) => ({
			color: colors[i],
			weight: weights[i],
			angle: angles[i],
			serial: serialFor(`${l}-${i}`)
		}));
	};
	return { en: lang('en'), ja: lang('ja'), ko: lang('ko') };
});
