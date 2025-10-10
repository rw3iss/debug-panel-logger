import EventBus from 'eventbusjs';
import safeStringify from 'fast-safe-stringify';
import { COLLAPSED_INDICATOR, EXPANDED_INDICATOR } from '../constants';
import { JsonView } from '../JsonView/JsonView';
import { getWindowSize, makeDraggable, makeResizable } from '../utils/domUtils';

const DEBUG_STATE_NAMESPACE = 'objects';

export enum ScreenPosition {
	TopLeft = 'topLeft',
	Top = 'top',
	TopRight = 'topRight',
	Right = 'right',
	BottomRight = 'bottomRight',
	Bottom = 'bottom',
	BottomLeft = 'bottomLeft',
	Left = 'left'
}

const MIN_WIDTH = 280;

type LogEntry = {
	id: string;
	message: Array<any> | object | string;
	timestamp: Date;
};

type LogEvent = {
	namespace: string;
	args: Array<any>;
};

interface TabEntries {
	[namespace: string]: LogEntry[];
}

interface DebugState {
	state: any;
	jsonView: JsonView;
	isExpanded: boolean;
}

export interface DebugPanelSettings {
	left: number;
	top: number;
	width: number;
	height: number;
	visible: boolean;
	opacity: number;
	snappedTo?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null;
	isStretched?: boolean;
	layoutMode?: 'row' | 'column';
	logToConsole?: boolean;
	clearOnHide?: boolean;
	expandByDefault?: boolean;
}

export interface DebugPanelOptions {
	show?: boolean;
	position?: ScreenPosition;
	width?: number;
	height?: number;
	snap?: boolean;
	snapPadding?: number;
	logToConsole?: boolean;
	clearOnHide?: boolean;
	expandByDefault?: boolean;
}

/*
DebugPanel usage API:

debug(obj), debug(id, obj)
log(...args)
show()
hide()
toggle()

*/

export class DebugPanel {
	private container: HTMLElement;
	private tabContainer: HTMLElement;
	private contentContainer: HTMLElement;
	private toolbar: HTMLElement;
	private settingsPanel!: HTMLElement;
	private opacitySlider!: HTMLInputElement;
	private logToConsoleCheckbox!: HTMLInputElement;
	private clearOnHideCheckbox!: HTMLInputElement;
	private expandByDefaultCheckbox!: HTMLInputElement;
	private collapseAllButton!: HTMLButtonElement;
	private stretchButton!: HTMLButtonElement;
	private layoutButton!: HTMLButtonElement;
	private tabEntries: TabEntries = {};
	private debugStates: { [id: string]: DebugState } = {};
	private activeTab: string = 'global';
	private options: DebugPanelOptions;
	private resizeThrottleTimer: number | null = null;
	private snappedTo: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null = null;
	private isStretched: boolean = false;
	private layoutMode: 'row' | 'column' = 'row';
	private logToConsole: boolean = false;
	private clearOnHide: boolean = false;
	private expandByDefault: boolean = false;

	constructor(options: DebugPanelOptions = {}) {
		this.options = {
			position: ScreenPosition.BottomRight,
			width: 600,
			height: 400,
			snap: true,
			snapPadding: 20,
			logToConsole: false,
			clearOnHide: false,
			expandByDefault: false,
			...options
		};

		this.logToConsole = this.options.logToConsole || false;
		this.clearOnHide = this.options.clearOnHide || false;
		this.expandByDefault = this.options.expandByDefault || false;

		this.container = this.createContainer();
		this.tabContainer = this.createTabContainer();
		this.contentContainer = this.createContentContainer();

		this.container.appendChild(this.tabContainer);
		this.container.appendChild(this.contentContainer);

		this.toolbar = this.createGlobalToolbar();
		this.container.appendChild(this.toolbar);

		document.body.appendChild(this.container);

		this.addTab(DEBUG_STATE_NAMESPACE);
		this.addTab('global');

		// Restore settings first (including visibility) before setting up interactions
		this.restoreSettings();
		this.setupResizable();
		this.setupDraggable();
		this.setupEventListeners();
		this.setupKeyboardShortcut();
		this.setupWindowResizeListener();

		// Only show if explicitly requested in options AND no saved settings exist
		if (options.show && !this.loadSettings()) {
			this.show();
		}
	}

	private createContainer(): HTMLElement {
		const container = document.createElement('div');
		container.classList.add('debug-panel');
		container.style.width = `${this.options.width}px`;
		container.style.height = `${this.options.height}px`;
		container.style.position = 'fixed';
		container.style.opacity = '1'; // Set default opacity
		return container;
	}

	private createTabContainer(): HTMLElement {
		const tabContainer = document.createElement('div');
		tabContainer.classList.add('debug-panel-tabs');

		// Add double-click handler for stretch
		tabContainer.addEventListener('dblclick', () => {
			this.toggleStretch();
		});

		return tabContainer;
	}

	private createContentContainer(): HTMLElement {
		const contentContainer = document.createElement('div');
		contentContainer.classList.add('debug-panel-content');
		return contentContainer;
	}

