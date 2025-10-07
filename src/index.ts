// Import styles - these will be auto-injected when the library is used
import './DebugPanel/DebugPanel.scss';
import './JsonView/JsonView.scss';

// Export main classes and utilities
export { DebugPanel, ScreenPosition, debug } from './DebugPanel/DebugPanel';
export { JsonView } from './JsonView/JsonView';
export { makeResizable, makeDraggable, getWindowSize } from './utils/domUtils';

// Export types for TypeScript users
export type {
	DebugPanelOptions,
	DebugPanelSettings,
	ResizeOptions,
	DragOptions,
	JsonViewOptions
} from './types';

// Re-export DebugPanel as default for easier importing
export { DebugPanel as default } from './DebugPanel/DebugPanel';
