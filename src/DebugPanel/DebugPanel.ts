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
}

export interface DebugPanelOptions {
	show?: boolean;
	position?: ScreenPosition;
	width?: number;
	height?: number;
	snap?: boolean;
	snapPadding?: number;
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
	private opacitySlider!: HTMLInputElement;
	private tabEntries: TabEntries = {};
	private debugStates: { [id: string]: DebugState } = {};
	private activeTab: string = 'global';
	private options: DebugPanelOptions;
	private resizeThrottleTimer: number | null = null;

	constructor(options: DebugPanelOptions = {}) {
		this.options = {
			position: ScreenPosition.BottomRight,
			width: 600,
			height: 400,
			snap: true,
			snapPadding: 20,
			...options
		};

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

		const hint = document.createElement('span');
		hint.classList.add('debug-keyboard-hint');
		hint.textContent = 'Ctrl+Alt+D to hide/show';
		hint.style.color = '#999';
		hint.style.fontSize = '11px';

		const opacityContainer = document.createElement('div');
		opacityContainer.classList.add('debug-opacity-container');

		const opacityLabel = document.createElement('label');
		opacityLabel.classList.add('debug-opacity-label');
		opacityLabel.textContent = 'O';
		opacityLabel.style.fontSize = '11px';
		opacityLabel.style.color = '#999';
		opacityLabel.style.marginRight = '5px';

		this.opacitySlider = document.createElement('input');
		this.opacitySlider.type = 'range';
		this.opacitySlider.min = '20';
		this.opacitySlider.max = '100';
		this.opacitySlider.value = '100';
		this.opacitySlider.classList.add('debug-opacity-slider');
		this.opacitySlider.oninput = () => this.handleOpacityChange();

		//opacityContainer.appendChild(opacityLabel);
		opacityContainer.appendChild(this.opacitySlider);

		const clearButton = document.createElement('button');
		clearButton.classList.add('debug-clear-button');
		clearButton.textContent = 'Clear';
		clearButton.onclick = () => this.clearCurrentTab();

		const hideButton = document.createElement('button');
		hideButton.classList.add('debug-hide-button');
		hideButton.textContent = 'Hide';
		hideButton.onclick = () => this.hide();

		toolbar.appendChild(hint);
		toolbar.appendChild(opacityContainer);
		toolbar.appendChild(clearButton);
		toolbar.appendChild(hideButton);

		return toolbar;
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
			// Check for Ctrl+Alt+D
			if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'd') {
				event.preventDefault();
				this.toggle();
			}
		});
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
				opacity: opacity
			};
			localStorage.setItem('debugPanelSettings', JSON.stringify(settings));
		} catch (error) {
			console.error('Failed to save debug panel settings:', error);
		}
	}

	// Debug objects

	// Send any object to the DebugPanel for observation. Use a string id as first argument to label it.
	public debug(idOrState: any, state?: any): void {
		//if (typeof idOrState === 'string')
		let _id = idOrState;
		let _state = state;
		if (!state && typeof idOrState == 'object') {
			_id = 'object'; // todo: make object IDs?
			_state = idOrState;
		}

		// todo: this is not efficient, but is how to deal with circular dependencies.
		// const safeState = safeStringify(_state);
		// const parsedState = JSON.parse(safeState);

		if (this.debugStates[_id]) {
			this.updateDebugState(_id, _state); // parsedState);
		} else {
			this.addDebugState(_id, _state);// parsedState);
		}
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
		const clonedState = JSON.parse(JSON.stringify(state));

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

		// Clone the state to avoid reference issues
		const clonedState = JSON.parse(JSON.stringify(state));

		const debugWrapper = document.createElement('div');
		debugWrapper.classList.add('debug-state');
		debugWrapper.setAttribute('id', `debug-state-${id}`);

		const toggleObjectOpen = () => {
			const isExpanded = this.debugStates[id].isExpanded;
			this.debugStates[id].isExpanded = !isExpanded;
			debugWrapper.classList.toggle('collapsed', isExpanded);
			toggleButton.textContent = isExpanded ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
		}

		const toggleButton = document.createElement('button');
		toggleButton.classList.add('json-toggle');
		toggleButton.textContent = EXPANDED_INDICATOR;
		toggleButton.onclick = toggleObjectOpen;
		debugWrapper.appendChild(toggleButton);

		const label = document.createElement('div');
		label.classList.add('debug-state-label');
		label.innerText = id || 'untitled';
		label.onclick = toggleObjectOpen;
		debugWrapper.appendChild(label);

		const jsonWrapper = document.createElement('div');
		jsonWrapper.classList.add('json-wrapper');
		debugWrapper.appendChild(jsonWrapper);

		// Create JsonView first (it will render and may clear the container)
		const jsonView = new JsonView(clonedState, jsonWrapper as HTMLElement, {
			//expandObjs: [/children/, /children\/(.*)/, /entry/]
		});

		// Add hover actions AFTER JsonView has rendered (so they don't get cleared)
		const hoverActions = document.createElement('div');
		hoverActions.classList.add('debug-state-hover-actions');

		// Copy button
		const copyButton = document.createElement('button');
		copyButton.classList.add('debug-state-action-button', 'debug-state-copy-button');
		copyButton.innerHTML = '📋';
		copyButton.title = 'Copy JSON to clipboard';
		copyButton.onclick = () => this.copyDebugStateToClipboard(id, this.debugStates[id].state, copyButton);
		hoverActions.appendChild(copyButton);

		// Delete button
		const deleteButton = document.createElement('button');
		deleteButton.classList.add('debug-state-action-button', 'debug-state-delete-button');
		deleteButton.innerHTML = '🗑️';
		deleteButton.title = 'Delete this object';
		deleteButton.onclick = () => this.removeDebugState(id);
		hoverActions.appendChild(deleteButton);

		jsonWrapper.appendChild(hoverActions);

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
			activeContent.style.display = 'block';
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

		// Snap to left edge
		if (x < snapPadding) {
			snappedX = 0;
		}
		// Snap to right edge
		else if (x + panelWidth > windowWidth - snapPadding) {
			snappedX = windowWidth - panelWidth;
		}

		// Snap to top edge
		if (y < snapPadding) {
			snappedY = 0;
		}
		// Snap to bottom edge
		else if (y + panelHeight > windowHeight - snapPadding) {
			snappedY = windowHeight - panelHeight;
		}

		// Return the snapped coordinates
		return { x: snappedX, y: snappedY };
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