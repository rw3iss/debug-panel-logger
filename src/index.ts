// Import styles - these will be auto-injected when the library is used
import './DebugPanel/DebugPanel.scss';
import './JsonView/JsonView.scss';

// Export main classes and utilities
export { DebugPanel, DebugPanelLogModule, ScreenPosition } from './DebugPanel/DebugPanel';
export { JsonView } from './JsonView/JsonView';
export { debugState } from './DebugPanel/DebugPanel';
export { makeResizable, makeDraggable, getWindowSize } from './utils/domUtils';

// Export types for TypeScript users
export type {
	DebugPanelOptions,
	DebugPanelSettings,
	ResizeOptions,
	DragOptions
} from './types'; 