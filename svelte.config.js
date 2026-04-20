import { execSync } from 'node:child_process';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			origin: 'https://bday26.otonose.com'
		},
		version: {
			name: execSync('git rev-parse HEAD').toString().trim(),
			pollInterval: 0
		},
		experimental: {
			remoteFunctions: true
		}
	},
	compilerOptions: {
		modernAst: true,
		runes: true,
		experimental: {
			async: true
		}
	}
};

export default config;