	private createGlobalToolbar(): HTMLElement {
		const toolbar = document.createElement('div');
		toolbar.classList.add('debug-toolbar');

		// Help button
		const helpButton = document.createElement('button');
		helpButton.classList.add('debug-icon-button');
		helpButton.innerHTML = '?';
		helpButton.title = 'Help & Info';
		helpButton.onclick = () => this.showHelpOverlay();

		// Hide button
		const hideButton = document.createElement('button');
		hideButton.classList.add('debug-hide-button');
		hideButton.textContent = 'Hide';
		hideButton.title = 'Hide panel (Ctrl+Alt+D)';
		hideButton.onclick = () => this.hide();

		// Clear button
		const clearButton = document.createElement('button');
		clearButton.classList.add('debug-clear-button');
		clearButton.textContent = 'Clear';
		clearButton.title = 'Clear current tab';
		clearButton.onclick = () => this.clearCurrentTab();

		// Collapse/Expand All button
		this.collapseAllButton = document.createElement('button');
		this.collapseAllButton.classList.add('debug-icon-button');
		this.collapseAllButton.innerHTML = '{ }';
		this.updateCollapseAllTooltip();
		this.collapseAllButton.onclick = () => this.toggleExpandAll();

		// Stretch button
		this.stretchButton = document.createElement('button');
		this.stretchButton.classList.add('debug-icon-button');
		this.updateStretchButton();
		this.stretchButton.onclick = () => this.toggleStretch();

		// Layout mode button
		this.layoutButton = document.createElement('button');
		this.layoutButton.classList.add('debug-icon-button');
		this.layoutButton.innerHTML = '⚏';
		this.updateLayoutButtonTooltip();
		this.layoutButton.onclick = () => this.toggleLayoutMode();

		// Settings (cog) button
		const settingsButton = document.createElement('button');
		settingsButton.classList.add('debug-icon-button');
		settingsButton.innerHTML = '⚙';
		settingsButton.title = 'Settings';

		// Create settings panel
		this.settingsPanel = this.createSettingsPanel();

		// Toggle settings panel on click
		settingsButton.onclick = (e) => {
			e.stopPropagation();
			this.settingsPanel.classList.toggle('visible');
		};

		// Hide settings panel when clicking outside
		document.addEventListener('click', (e) => {
			if (!this.settingsPanel.contains(e.target as Node) &&
				!settingsButton.contains(e.target as Node)) {
				this.settingsPanel.classList.remove('visible');
			}
		});

		// Left side buttons
		toolbar.appendChild(helpButton);
		toolbar.appendChild(hideButton);
		toolbar.appendChild(clearButton);

		// Spacer
		const spacer = document.createElement('div');
		spacer.style.flex = '1';
		toolbar.appendChild(spacer);

		// Right side buttons
		toolbar.appendChild(this.collapseAllButton);
		toolbar.appendChild(this.stretchButton);
		toolbar.appendChild(this.layoutButton);
		toolbar.appendChild(settingsButton);
		toolbar.appendChild(this.settingsPanel);

		return toolbar;
	}

	private updateCollapseAllTooltip(): void {
		const allExpanded = Object.values(this.debugStates).every(state => state.isExpanded);
		this.collapseAllButton.title = allExpanded ? 'Collapse all objects' : 'Expand all objects';
	}

	private updateStretchButton(): void {
		// Determine icon based on snap direction
		let icon = '↔';  // Default horizontal arrows
		if (this.snappedTo === 'left' || this.snappedTo === 'right' ||
			this.snappedTo === 'topLeft' || this.snappedTo === 'topRight' ||
			this.snappedTo === 'bottomLeft' || this.snappedTo === 'bottomRight') {
			icon = '⇵';  // Vertical arrows for left/right/corner snaps
		}

		this.stretchButton.innerHTML = icon;
		this.stretchButton.title = this.isStretched ? 'Unstretch panel' : 'Stretch panel';
	}

	private updateLayoutButtonTooltip(): void {
		this.layoutButton.title = this.layoutMode === 'row'
			? 'Switch to column layout'
			: 'Switch to row layout';
	}

	private createSettingsPanel(): HTMLElement {
		const panel = document.createElement('div');
		panel.classList.add('debug-settings-panel');

		// Opacity setting
		const opacityRow = document.createElement('div');
		opacityRow.classList.add('settings-row');

		const opacityLabel = document.createElement('label');
		opacityLabel.textContent = 'Opacity';

		this.opacitySlider = document.createElement('input');
		this.opacitySlider.type = 'range';
		this.opacitySlider.min = '20';
		this.opacitySlider.max = '100';
		this.opacitySlider.value = '100';
		this.opacitySlider.classList.add('debug-opacity-slider');
		this.opacitySlider.oninput = () => this.handleOpacityChange();

		opacityRow.appendChild(opacityLabel);
		opacityRow.appendChild(this.opacitySlider);

		// Log to console checkbox
		const logToConsoleRow = document.createElement('div');
		logToConsoleRow.classList.add('settings-row');

		this.logToConsoleCheckbox = document.createElement('input');
		this.logToConsoleCheckbox.type = 'checkbox';
		this.logToConsoleCheckbox.id = 'logToConsole';
		this.logToConsoleCheckbox.checked = this.logToConsole;
		this.logToConsoleCheckbox.onchange = () => {
			this.logToConsole = this.logToConsoleCheckbox!.checked;
			this.saveSettings();
		};

		const logToConsoleLabel = document.createElement('label');
		logToConsoleLabel.htmlFor = 'logToConsole';
		logToConsoleLabel.textContent = 'Log to console';

		logToConsoleRow.appendChild(this.logToConsoleCheckbox);
		logToConsoleRow.appendChild(logToConsoleLabel);

		// Clear on hide checkbox
		const clearOnHideRow = document.createElement('div');
		clearOnHideRow.classList.add('settings-row');

		this.clearOnHideCheckbox = document.createElement('input');
		this.clearOnHideCheckbox.type = 'checkbox';
		this.clearOnHideCheckbox.id = 'clearOnHide';
		this.clearOnHideCheckbox.checked = this.clearOnHide;
		this.clearOnHideCheckbox.onchange = () => {
			this.clearOnHide = this.clearOnHideCheckbox!.checked;
			this.saveSettings();
		};

		const clearOnHideLabel = document.createElement('label');
		clearOnHideLabel.htmlFor = 'clearOnHide';
		clearOnHideLabel.textContent = 'Clear on hide';

		clearOnHideRow.appendChild(this.clearOnHideCheckbox);
		clearOnHideRow.appendChild(clearOnHideLabel);

		// Expand by default checkbox
		const expandByDefaultRow = document.createElement('div');
		expandByDefaultRow.classList.add('settings-row');

		this.expandByDefaultCheckbox = document.createElement('input');
		this.expandByDefaultCheckbox.type = 'checkbox';
		this.expandByDefaultCheckbox.id = 'expandByDefault';
		this.expandByDefaultCheckbox.checked = this.expandByDefault;
		this.expandByDefaultCheckbox.onchange = () => {
			this.expandByDefault = this.expandByDefaultCheckbox!.checked;
			this.saveSettings();
		};

		const expandByDefaultLabel = document.createElement('label');
		expandByDefaultLabel.htmlFor = 'expandByDefault';
		expandByDefaultLabel.textContent = 'Expand new objects by default';

		expandByDefaultRow.appendChild(this.expandByDefaultCheckbox);
		expandByDefaultRow.appendChild(expandByDefaultLabel);

		panel.appendChild(opacityRow);
		panel.appendChild(logToConsoleRow);
		panel.appendChild(clearOnHideRow);
		panel.appendChild(expandByDefaultRow);

		return panel;
	}

