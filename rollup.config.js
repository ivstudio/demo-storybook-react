import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default {
	// entry points
	input: './src/index.ts',
	// output files support both ESModules and CommonJS
	output: [
		{
			file: packageJson.main,
			format: 'cjs', // commonJS
			sourcemap: true,
		},
		{
			file: packageJson.module,
			format: 'esm', // ES Modules
			sourcemap: true,
		},
	],
	// Plugin array
	plugins: [
		peerDepsExternal(), // prevents bundling peerDependencies
		resolve(), // resolves package entrypoints
		commonjs({
			exclude: 'node_modules',
			ignoreGlobal: true,
		}),
		typescript({ useTsconfigDeclarationDir: true }), // typescript into js
		postcss({
			extensions: ['.css'], // process CSS files
		}),
	],
};
