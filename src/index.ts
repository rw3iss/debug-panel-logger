// Import styles - these will be auto-injected when the library is used
// @ts-ignore
import './DebugPanel/DebugPanel.scss';
// @ts-ignore
import './JsonView/JsonView.scss';

// Export main classes and utilities
export { debug, DebugPanel, ScreenPosition } from './DebugPanel/DebugPanel';
export { JsonView } from './JsonView/JsonView';
export { getWindowSize, makeDraggable, makeResizable } from './utils/domUtils';

// Export types for TypeScript users
export type {
	DebugPanelOptions,
	DebugPanelSettings, DragOptions,
	JsonViewOptions, ResizeOptions
} from './types';

// Re-export DebugPanel as default for easier importing
export { DebugPanel as default } from './DebugPanel/DebugPanel';