	private setupEventListeners(): void {
		EventBus.addEventListener('log', (event: any) => {
			const { namespace, message } = event.target;
			this.log(namespace, message);
		});

		// special listener for sending objects to the objects panel
		// todo:
		EventBus.addEventListener('debug', (event: any) => {
			const { id, state } = event.target;
			// if (!id || !state) {
			// 	console.log('Invalid event data for debug-state. Expected {id, state}, got:', event);
			// 	return;
			// }
			this.debug(id, state);
		});
	}

	private setupResizable(): void {
		const { width, height } = getWindowSize();

		makeResizable(this.container, {
			handles: ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
			maxWidth: width - 20,
			maxHeight: height - 20,
			minWidth: 200,
			minHeight: 150,
			snapPadding: this.options.snapPadding || 20,
			onResize: (newWidth: number) => {
				this.updateToolbarLayout(newWidth);
				this.saveSettings();
			}
		});
	}

	private setupDraggable(): void {
		if (this.options.snap) {
			makeDraggable(this.container, this.tabContainer, {
				onDrag: (x: number, y: number) => this.handleSnapWhileDragging(x, y),
				onDragEnd: () => this.saveSettings()
			});
		} else {
			makeDraggable(this.container, this.tabContainer, {
				onDragEnd: () => this.saveSettings()
			});
		}
	}

	private setupPosition(): void {
		const { width, height } = getWindowSize();
		const panelWidth = this.options.width || 600;
		const panelHeight = this.options.height || 400;

		let left = 0;
		let top = 0;

		switch (this.options.position) {
			case ScreenPosition.TopLeft:
				left = 0;
				top = 0;
				break;
			case ScreenPosition.Top:
				left = (width - panelWidth) / 2;
				top = 0;
				break;
			case ScreenPosition.TopRight:
				left = width - panelWidth;
				top = 0;
				break;
			case ScreenPosition.Right:
				left = width - panelWidth;
				top = (height - panelHeight) / 2;
				break;
			case ScreenPosition.BottomRight:
				left = width - panelWidth;
				top = height - panelHeight;
				break;
			case ScreenPosition.Bottom:
				left = (width - panelWidth) / 2;
				top = height - panelHeight;
				break;
			case ScreenPosition.BottomLeft:
				left = 0;
				top = height - panelHeight;
				break;
			case ScreenPosition.Left:
				left = 0;
				top = (height - panelHeight) / 2;
				break;
		}

		this.container.style.left = `${left}px`;
		this.container.style.top = `${top}px`;
	}

	private setupKeyboardShortcut(): void {
		document.addEventListener('keydown', (event: KeyboardEvent) => {
			// Check for Ctrl+Alt+D (Windows/Linux) or Cmd+D (Mac)
			const isCtrlAltD = event.ctrlKey && event.altKey && event.key.toLowerCase() === 'd' && !event.metaKey;
			const isCmdD = event.metaKey && event.key.toLowerCase() === 'd' && !event.ctrlKey;

			if (isCtrlAltD || isCmdD) {
				event.preventDefault();
				this.toggle();
			}
		});
	}

