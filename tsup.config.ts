import { defineConfig } from 'tsup';
import fs from 'fs';
import { compile } from 'sass';

// Plugin to handle SCSS compilation and injection
const scssPlugin = {
	name: 'scss',
	setup(build: any) {
		build.onLoad({ filter: /\.scss$/ }, async (args: any) => {
			const result = compile(args.path, {
				style: 'compressed',
				sourceMap: false
			});

			// Return CSS as a string that gets injected into JS
			const cssContent = result.css.toString();
			const js = `
const css = ${JSON.stringify(cssContent)};
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
export default css;
`;

			return {
				contents: js,
				loader: 'js'
			};
		});
	}
};

export default defineConfig([
	// ESM and CJS builds with externalized dependencies
	{
		entry: ['src/index.ts'],
		format: ['esm', 'cjs'],
		dts: true, // Generate TypeScript declarations
		sourcemap: true,
		clean: true,
		target: 'es2020',
		external: ['eventbusjs', 'jsondiffpatch', 'fast-safe-stringify'],
		outExtension({ format }) {
			return {
				js: format === 'esm' ? '.js' : '.cjs'
			};
		},
		esbuildPlugins: [scssPlugin as any]
	},
	// IIFE (UMD) build with bundled dependencies
	{
		entry: ['src/index.ts'],
		format: ['iife'],
		dts: false, // Already generated in first config
		sourcemap: true,
		clean: false, // Don't clean, we're adding to existing build
		target: 'es2020',
		noExternal: [/.*/], // Bundle everything for browser
		outExtension() {
			return {
				js: '.umd.js'
			};
		},
		esbuildPlugins: [scssPlugin as any],
		globalName: 'DevDebugPanel',
		footer: {
			js: `
// Export to global window object for easier access (IIFE only)
if (typeof window !== 'undefined' && typeof DevDebugPanel !== 'undefined') {
  window.DebugPanel = DevDebugPanel.DebugPanel;
  window.debug = DevDebugPanel.debug;
  window.JsonView = DevDebugPanel.JsonView;
  window.ScreenPosition = DevDebugPanel.ScreenPosition;
}
`.trim()
		}
	}
]);
