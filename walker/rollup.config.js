import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

import svgicons from 'rollup-plugin-svg-icons';
import sveltePreprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';


const preprocess = seqPreprocessor([
  sveltePreprocess({
    postcss: true,
    sass: true,
  }),
]);


const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: production ? '/home/moodle/my/frontend/bundle.js' : 'public/bundle.js'
	},
	plugins: [
		svelte({
			preprocess,
			compilerOptions: {
	
				dev: !production
			}
		}),
		css({ output: 'bundle.css' }),
		
		svgicons({
			inputFolder: 'src/icons',
			output: production ? '/home/moodle/my/frontend/bundle.svg' : 'public/my/frontend/bundle.svg',
		}),

		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		!production && serve(),

		!production && livereload('public'),

		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