	private showHelpOverlay(): void {
		// Remove existing overlay if present
		const existingOverlay = this.contentContainer.querySelector('.debug-help-overlay');
		if (existingOverlay) {
			existingOverlay.remove();
			return;
		}

		const overlay = document.createElement('div');
		overlay.classList.add('debug-help-overlay');

		overlay.innerHTML = `
			<div class="debug-help-content">
				<h2>Dev Debug Panel</h2>

				<section class="help-section">
					<h3>Keyboard Shortcuts</h3>
					<ul>
						<li><kbd>Ctrl+Alt+D</kbd> (Windows/Linux) or <kbd>Cmd+D</kbd> (Mac) - Toggle panel visibility</li>
						<li><kbd>Double-click</kbd> title bar - Stretch/unstretch panel</li>
					</ul>
				</section>

				<section class="help-section">
					<h3>Library Info</h3>
					<ul class="help-links">
						<li>Version: <strong>1.1.1</strong></li>
						<li>
							<a href="https://github.com/rw3iss/dev-debug-panel" target="_blank" rel="noopener">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
									<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
								</svg>
								GitHub Repository
							</a>
						</li>
						<li>
							<a href="https://github.com/rw3iss/dev-debug-panel/issues" target="_blank" rel="noopener">
								Report Issue / Feedback
							</a>
						</li>
					</ul>
				</section>

				<section class="help-section">
					<h3>Author</h3>
					<ul class="help-links">
						<li><strong>Ryan Weiss</strong></li>
						<li>
							<a href="mailto:rw3iss@gmail.com">rw3iss@gmail.com</a>
						</li>
						<li>
							<a href="https://www.ryanweiss.net" target="_blank" rel="noopener">www.ryanweiss.net</a>
						</li>
						<li>
							<a href="https://www.buymeacoffee.com/ryanweiss" target="_blank" rel="noopener">
								☕ Buy Me a Coffee
							</a>
						</li>
					</ul>
				</section>

				<p class="help-close-hint">Click anywhere to close</p>
			</div>
		`;

		// Close on click anywhere
		overlay.addEventListener('click', () => {
			overlay.remove();
		});

		this.contentContainer.appendChild(overlay);
	}

	private setupWindowResizeListener(): void {
		window.addEventListener('resize', () => {
			// Throttle resize events to 50ms
			if (this.resizeThrottleTimer !== null) {
				return;
			}

			this.resizeThrottleTimer = window.setTimeout(() => {
				this.resizeThrottleTimer = null;
				this.repositionOnWindowResize();
			}, 50);
		});
	}

	private repositionOnWindowResize(): void {
		const { width: windowWidth, height: windowHeight } = getWindowSize();
		const panelWidth = this.container.offsetWidth;
		const panelHeight = this.container.offsetHeight;

		const currentLeft = parseInt(this.container.style.left) || this.container.offsetLeft;
		const currentTop = parseInt(this.container.style.top) || this.container.offsetTop;

		// Calculate distances to each edge
		const distanceToLeft = currentLeft;
		const distanceToRight = windowWidth - (currentLeft + panelWidth);
		const distanceToTop = currentTop;
		const distanceToBottom = windowHeight - (currentTop + panelHeight);

		// Determine which edges the panel was snapped to before resize
		const snapThreshold = 50; // If within 50px of an edge, consider it "snapped"
		const wasSnappedLeft = distanceToLeft < snapThreshold;
		const wasSnappedRight = distanceToRight < snapThreshold;
		const wasSnappedTop = distanceToTop < snapThreshold;
		const wasSnappedBottom = distanceToBottom < snapThreshold;

		let newLeft = currentLeft;
		let newTop = currentTop;

		// Snap to the edge(s) the panel was closest to
		if (wasSnappedRight) {
			// Keep panel snapped to right edge
			newLeft = windowWidth - panelWidth;
		} else if (wasSnappedLeft) {
			// Keep panel snapped to left edge
			newLeft = 0;
		} else {
			// Not snapped horizontally, ensure it stays in bounds
			newLeft = Math.max(0, Math.min(windowWidth - panelWidth, currentLeft));
		}

		if (wasSnappedBottom) {
			// Keep panel snapped to bottom edge
			newTop = windowHeight - panelHeight;
		} else if (wasSnappedTop) {
			// Keep panel snapped to top edge
			newTop = 0;
		} else {
			// Not snapped vertically, ensure it stays in bounds
			newTop = Math.max(0, Math.min(windowHeight - panelHeight, currentTop));
		}

		// Final bounds check to ensure panel is fully visible
		newLeft = Math.max(0, Math.min(windowWidth - panelWidth, newLeft));
		newTop = Math.max(0, Math.min(windowHeight - panelHeight, newTop));

		this.container.style.left = `${newLeft}px`;
		this.container.style.top = `${newTop}px`;

		this.saveSettings();
	}

	// Settings management

	private restoreSettings(): void {
		const savedSettings = this.loadSettings();

		if (savedSettings) {
			// Restore saved position and size
			this.container.style.left = `${savedSettings.left}px`;
			this.container.style.top = `${savedSettings.top}px`;
			this.container.style.width = `${savedSettings.width}px`;
			this.container.style.height = `${savedSettings.height}px`;

			// Restore opacity
			const opacity = savedSettings.opacity !== undefined ? savedSettings.opacity : 1;
			this.container.style.opacity = String(opacity);
			if (this.opacitySlider) {
				this.opacitySlider.value = String(Math.round(opacity * 100));
			}

			// Restore snap and stretch state
			if (savedSettings.snappedTo) {
				this.snappedTo = savedSettings.snappedTo;
				if (savedSettings.isStretched) {
					this.isStretched = true;
					this.applyStretch();
				}
			}

			// Restore layout mode
			if (savedSettings.layoutMode) {
				this.layoutMode = savedSettings.layoutMode;
				this.applyLayoutMode();
			}

			// Restore boolean settings
			if (savedSettings.logToConsole !== undefined) {
				this.logToConsole = savedSettings.logToConsole;
				if (this.logToConsoleCheckbox) {
					this.logToConsoleCheckbox.checked = this.logToConsole;
				}
			}
			if (savedSettings.clearOnHide !== undefined) {
				this.clearOnHide = savedSettings.clearOnHide;
				if (this.clearOnHideCheckbox) {
					this.clearOnHideCheckbox.checked = this.clearOnHide;
				}
			}
			if (savedSettings.expandByDefault !== undefined) {
				this.expandByDefault = savedSettings.expandByDefault;
				if (this.expandByDefaultCheckbox) {
					this.expandByDefaultCheckbox.checked = this.expandByDefault;
				}
			}

			// Restore visibility state without triggering saveSettings
			if (savedSettings.visible) {
				this.container.classList.add('visible');
			} else {
				this.container.classList.remove('visible');
			}
		} else {
			// Use default position if no saved settings
			this.setupPosition();
			// Don't set visibility - let the constructor handle it
		}
	}

