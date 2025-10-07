# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

dev-debug-panel is a TypeScript library that provides a draggable, resizable debug panel for web applications. It features multi-tab logging, JSON state inspection with diffing, and framework-agnostic design. The library auto-injects compiled SCSS styles and supports ESM, CJS, and UMD builds.

## Build Commands

```bash
# Full build (clean, compile bundles, generate types)
npm run build

# Development mode with file watching
npm run dev

# Clean dist directory
npm run clean

# Run tests
npm run test
```

The build process (`build.js`) uses esbuild to generate three output formats:
- `dist/index.esm.js` - ES modules
- `dist/index.cjs.js` - CommonJS
- `dist/index.umd.js` - UMD for browsers (bundles all dependencies, exposes globals)

TypeScript declaration files are generated separately via `tsc`.

**Watch Mode**: `npm run dev` enables watch mode which:
- Monitors `src/` for changes and rebuilds automatically
- Disables minification for faster builds
- Sets `NODE_ENV` to "development"
- Keeps process running until Ctrl+C

## Architecture

### Core Components

**DebugPanel** (`src/DebugPanel/DebugPanel.ts`)
- Main panel controller managing UI, tabs, logs, and state tracking
- Uses EventBus for global `debug()` calls
- Manages multiple namespaced tabs (one per log namespace + special "objects" tab for state)
- Persists settings (position, size, opacity, visibility) to localStorage
- Keyboard shortcut: Ctrl+Alt+D toggles visibility
- Implements dragging via `makeDraggable()` and resizing via `makeResizable()` from domUtils

**JsonView** (`src/JsonView/JsonView.ts`)
- Standalone JSON tree viewer with expand/collapse functionality
- Uses jsondiffpatch to efficiently update only changed properties (mini virtual DOM)
- Maintains view state (expanded/collapsed nodes) across data updates via `viewStates` object
- Supports auto-expand patterns and remembering user's expand/collapse choices
- Can be used independently of DebugPanel

**domUtils** (`src/utils/domUtils.ts`)
- Provides `makeResizable()` - adds resize handles to any element (all 8 directions)
- Provides `makeDraggable()` - makes elements draggable with optional edge snapping
- Provides `getWindowSize()` utility

### Key Patterns

**Global debug() Function**
The library exports a global `debug()` function that uses EventBus to communicate with any active DebugPanel instance. This allows calling `debug(id, obj)` from anywhere without direct panel reference.

**State Diffing with JsonView**
When you call `debug(id, obj)` multiple times with the same id, JsonView uses jsondiffpatch to compute differences and only updates changed DOM nodes. The `viewStates` object tracks which nodes are expanded, preserving the user's view during updates.

**SCSS Auto-injection**
The custom esbuild SCSS plugin (`build.js:10-38`) compiles SCSS to CSS and generates JavaScript that injects a `<style>` tag on load. This eliminates the need for users to manually import CSS.

**Multi-format Builds**
- ESM/CJS externalize peer dependencies (eventbusjs, jsondiffpatch)
- UMD bundles everything and exposes globals (window.DebugPanel, window.debug, etc.)

## Module System

The package uses `"type": "module"` and provides exports for all three module formats via the `exports` field in package.json. External dependencies (eventbusjs, jsondiffpatch) are listed as both dependencies and peerDependencies.

## Development Notes

**Watch Mode**
`npm run dev` runs the build script with `--watch` flag (though watch implementation needs to be added to build.js).

**Type Definitions**
TypeScript definitions are generated from source files using `tsc --declaration --emitDeclarationOnly`. All public types are exported from `src/types.ts` and re-exported in `src/index.ts`.

**Testing**
Tests are located at `tests/index.ts` but the test implementation appears minimal.

**Examples**
See `examples/` for integration patterns:
- `example_StandaloneScript.html` - UMD build usage
- `example_DebugPanelComponent.tsx` - React integration
- `example_DebugPanelLogModule.ts` - Integration with dev-loggers library
