#!/usr/bin/env node
import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to handle SCSS compilation
const scssPlugin = {
  name: 'scss',
  setup(build) {
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      const sass = await import('sass');
      const result = sass.compile(args.path, {
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

// Check for watch mode
const watchMode = process.argv.includes('--watch');

async function build() {
  try {
    // Create dist directory
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }

    // Build configuration
    const buildConfig = {
      entryPoints: ['src/index.ts'],
      bundle: true,
      outdir: 'dist',
      format: 'esm',
      target: 'es2020',
      sourcemap: true,
      minify: !watchMode, // Don't minify in watch mode for faster builds
      external: ['eventbusjs', 'jsondiffpatch', 'safe-stringify'],
      plugins: [scssPlugin],
      define: {
        'process.env.NODE_ENV': watchMode ? '"development"' : '"production"'
      }
    };

    if (watchMode) {
      console.log('👀 Watch mode enabled - monitoring for changes...\n');

      // Create contexts for watch mode
      const esmContext = await esbuild.context({
        ...buildConfig,
        outExtension: { '.js': '.esm.js' }
      });

      const cjsContext = await esbuild.context({
        ...buildConfig,
        format: 'cjs',
        outExtension: { '.js': '.cjs.js' }
      });

      const umdContext = await esbuild.context({
        ...buildConfig,
        format: 'iife',
        globalName: 'DevDebugPanel',
        outExtension: { '.js': '.umd.js' },
        external: [],
        footer: {
          js: `
// Export to global window object for easier access
if (typeof window !== 'undefined') {
  window.DebugPanel = DevDebugPanel.DebugPanel;
  window.debug = DevDebugPanel.debug;
  window.JsonView = DevDebugPanel.JsonView;
  window.ScreenPosition = DevDebugPanel.ScreenPosition;
}
`.trim()
        }
      });

      // Watch all contexts
      await Promise.all([
        esmContext.watch(),
        cjsContext.watch(),
        umdContext.watch()
      ]);

      console.log('✅ Initial build completed!');
      console.log('📦 Watching for changes...');
      console.log('  - dist/index.esm.js (ES modules)');
      console.log('  - dist/index.cjs.js (CommonJS)');
      console.log('  - dist/index.umd.js (UMD/Browser)');
      console.log('\nPress Ctrl+C to stop watching.');

    } else {
      // Standard build (non-watch mode)
      // Build ESM version
      await esbuild.build({
        ...buildConfig,
        outExtension: { '.js': '.esm.js' }
      });

      // Build CommonJS version
      await esbuild.build({
        ...buildConfig,
        format: 'cjs',
        outExtension: { '.js': '.cjs.js' }
      });

      // Build UMD version for browser (IIFE with global exports)
      await esbuild.build({
        ...buildConfig,
        format: 'iife',
        globalName: 'DevDebugPanel',
        outExtension: { '.js': '.umd.js' },
        external: [], // Bundle all dependencies for UMD
        footer: {
          js: `
// Export to global window object for easier access
if (typeof window !== 'undefined') {
  window.DebugPanel = DevDebugPanel.DebugPanel;
  window.debug = DevDebugPanel.debug;
  window.JsonView = DevDebugPanel.JsonView;
  window.ScreenPosition = DevDebugPanel.ScreenPosition;
}
`.trim()
        }
      });

      console.log('✅ Build completed successfully!');
      console.log('📦 Generated files:');
      console.log('  - dist/index.esm.js (ES modules)');
      console.log('  - dist/index.cjs.js (CommonJS)');
      console.log('  - dist/index.umd.js (UMD/Browser)');
    }

  } catch (error) {
    console.error('❌ Build failed:', error);
    if (!watchMode) {
      process.exit(1);
    }
  }
}

build(); 