	private loadSettings(): DebugPanelSettings | null {
		try {
			const settingsJson = localStorage.getItem('debugPanelSettings');
			if (settingsJson) {
				return JSON.parse(settingsJson);
			}
		} catch (error) {
			console.error('Failed to load debug panel settings:', error);
		}
		return null;
	}

	private saveSettings(): void {
		try {
			const opacity = parseFloat(this.container.style.opacity) || 1;
			const settings: DebugPanelSettings = {
				left: parseInt(this.container.style.left) || this.container.offsetLeft,
				top: parseInt(this.container.style.top) || this.container.offsetTop,
				width: this.container.offsetWidth,
				height: this.container.offsetHeight,
				visible: this.container.classList.contains('visible'),
				opacity: opacity,
				snappedTo: this.snappedTo,
				isStretched: this.isStretched,
				layoutMode: this.layoutMode,
				logToConsole: this.logToConsole,
				clearOnHide: this.clearOnHide,
				expandByDefault: this.expandByDefault
			};
			localStorage.setItem('debugPanelSettings', JSON.stringify(settings));
		} catch (error) {
			console.error('Failed to save debug panel settings:', error);
		}
	}

	// Debug objects

	// Send any object to the DebugPanel for observation. Use a string id as first argument to label it.
	public debug(...args: any[]): void {
		if (args.length === 0) return;

		// Log to console if enabled
		if (this.logToConsole) {
			console.log(...args);
		}

		let startIndex = 0;
		let baseId: string | null = null;

		// Check if first argument is a string (used as ID)
		if (typeof args[0] === 'string' && args.length > 1) {
			baseId = args[0];
			startIndex = 1;
		}

		// Process each argument
		for (let i = startIndex; i < args.length; i++) {
			const value = args[i];
			let id: string;

			if (baseId && args.length === 2) {
				// Single object with custom ID
				id = baseId;
			} else if (baseId) {
				// Multiple objects with base ID
				id = `${baseId}-${i - startIndex}`;
			} else {
				// Generate ID based on type
				const typeId = this.generateTypeId(value);
				id = typeId;
			}

			// Handle the value
			if (this.debugStates[id]) {
				this.updateDebugState(id, value);
			} else {
				this.addDebugState(id, value);
			}
		}
	}

	private generateTypeId(value: any): string {
		const type = Array.isArray(value) ? 'array' : typeof value;

		// Find next available index for this type
		let index = 1;
		while (this.debugStates[`${type}-${index}`]) {
			index++;
		}

		return `${type}-${index}`;
	}

	private updateDebugState(id: string, state: any): void {
		const content = this.contentContainer.querySelector(`[data-namespace="${DEBUG_STATE_NAMESPACE}"]`);
		if (!content) {
			console.error('No content for debug namespace.');
			return;
		}

		const debugWrapper: HTMLElement | null = content.querySelector(`#debug-state-${id}`);
		if (!debugWrapper) {
			console.error(`No debug state found for ${id}.`);
			return;
		}

		const jsonWrapper = debugWrapper.querySelector('.json-wrapper');
		if (!jsonWrapper) {
			console.error(`No json wrapper found for existing state ${id}`);
			return;
		}

		// Clone the state to avoid reference issues when comparing
		const clonedState = state ? JSON.parse(JSON.stringify(state)) : {}; // todo: handle undefined state better

		// Don't clear innerHTML - JsonView.updateJson needs the existing DOM to patch
		this.debugStates[id].jsonView.updateJson(clonedState);
		this.debugStates[id].state = clonedState;
	}

