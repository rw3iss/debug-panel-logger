# Debug Panel (dev-debug-panel)

A lightweight, draggable, resizable, and snappable multi-tab debug panel for development. Features efficient JSON diffing to update only changed properties, persistent view state across updates and page reloads, and framework-agnostic design.

## Features

- 🎯 **Draggable & Resizable** - Drag to reposition, resize from any edge or corner with 8-way handles. Smart edge snapping with configurable padding. All settings persist across page reloads.

- 📊 **State Inspection** - View and track object states with expandable JSON tree visualization. Objects are efficiently updated using jsondiffpatch - only changed nodes are re-rendered. View state (expanded/collapsed nodes) is preserved across updates.

- 📝 **Multi-tab Logging** - Organize logs by namespace in separate tabs. Global tab shows all logs combined. Copy or delete individual entries with ease.

- 🎨 **Auto-injected Styles** - SCSS styles are compiled and bundled automatically - no manual CSS imports needed

- 🚀 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JS

- 📦 **TypeScript Support** - Full type definitions and type-safe API

- 👁️ **Object Visibility** - Hide/show individual debug objects in a separate tab for cleaner organization

- 🔲 **Layout Modes** - Switch between row (vertical) and column (horizontal) layouts for debug objects

- 🎚️ **Opacity Control** - Adjust panel transparency from the settings panel


### Looks like this:
<img src="./images/debug-panel-screenshot.png" style="width: 800px;"/>

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

You can pass an optional string id for the first argument, to show on the panel:
```typescript
debug('config', { theme: 'dark', api: 'https://api.example.com' });

// You can also use the instance itself, and regular logs:
panel.debug('user', { id: 1, name: 'John', active: true });
panel.log('api', 'Fetching user data...');
panel.log('ui', 'Button clicked', { buttonId: 'submit' });
```
See [examples/DebugPanelLogModule.ts](../examples/DebugPanelLogModule.ts) for an example of listening to all log events, sending them to DebugPanel automatically, and integrating with other systems.

### Example: React Integration

```tsx
import { DebugPanel, debug } from 'dev-debug-panel';
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
    debug('component-state', {
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

You can register any class which implements the onLog(log) handler with addLogModule:
```typescript
import { LogModule } from 'dev-debug-panel';
import { addLogModule } from 'dev-loggers';

class DebugPanelLogModule implements LogModule {
	public name = 'DebugPanel';
	public panel: DebugPanel;

	constructor(opts: DebugPanelOptions = {}) {
    // this module creates a DebugPanel for the application
		this.panel = new DebugPanel(opts);
	}

	public onLog(log: LogEvent) {
    // global log events are then drawn to the panel
		this.panel.log(log.namespace, log.args);
	}
}

// Instantiate the global log module in your app and register it:
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
  show?: boolean;              // Show panel immediately (default: false)
  position?: ScreenPosition;   // Initial position (default: BottomRight)
  width?: number;              // Initial width in pixels (default: 600)
  height?: number;             // Initial height in pixels (default: 400)
  snap?: boolean;              // Enable edge snapping (default: true)
  snapPadding?: number;        // Snap distance in pixels (default: 20)
  logToConsole?: boolean;      // Also log to browser console (default: false)
  clearOnHide?: boolean;       // Clear current tab when hiding (default: false)
  expandByDefault?: boolean;   // Expand new objects by default (default: false)
});

// Methods
panel.show();                          // Show the panel
panel.hide();                          // Hide the panel
panel.toggle();                        // Toggle visibility
panel.log(namespace, message);         // Add log entry to namespace tab
panel.debug(id, state);                // Add/update object in debug view
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

### debug Function

Utility function to send state updates to the debug panel from anywhere:

```typescript
import { debug } from 'dev-debug-panel';

debug('unique-id', anyObject);
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

- **Ctrl+Alt+D** (Windows/Linux) or **Cmd+D** (Mac) - Toggle debug panel visibility
- **Ctrl+Alt+R** (Windows/Linux) or **Cmd+Ctrl+R** (Mac) - Reposition panel to default position
- **Double-click** title bar - Stretch/unstretch panel along snapped edge

## Features in Detail

### State Inspection
- View complex objects in an expandable JSON tree
- Efficient updates using jsondiffpatch - only changed nodes re-render
- Expand/collapse individual nodes with state preservation
- Syntax highlighting for different data types
- Copy objects to clipboard as formatted JSON
- Hide/show individual objects (moved to "hidden" tab)
- Delete objects from the view
- Toggle expand/collapse all objects with one click
- Auto-expand patterns for specific object paths

### Multi-tab Logging
- Automatic namespace-based tab creation
- Global tab shows all logs combined
- Objects tab for debug state visualization
- Hidden tab for temporarily hidden objects
- Per-tab clearing functionality
- Copy individual log entries to clipboard
- Delete individual log entries
- Timestamp for each log entry

### Panel Interaction
- Drag to reposition anywhere on screen
- Resize from any edge or corner (8-way resize handles)
- Smart edge snapping when dragging or resizing
- Double-click title bar to stretch/unstretch along snapped edge
- Stretch button to toggle full height/width stretch
- Layout toggle between row and column modes
- Adjustable opacity slider (20-100%)
- Settings panel with multiple options
- All settings persist to localStorage
- Responsive layout for narrow panels
- Window resize handling maintains panel position

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

## Contributing

Issues and pull requests are welcome! Please visit the [GitHub repository](https://github.com/rw3iss/dev-debug-panel).

## Feedback & Support

- **Report Issues**: [GitHub Issues](https://github.com/rw3iss/dev-debug-panel/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/rw3iss/dev-debug-panel/discussions)
- **Email**: rw3iss@gmail.com

## Author

**Ryan Weiss**
- Website: [www.ryanweiss.net](https://www.ryanweiss.net)
- Email: rw3iss@gmail.com
- ☕ [Buy Me a Coffee](https://www.buymeacoffee.com/ryanweiss)

## License

ISC