# Debug Panel (dev-debug-panel)

A lightweight draggable, resizable, and snappable multi-tab debug panel for development, utilizing json diffing to only update its view with changed properties. Maintains view state across object updates to easily debug them. Works with any framework (see below for examples).

## Features

- 🎯 **Draggable & Resizable** - Position and size the panel to fit your workflow. Supports configurable snapping options and opacity controls. View settings are preserved across page reloads. Ctrl+Alt+D toggle hiding and showing the panel.

- 📊 **State Inspection** - View and track object states with JSON tree visualization. If you update an object, the view will remember it's state, allowing easier debugging.

- 📝 **Multi-tab Logging** - Organize logs by namespace/category in a tabbed scrollable view for each. Copy or delete entries easily.

- 🎨 **Auto-injected Styles** - SCSS styles are bundled and injected automatically

- 🚀 **Framework Agnostic** - Works with any web framework or vanilla JS

- 📦 **TypeScript Support** - Full type definitions included


### Looks like this:
<img src="./images/debug-panel-screenshot.png" style="width: 500px;"/>

## Installation

```bash
npm install dev-debug-panel
# or
yarn add dev-debug-panel
```

## Quick Start

### Basic Usage (Vanilla JS/TS)

Import and instantiate a DebugPanel somewhere in your client application, then log state/objects from anywhere using the global debug method:
```javascript
import { DebugPanel, debug } from 'dev-debug-panel';

// Create and show the debug panel
const panel = new DebugPanel({ position: 'bottomRight' }); // or ScreenPosition.BottomRight, etc

// Debug objects from anywhere in your app
debug(obj);
```

Calls to debug(obj) will update references to the same object using a diffing algorithm. This allows debugging many or large objects more efficient, and allows for the preservation of the view state across updates.

Note that each unique object that the panel draws instantiates its own JsonView tree element. Though it is an efficiently drawn element, tons of calls to debug(obj) with unique objects may be slow. In that case consider just combining the objects to a singlular wrapped object, and debugging that object, which will efficiently manage the objects in a single JsonView using diffing.

You can pass an optional object identifier for the first argument, to show on the panel:
```typescript
debug('config', { theme: 'dark', api: 'https://api.example.com' });

// You can also use the instance itself:
panel.debug('user', { id: 1, name: 'John', active: true });

// And add regular logs
panel.log('api', ['Fetching user data...']);
panel.log('ui', ['Button clicked', { buttonId: 'submit' }]);
```
See [examples/DebugPanelLogModule.ts](../examples/DebugPanelLogModule.ts) for an example of listening to all log events, sending them to DebugPanel automatically, and integrating with other systems.

### Example: React Integration

```tsx
import { DebugPanel, debugState } from 'dev-debug-panel';
import { useEffect, useRef } from 'react';

function App() {
  const panelRef = useRef<DebugPanel>();

  useEffect(() => {
    // Initialize panel
    panelRef.current = new DebugPanel({ show: true });

    // Cleanup on unmount
    return () => {
      panelRef.current?.hide();
    };
  }, []);

  const handleStateUpdate = () => {
    debugState('component-state', {
      timestamp: Date.now(),
      userCount: 42,
      features: ['dark-mode', 'auto-save']
    });
  };

  return (
    <div>
      <button onClick={handleStateUpdate}>Update Debug State</button>
      {/* Your app content */}
    </div>
  );
}
```

### Example: Integration with dev-loggers library
If you want to show arbitrary log events to the panel, from any existing logging system, then you can create a LogModule and register it.

For example, if using the dev-loggers package, you can draw all log() calls throughout the system to this DebugPanel by implementing a LogModule, which instantiates a global DebugPanel and registers it.

The LogModule will receive log events inside its onLog handler, and pass them to the DebugPanel to draw there.

You can register any class which implements the onLog(log) handler with addLogModule({onLog})
```typescript
import { LogModule } from 'dev-debug-panel';
import { addLogModule } from 'dev-loggers';

class DebugPanelLogModule implements LogModule {
	public name = 'DebugPanel';
	public panel: DebugPanel;

	constructor(opts: DebugPanelOptions = {}) {
		this.panel = new DebugPanel(opts);
	}

	public onLog(log: LogEvent) {
		this.panel.log(log.namespace, log.args);
	}

  //
	public print(...args: any[]) {
		if (args.length) {
			const printArgs: any[] = [];
			args.forEach((a) => {
				if (typeof a === 'object') {
					this.panel.debugState('', a);
				} else {
					printArgs.push(a);
				}
			});
		}
	}
}

// Create a global log module in your app and register it:
const debugModule = new DebugPanelLogModule({
  position: 'bottomRight',
  width: 600,
  height: 400
});

addLogModule(debugModule);

// Now all log calls from dev-loggers will appear in the debug panel.
```

## API Reference

### DebugPanel

Main class for creating and managing the debug panel.

```typescript
import { DebugPanel, ScreenPosition } from 'dev-debug-panel';

const panel = new DebugPanel({
  show?: boolean;          // Show panel immediately (default: false)
  position?: ScreenPosition; // Initial position (default: 'bottomRight')
  width?: number;          // Initial width in pixels (default: 600)
  height?: number;         // Initial height in pixels (default: 400)
  snap?: boolean;          // Enable edge snapping when dragging (default: false)
  snapPadding?: number;    // Snap distance in pixels (default: 20)
});

// Methods
panel.show();           // Show the panel
panel.hide();           // Hide the panel
panel.toggle();         // Toggle visibility
panel.addLog(namespace, message);    // Add log entry
panel.debugState(id, state);        // Update state view
```

### ScreenPosition

Available positions for the debug panel:

```typescript
enum ScreenPosition {
  TopLeft = 'topLeft',
  Top = 'top',
  TopRight = 'topRight',
  Right = 'right',
  BottomRight = 'bottomRight',
  Bottom = 'bottom',
  BottomLeft = 'bottomLeft',
  Left = 'left'
}
```

### debugState Function

Utility function to send state updates to the debug panel from anywhere:

```typescript
import { debugState } from 'dev-debug-panel';

debugState('unique-id', anyObject);
```

### JsonView

Standalone JSON tree viewer componen. This is used by the DebugPanel internally, but can be used by itself (it will be moved to a separate library soon).

It is efficient: Any calls to updateJson will update the given data using jsondiffpatch, only redrawing the properties that have changes (it uses a "mini" virtual dom).

```typescript
import { JsonView } from 'dev-debug-panel';

const jsonView = new JsonView(data, containerElement, {
  expandAll?: boolean;              	// Expand all nodes initially
  expandObjs?: Array<string | RegExp>;  // Patterns for auto-expanded paths
  useViewState?: boolean;           	// Remember expand/collapse state
});

jsonView.updateJson(newData);       	// Update via diffing with new data
```

## Keyboard Shortcuts

- **Ctrl+Alt+D** - Toggle debug panel visibility

## Features in Detail

### State Inspection
- View complex objects in an expandable JSON tree
- Real-time updates when state changes
- Collapsible sections with memory of view state
- Syntax highlighting for better readability

### Multi-tab Logging
- Automatic namespace-based tab creation
- Global tab shows all logs combined
- Per-tab clearing functionality
- Copy individual log entries

### Panel Interaction
- Drag to reposition anywhere on screen
- Resize from any edge or corner
- Adjustable opacity slider
- Persistent settings saved to localStorage
- Responsive layout for narrow panels

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  DebugPanelOptions,
  DebugPanelSettings,
  JsonViewOptions,
  ResizeOptions,
  DragOptions
} from 'dev-debug-panel';
```

## License

ISC