	private addDebugState(id: string, state: any): void {
		const content = this.contentContainer.querySelector(`[data-namespace="${DEBUG_STATE_NAMESPACE}"]`);
		if (!content) {
			console.error('No content for debug namespace.');
			return;
		}

		const debugWrapper = document.createElement('div');
		debugWrapper.classList.add('debug-state');
		debugWrapper.setAttribute('id', `debug-state-${id}`);

		const toggleObjectOpen = () => {
			const isExpanded = this.debugStates[id].isExpanded;
			this.debugStates[id].isExpanded = !isExpanded;
			debugWrapper.classList.toggle('collapsed', isExpanded);
			toggleButton.textContent = isExpanded ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
		}

		const label = document.createElement('div');
		label.classList.add('debug-state-label');

		const toggleButton = document.createElement('button');
		toggleButton.classList.add('json-toggle');
		toggleButton.textContent = EXPANDED_INDICATOR;
		toggleButton.onclick = toggleObjectOpen;
		label.appendChild(toggleButton);

		const labelText = document.createElement('span');
		labelText.classList.add('debug-state-label-text');
		labelText.innerText = id || 'untitled';
		labelText.onclick = toggleObjectOpen;
		label.appendChild(labelText);

		// Add hover actions to label
		const hoverActions = document.createElement('div');
		hoverActions.classList.add('debug-state-hover-actions');

		// Copy button
		const copyButton = document.createElement('button');
		copyButton.classList.add('debug-state-action-button', 'debug-state-copy-button');
		copyButton.innerHTML = '📋';
		copyButton.title = 'Copy JSON to clipboard';
		copyButton.onclick = (e) => {
			e.stopPropagation();
			this.copyDebugStateToClipboard(id, state, copyButton);
		};
		hoverActions.appendChild(copyButton);

		// Delete button
		const deleteButton = document.createElement('button');
		deleteButton.classList.add('debug-state-action-button', 'debug-state-delete-button');
		deleteButton.innerHTML = '🗑️';
		deleteButton.title = 'Delete this object';
		deleteButton.onclick = (e) => {
			e.stopPropagation();
			this.removeDebugState(id);
		};
		hoverActions.appendChild(deleteButton);

		label.appendChild(hoverActions);

		debugWrapper.appendChild(label);

		const jsonWrapper = document.createElement('div');
		jsonWrapper.classList.add('json-wrapper');
		debugWrapper.appendChild(jsonWrapper);

		// Handle primitives
		const isPrimitive = state === null || state === undefined ||
			typeof state === 'string' || typeof state === 'number' ||
			typeof state === 'boolean';

		let jsonView: JsonView;
		let clonedState: any;

		if (isPrimitive) {
			// Display primitive value directly
			const valueDiv = document.createElement('div');
			valueDiv.style.padding = '8px';
			valueDiv.style.color = '#ce9178';
			valueDiv.textContent = String(state);
			jsonWrapper.appendChild(valueDiv);

			// Create a dummy JsonView for consistency
			clonedState = { value: state };
			jsonView = new JsonView(clonedState, document.createElement('div'), {
				expandAll: this.expandByDefault
			});
		} else {
			// Clone the state to avoid reference issues
			clonedState = state ? JSON.parse(JSON.stringify(state)) : {};

			// Create JsonView for objects/arrays
			jsonView = new JsonView(clonedState, jsonWrapper as HTMLElement, {
				expandAll: this.expandByDefault
			});
		}

		this.debugStates[id] = {
			state: clonedState,
			jsonView,
			isExpanded: true
		};

		content.appendChild(debugWrapper);
	}

	private copyDebugStateToClipboard(id: string, state: any, button: HTMLElement): void {
		try {
			const jsonString = JSON.stringify(state, null, 2);
			navigator.clipboard.writeText(jsonString).then(() => {
				// Change icon to checkmark
				const originalContent = button.innerHTML;
				button.innerHTML = '✓';
				button.style.background = 'rgba(40, 167, 69, 0.8)';

				// Revert after 2 seconds
				setTimeout(() => {
					button.innerHTML = originalContent;
					button.style.background = '';
				}, 2000);
			}).catch((err) => {
				console.error('Failed to copy to clipboard:', err);
			});
		} catch (error) {
			console.error('Failed to stringify state:', error);
		}
	}

	private removeDebugState(id: string): void {
		const debugWrapper = document.getElementById(`debug-state-${id}`);
		if (debugWrapper) {
			debugWrapper.remove();
		}
		delete this.debugStates[id];
	}

	// Tab controls

	private addTab(namespace: string): void {
		if (this.tabEntries[namespace]) return;

		this.tabEntries[namespace] = [];

		const tab = document.createElement('button');
		tab.classList.add('debug-tab');
		tab.textContent = namespace;
		tab.onclick = () => this.switchTab(namespace);
		this.tabContainer.appendChild(tab);

		const content = document.createElement('div');
		content.classList.add('debug-tab-content');
		content.dataset.namespace = namespace;
		this.contentContainer.appendChild(content);

		if (Object.keys(this.tabEntries).length === 1) {
			this.switchTab(namespace);
		}
	}

	private clearCurrentTab(): void {
		this.clearTab(this.activeTab);
	}

	private clearTab(namespace: string): void {
		const content = this.contentContainer.querySelector(`[data-namespace="${namespace}"]`);
		if (!content) return;

		// Clear the data
		this.tabEntries[namespace] = [];

		if (namespace === DEBUG_STATE_NAMESPACE) {
			// Clear debug states
			Object.keys(this.debugStates).forEach((key) => {
				delete this.debugStates[key];
			});
		}

		// Remove all children from content
		content.innerHTML = '';
	}

	private switchTab(namespace: string): void {
		this.activeTab = namespace;

		// Update tab buttons
		this.tabContainer.querySelectorAll('.debug-tab').forEach((tab, index) => {
			const tabNamespace = Object.keys(this.tabEntries)[index];
			tab.classList.toggle('active', tabNamespace === namespace);
		});

		// Update content visibility
		this.contentContainer.querySelectorAll('.debug-tab-content').forEach((el) => {
			(el as HTMLElement).style.display = 'none';
		});

		const activeContent = this.contentContainer.querySelector(`[data-namespace="${namespace}"]`) as HTMLElement;
		if (activeContent) {
			activeContent.style.display = activeContent.classList.contains('layout-columns') ? 'flex' : 'block';;
		}
	}

	// Log controls

	public log(namespace: string, message: Array<any> | object | string): void {
		if (!this.tabEntries[namespace]) {
			this.addTab(namespace);
		}

		const logEntry: LogEntry = {
			id: `${namespace}-${Date.now()}-${Math.random()}`,
			message,
			timestamp: new Date()
		};
		this.tabEntries[namespace].push(logEntry);

		const content = this.contentContainer.querySelector(`[data-namespace="${namespace}"]`);
		if (!content) return;

		const logElement = this.createLogElement(logEntry, namespace);
		content.appendChild(logElement);

		// Add to global tab if not already global
		if (namespace !== 'global') {
			this.log('global', message);
		}
	}

	private createLogElement(logEntry: LogEntry, namespace: string): HTMLElement {
		const logElement = document.createElement('div');
		logElement.classList.add('debug-log-entry');
		logElement.dataset.logId = logEntry.id;

		const logText = document.createElement('div');
		logText.innerText = `[${logEntry.timestamp.toLocaleTimeString()}] ${this.renderLogEntry(logEntry.message)}`;
		logText.classList.add('debug-log-entry-text');

		const copyButton = document.createElement('button');
		copyButton.innerText = '📋';
		copyButton.classList.add('debug-copy-button');
		copyButton.onclick = () => navigator.clipboard.writeText(logText.innerText);

		const deleteButton = document.createElement('button');
		deleteButton.innerText = '❌';
		deleteButton.classList.add('debug-delete-button');
		deleteButton.onclick = () => this.removeLogEntry(namespace, logEntry.id, logElement);

		logElement.appendChild(logText);
		logElement.appendChild(copyButton);
		logElement.appendChild(deleteButton);

		return logElement;
	}

	private removeLogEntry(namespace: string, logId: string, logElement: HTMLElement): void {
		this.tabEntries[namespace] = this.tabEntries[namespace].filter((entry) => entry.id !== logId);
		logElement.remove();
	}

	private renderLogEntry(message: any): string {
		if (Array.isArray(message)) {
			return message.join(' ');
		}
		if (typeof message === 'object') {
			return safeStringify(message);
		}
		return String(message);
	}

	// Misc UI helpers

	private updateToolbarLayout(width: number): void {
		// Toggle narrow-panel class based on width
		if (width < MIN_WIDTH) {
			this.container.classList.add('narrow-panel');
		} else {
			this.container.classList.remove('narrow-panel');
		}
	}

	private handleOpacityChange(): void {
		const opacityPercent = parseInt(this.opacitySlider.value);
		const opacity = opacityPercent / 100;

		// Only set opacity when visible
		if (this.container.classList.contains('visible')) {
			this.container.style.opacity = String(opacity);
		}

		this.saveSettings();
	}

	private handleSnapWhileDragging(x: number, y: number): { x: number; y: number } {
		const snapPadding = this.options.snapPadding || 20;
		const { width: windowWidth, height: windowHeight } = getWindowSize();
		const panelWidth = this.container.offsetWidth;
		const panelHeight = this.container.offsetHeight;

		let snappedX = x;
		let snappedY = y;
		let newSnappedTo: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null = null;

		const snappedLeft = x < snapPadding;
		const snappedRight = x + panelWidth > windowWidth - snapPadding;
		const snappedTop = y < snapPadding;
		const snappedBottom = y + panelHeight > windowHeight - snapPadding;

		// Determine snap position
		if (snappedLeft && snappedTop) {
			snappedX = 0;
			snappedY = 0;
			newSnappedTo = 'topLeft';
		} else if (snappedRight && snappedTop) {
			snappedX = windowWidth - panelWidth;
			snappedY = 0;
			newSnappedTo = 'topRight';
		} else if (snappedLeft && snappedBottom) {
			snappedX = 0;
			snappedY = windowHeight - panelHeight;
			newSnappedTo = 'bottomLeft';
		} else if (snappedRight && snappedBottom) {
			snappedX = windowWidth - panelWidth;
			snappedY = windowHeight - panelHeight;
			newSnappedTo = 'bottomRight';
		} else if (snappedLeft) {
			snappedX = 0;
			newSnappedTo = 'left';
		} else if (snappedRight) {
			snappedX = windowWidth - panelWidth;
			newSnappedTo = 'right';
		} else if (snappedTop) {
			snappedY = 0;
			newSnappedTo = 'top';
		} else if (snappedBottom) {
			snappedY = windowHeight - panelHeight;
			newSnappedTo = 'bottom';
		}

		// Update snapped position if changed
		if (newSnappedTo !== this.snappedTo) {
			this.snappedTo = newSnappedTo;

			// Update stretch button icon
			this.updateStretchButton();

			// If stretch is enabled, apply stretch to new snap position
			if (this.isStretched && newSnappedTo) {
				setTimeout(() => this.applyStretch(), 0);
			}
		}

		// Return the snapped coordinates
		return { x: snappedX, y: snappedY };
	}

	// Toggle Methods

	private toggleExpandAll(): void {
		const allExpanded = Object.values(this.debugStates).every(state => state.isExpanded);

		Object.keys(this.debugStates).forEach(id => {
			const debugWrapper = document.getElementById(`debug-state-${id}`);
			if (!debugWrapper) return;

			this.debugStates[id].isExpanded = !allExpanded;
			debugWrapper.classList.toggle('collapsed', allExpanded);

			const toggleButton = debugWrapper.querySelector('.json-toggle') as HTMLElement;
			if (toggleButton) {
				toggleButton.textContent = allExpanded ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
			}
		});

		this.updateCollapseAllTooltip();
	}

	private toggleStretch(): void {
		// If not snapped, snap to closest edge first
		if (!this.snappedTo) {
			const { width: windowWidth, height: windowHeight } = getWindowSize();
			const panelRect = this.container.getBoundingClientRect();
			const panelCenterX = panelRect.left + panelRect.width / 2;
			const panelCenterY = panelRect.top + panelRect.height / 2;

			const distToLeft = panelCenterX;
			const distToRight = windowWidth - panelCenterX;
			const distToTop = panelCenterY;
			const distToBottom = windowHeight - panelCenterY;

			const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

			if (minDist === distToLeft) {
				this.snappedTo = 'left';
				this.container.style.left = '0px';
			} else if (minDist === distToRight) {
				this.snappedTo = 'right';
				this.container.style.left = `${windowWidth - panelRect.width}px`;
			} else if (minDist === distToTop) {
				this.snappedTo = 'top';
				this.container.style.top = '0px';
			} else {
				this.snappedTo = 'bottom';
				this.container.style.top = `${windowHeight - panelRect.height}px`;
			}
		}

		this.isStretched = !this.isStretched;

		if (this.isStretched) {
			this.applyStretch();
		} else {
			// Return to 50% of viewport and center on the snapped edge
			const { width: windowWidth, height: windowHeight } = getWindowSize();

			if (this.snappedTo === 'left' || this.snappedTo === 'right') {
				// Was stretched vertically, shrink to 50% height and center vertically
				const newHeight = windowHeight * 0.5;
				this.container.style.height = `${newHeight}px`;
				this.container.style.top = `${(windowHeight - newHeight) / 2}px`;
			} else if (this.snappedTo === 'top' || this.snappedTo === 'bottom') {
				// Was stretched horizontally, shrink to 50% width and center horizontally
				const newWidth = windowWidth * 0.5;
				this.container.style.width = `${newWidth}px`;
				this.container.style.left = `${(windowWidth - newWidth) / 2}px`;
			} else if (this.snappedTo) {
				// Corner snap - shrink to 50% in both dimensions
				const newHeight = windowHeight * 0.5;
				const newWidth = windowWidth * 0.5;
				this.container.style.height = `${newHeight}px`;
				this.container.style.width = `${newWidth}px`;

				if (this.snappedTo.includes('top')) {
					this.container.style.top = `${(windowHeight - newHeight) / 2}px`;
				} else {
					this.container.style.top = `${(windowHeight - newHeight) / 2}px`;
				}

				if (this.snappedTo.includes('Left')) {
					this.container.style.left = `${(windowWidth - newWidth) / 2}px`;
				} else {
					this.container.style.left = `${(windowWidth - newWidth) / 2}px`;
				}
			}
		}

		this.updateStretchButton();
		this.saveSettings();
	}

	private applyStretch(): void {
		if (!this.snappedTo) return;

		const { width: windowWidth, height: windowHeight } = getWindowSize();

		if (this.snappedTo === 'left') {
			this.container.style.height = `${windowHeight}px`;
			this.container.style.top = '0px';
			this.container.style.left = '0px';
		} else if (this.snappedTo === 'right') {
			this.container.style.height = `${windowHeight}px`;
			this.container.style.top = '0px';
			const panelWidth = this.container.offsetWidth;
			this.container.style.left = `${windowWidth - panelWidth}px`;
		} else if (this.snappedTo === 'top') {
			this.container.style.width = `${windowWidth}px`;
			this.container.style.left = '0px';
			this.container.style.top = '0px';
		} else if (this.snappedTo === 'bottom') {
			this.container.style.width = `${windowWidth}px`;
			this.container.style.left = '0px';
			const panelHeight = this.container.offsetHeight;
			this.container.style.top = `${windowHeight - panelHeight}px`;
		} else if (this.snappedTo) {
			// Corner snap - stretch to full height
			this.container.style.height = `${windowHeight}px`;

			if (this.snappedTo.includes('top')) {
				this.container.style.top = '0px';
			} else {
				const panelHeight = this.container.offsetHeight;
				this.container.style.top = `${windowHeight - panelHeight}px`;
			}

			if (this.snappedTo.includes('Left')) {
				this.container.style.left = '0px';
			} else {
				const panelWidth = this.container.offsetWidth;
				this.container.style.left = `${windowWidth - panelWidth}px`;
			}
		}
	}

	private toggleLayoutMode(): void {
		this.layoutMode = this.layoutMode === 'row' ? 'column' : 'row';
		this.applyLayoutMode();
		this.updateLayoutButtonTooltip();
		this.saveSettings();
	}

	private applyLayoutMode(): void {
		const content = this.contentContainer.querySelector(`[data-namespace="${this.activeTab}"]`)  as HTMLElement;
		if (!content) return;

		if (this.layoutMode === 'column') {
			content.classList.add('layout-columns');
			content.style.display = 'flex';
		} else {
			content.classList.remove('layout-columns');
			content.style.display = 'block';
		}
	}

	// Panel controls

	public show(): void {
		this.container.classList.add('visible');
		// Restore the opacity setting when showing
		const opacity = parseFloat(this.container.style.opacity) || 1;
		this.container.style.opacity = String(opacity);
		this.saveSettings();
	}

	public hide(): void {
		if (this.clearOnHide) {
			this.clearCurrentTab();
		}
		this.container.classList.remove('visible');
		this.saveSettings();
	}

	public toggle(): void {
		if (this.container.classList.contains('visible')) {
			this.hide();
		} else {
			this.show();
		}
	}
}

// Utility function to send state to debug panel
export function debug(idOrState: string, state?: any): void {
	EventBus.dispatch('debug', { id: idOrState, state });
}