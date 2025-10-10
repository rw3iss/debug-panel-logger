import * as jsondiffpatch from 'jsondiffpatch';
import { COLLAPSED_INDICATOR, EXPANDED_INDICATOR } from '../constants';

export type JsonViewOptions = {
	expandAll?: boolean;
	expandObjs?: Array<string | RegExp>;
	useViewState?: boolean;
};

const DEFAULT_OPTIONS = () => ({
	expandAll: false,
	expandObjects: [],
	useViewState: true
});

export class JsonView {
	private json: any;
	private parentContainer: HTMLElement;
	private options: JsonViewOptions;
	private viewStates: { [key: string]: boolean } = {}; // viewstate tree for retaining view during state updates

	constructor(json: any, parentContainer: HTMLElement, options?: JsonViewOptions) {
		this.json = json;
		this.parentContainer = parentContainer;
		this.options = Object.assign({}, DEFAULT_OPTIONS(), options || {});
		this.render();
	}

	private render(): void {
		this.parentContainer.innerHTML = ''; // Clear existing content
		const rootNode = this.drawJsonNode(this.json);
		this.parentContainer.appendChild(rootNode);
	}

	private toggleExpandNode(childNode: HTMLElement, keyPath: string, toggleButton?: HTMLElement) {
		const isCollapsed = childNode.classList.contains('collapsed');
		childNode.classList.toggle('collapsed', !isCollapsed);
		this.viewStates[keyPath] = !isCollapsed;
		if (toggleButton) toggleButton.textContent = !isCollapsed ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
	}

	private expandAllChildren(parentPath: string): void {
		// Find all child nodes under this path
		const properties = this.parentContainer.querySelectorAll(`.json-property[data-path^="${parentPath}/"]`);
		properties.forEach((prop) => {
			const path = prop.getAttribute('data-path');
			if (!path) return;

			const valueContainer = prop.querySelector('.json-value');
			if (!valueContainer) return;

			const childNode = valueContainer.querySelector('.json-node');
			if (!childNode) return;

			// Expand this node
			childNode.classList.remove('collapsed');
			this.viewStates[path] = false;

			// Update toggle button
			const toggleButton = prop.querySelector('.json-toggle') as HTMLElement;
			if (toggleButton) {
				toggleButton.textContent = EXPANDED_INDICATOR;
			}
		});
	}

	private collapseAllChildren(parentPath: string): void {
		// Find all child nodes under this path
		const properties = this.parentContainer.querySelectorAll(`.json-property[data-path^="${parentPath}/"]`);
		properties.forEach((prop) => {
			const path = prop.getAttribute('data-path');
			if (!path) return;

			const valueContainer = prop.querySelector('.json-value');
			if (!valueContainer) return;

			const childNode = valueContainer.querySelector('.json-node');
			if (!childNode) return;

			// Collapse this node
			childNode.classList.add('collapsed');
			this.viewStates[path] = true;

			// Update toggle button
			const toggleButton = prop.querySelector('.json-toggle') as HTMLElement;
			if (toggleButton) {
				toggleButton.textContent = COLLAPSED_INDICATOR;
			}
		});
	}

	private copyPropertyToClipboard(key: string, value: any): void {
		try {
			let formattedValue: string;
			if (typeof value === 'object' && value !== null) {
				formattedValue = JSON.stringify(value, null, 2);
			} else {
				formattedValue = String(value);
			}
			const textToCopy = `${key}: ${formattedValue}`;
			navigator.clipboard.writeText(textToCopy);
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
		}
	}

	private drawJsonNode(jsonObj: any, currPath: string = ''): HTMLElement {
		const nodeContainer = document.createElement('div');
		nodeContainer.classList.add('json-node');
		const propertiesContainer = document.createElement('div');
		propertiesContainer.classList.add('json-properties');

		for (const key in jsonObj) {
			if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
				const keyPath = `${currPath}${key}`;
				const propertyRow = document.createElement('div');
				propertyRow.classList.add('json-property');
				propertyRow.setAttribute('data-path', keyPath);

				const label = document.createElement('span');
				label.classList.add('json-key');

				const valueContainer = document.createElement('div');
				valueContainer.classList.add('json-value');

				const value = jsonObj[key];
				const isObject = typeof value === 'object' && value !== null;
				const isArray = Array.isArray(value);

				if (isObject) {
					label.classList.add('clickable');

					// Create key text span
					const keyText = document.createElement('span');
					if (isArray) keyText.textContent = `${key} (${value.length})`;
					else keyText.textContent = key;
					label.appendChild(keyText);

					// Add expand all/collapse all buttons
					const actions = document.createElement('div');
					actions.classList.add('json-expand-collapse-actions');

					const copyBtn = document.createElement('button');
					copyBtn.textContent = '📋';
					copyBtn.title = 'Copy property and value to clipboard';
					copyBtn.onclick = (e) => {
						e.stopPropagation();
						this.copyPropertyToClipboard(key, value);
					};
					actions.appendChild(copyBtn);

					const expandAllBtn = document.createElement('button');
					expandAllBtn.textContent = '▼';
					expandAllBtn.title = 'Expand all children';
					expandAllBtn.onclick = (e) => {
						e.stopPropagation();
						this.expandAllChildren(keyPath);
					};
					actions.appendChild(expandAllBtn);

					const collapseAllBtn = document.createElement('button');
					collapseAllBtn.textContent = '▲';
					collapseAllBtn.title = 'Collapse all children';
					collapseAllBtn.onclick = (e) => {
						e.stopPropagation();
						this.collapseAllChildren(keyPath);
					};
					actions.appendChild(collapseAllBtn);

					label.appendChild(actions);
					const hasChildren = isArray && value.length > 0 ? true : Object.keys(value).length > 0;
					propertyRow.classList.add('object');
					// Create expandable/collapsible toggle button
					const toggleButton = document.createElement('button');
					toggleButton.classList.add('json-toggle');

					// Recursive call to render child object
					const childNode = this.drawJsonNode(value, keyPath + '/');

					if (this.options.expandAll) {
						toggleButton.textContent = EXPANDED_INDICATOR;
					} else {
						let expand = false;
						// expand empty objects by default:
						if (isArray && hasChildren) {
							expand = true;
						} else {
							this.options.expandObjs?.forEach((e) => {
								if (new RegExp(e).test(keyPath)) expand = true;
							});
						}

						// if a viewstate exists use that always:
						if (this.options.useViewState) {
							if (typeof this.viewStates[keyPath] !== 'undefined') expand = !this.viewStates[keyPath];
						}

						if (expand) {
							toggleButton.textContent = EXPANDED_INDICATOR;
						} else {
							toggleButton.textContent = COLLAPSED_INDICATOR;
							childNode.classList.add('collapsed'); // Start collapsed

						}
					}

					// Toggle function for expanding/collapsing
					toggleButton.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
					label.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);

					propertyRow.appendChild(toggleButton);
					valueContainer.appendChild(childNode);
				} else {
					// Simple value - add colon suffix
					label.textContent = key + ': ';
					valueContainer.textContent = String(value);
				}

				propertyRow.appendChild(label);
				propertyRow.appendChild(valueContainer);
				propertiesContainer.appendChild(propertyRow);
			}
		}

		nodeContainer.appendChild(propertiesContainer);
		return nodeContainer;
	}

	public updateJson(newJson: any): void {
		const delta = jsondiffpatch.diff(this.json, newJson);
		if (!delta) return; // No changes

		// Update only the changed DOM nodes, passing newJson so getValueAtPath can use it
		this.patchDOM(delta, '', newJson);

		// Update the reference to the new JSON data
		this.json = newJson;
	}

	private patchDOM(delta: any, currentPath: string = '', newJson?: any): void {
		const sourceJson = newJson || this.json;

		for (const key in delta) {
			if (!Object.prototype.hasOwnProperty.call(delta, key)) continue;

			const change = delta[key];
			const keyPath = currentPath ? `${currentPath}${key}` : key;

			// Check if this is a jsondiffpatch operation marker
			if (key === '_t') continue; // Array marker

			// Find the DOM node for this path
			const propertyNode = this.parentContainer.querySelector(
				`.json-property[data-path="${keyPath}"]`
			) as HTMLElement;

			if (Array.isArray(change)) {
				// Simple value change: [oldValue, newValue]
				if (change.length === 2) {
					const newValue = this.getValueAtPath(sourceJson, keyPath);
					this.updateValueNode(propertyNode, keyPath, newValue);
				}
				// Deleted value: [oldValue, 0, 0]
				else if (change.length === 3 && change[1] === 0 && change[2] === 0) {
					if (propertyNode) propertyNode.remove();
				}
				// New value: [newValue]
				else if (change.length === 1) {
					this.addPropertyNode(keyPath, change[0]);
				}
			} else if (typeof change === 'object') {
				// Nested object changes - recurse
				this.patchDOM(change, keyPath + '/', sourceJson);
			}
		}
	}

	private getValueAtPath(obj: any, path: string): any {
		const parts = path.split('/').filter((p) => p);
		let current = obj;
		for (const part of parts) {
			if (current === null || current === undefined) return undefined;
			current = current[part];
		}
		return current;
	}

	private updateValueNode(propertyNode: HTMLElement | null, keyPath: string, newValue: any): void {
		if (!propertyNode) return;

		const valueContainer = propertyNode.querySelector('.json-value') as HTMLElement;
		if (!valueContainer) return;

		const isObject = typeof newValue === 'object' && newValue !== null;

		if (isObject) {
			// Object/array changed - need to redraw the entire subtree
			const key = keyPath.split('/').filter((p) => p).pop() || '';
			const parentPath = keyPath.substring(0, keyPath.lastIndexOf(key));

			// Clear old content
			valueContainer.innerHTML = '';
			propertyNode.classList.add('object');

			// Redraw the node
			const label = propertyNode.querySelector('.json-key') as HTMLElement;
			const isArray = Array.isArray(newValue);

			if (label) {
				label.classList.add('clickable');
				label.innerHTML = ''; // Clear existing content

				// Create key text span
				const keyText = document.createElement('span');
				if (isArray) {
					keyText.textContent = `${key} (${newValue.length})`;
				} else {
					keyText.textContent = key;
				}
				label.appendChild(keyText);

				// Add expand all/collapse all buttons
				const actions = document.createElement('div');
				actions.classList.add('json-expand-collapse-actions');

				const copyBtn = document.createElement('button');
				copyBtn.textContent = '📋';
				copyBtn.title = 'Copy property and value to clipboard';
				copyBtn.onclick = (e) => {
					e.stopPropagation();
					this.copyPropertyToClipboard(key, newValue);
				};
				actions.appendChild(copyBtn);

				const expandAllBtn = document.createElement('button');
				expandAllBtn.textContent = '▼';
				expandAllBtn.title = 'Expand all children';
				expandAllBtn.onclick = (e) => {
					e.stopPropagation();
					this.expandAllChildren(keyPath);
				};
				actions.appendChild(expandAllBtn);

				const collapseAllBtn = document.createElement('button');
				collapseAllBtn.textContent = '▲';
				collapseAllBtn.title = 'Collapse all children';
				collapseAllBtn.onclick = (e) => {
					e.stopPropagation();
					this.collapseAllChildren(keyPath);
				};
				actions.appendChild(collapseAllBtn);

				label.appendChild(actions);
			}

			// Check if toggle button already exists
			let toggleButton = propertyNode.querySelector('.json-toggle') as HTMLElement;
			if (!toggleButton) {
				toggleButton = document.createElement('button');
				toggleButton.classList.add('json-toggle');
				propertyNode.insertBefore(toggleButton, label);
			}

			// Recursive call to render child object
			const childNode = this.drawJsonNode(newValue, keyPath + '/');

			// Preserve expand state if it exists
			const wasExpanded = this.viewStates[keyPath];
			if (typeof wasExpanded !== 'undefined') {
				if (wasExpanded) {
					toggleButton.textContent = EXPANDED_INDICATOR;
				} else {
					toggleButton.textContent = COLLAPSED_INDICATOR;
					childNode.classList.add('collapsed');
				}
			} else {
				toggleButton.textContent = COLLAPSED_INDICATOR;
				childNode.classList.add('collapsed');
			}

			toggleButton.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
			if (label) {
				label.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
			}

			valueContainer.appendChild(childNode);
		} else {
			// Simple value - just update text
			propertyNode.classList.remove('object');
			const toggleButton = propertyNode.querySelector('.json-toggle');
			if (toggleButton) toggleButton.remove();

			valueContainer.innerHTML = '';
			valueContainer.textContent = String(newValue);
		}
	}

	private addPropertyNode(keyPath: string, value: any): void {
		const pathParts = keyPath.split('/').filter((p) => p);
		const key = pathParts.pop() || '';
		const parentPath = pathParts.join('/');

		// Find parent container
		let parentContainer: HTMLElement | null;
		if (parentPath) {
			const parentProperty = this.parentContainer.querySelector(
				`.json-property[data-path="${parentPath}"]`
			) as HTMLElement;
			if (parentProperty) {
				parentContainer = parentProperty.querySelector('.json-properties') as HTMLElement;
			} else {
				return; // Parent not found
			}
		} else {
			parentContainer = this.parentContainer.querySelector('.json-properties') as HTMLElement;
		}

		if (!parentContainer) return;

		// Create new property row
		const propertyRow = document.createElement('div');
		propertyRow.classList.add('json-property');
		propertyRow.setAttribute('data-path', keyPath);

		const label = document.createElement('span');
		label.classList.add('json-key');

		const valueContainer = document.createElement('div');
		valueContainer.classList.add('json-value');

		const isObject = typeof value === 'object' && value !== null;
		const isArray = Array.isArray(value);

		if (isObject) {
			label.classList.add('clickable');

			// Create key text span
			const keyText = document.createElement('span');
			if (isArray) keyText.textContent = `${key} (${value.length})`;
			else keyText.textContent = key;
			label.appendChild(keyText);

			// Add expand all/collapse all buttons
			const actions = document.createElement('div');
			actions.classList.add('json-expand-collapse-actions');

			const copyBtn = document.createElement('button');
			copyBtn.textContent = '📋';
			copyBtn.title = 'Copy property and value to clipboard';
			copyBtn.onclick = (e) => {
				e.stopPropagation();
				this.copyPropertyToClipboard(key, value);
			};
			actions.appendChild(copyBtn);

			const expandAllBtn = document.createElement('button');
			expandAllBtn.textContent = '▼';
			expandAllBtn.title = 'Expand all children';
			expandAllBtn.onclick = (e) => {
				e.stopPropagation();
				this.expandAllChildren(keyPath);
			};
			actions.appendChild(expandAllBtn);

			const collapseAllBtn = document.createElement('button');
			collapseAllBtn.textContent = '▲';
			collapseAllBtn.title = 'Collapse all children';
			collapseAllBtn.onclick = (e) => {
				e.stopPropagation();
				this.collapseAllChildren(keyPath);
			};
			actions.appendChild(collapseAllBtn);

			label.appendChild(actions);
			propertyRow.classList.add('object');

			const toggleButton = document.createElement('button');
			toggleButton.classList.add('json-toggle');
			toggleButton.textContent = COLLAPSED_INDICATOR;

			const childNode = this.drawJsonNode(value, keyPath + '/');
			childNode.classList.add('collapsed');

			toggleButton.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
			label.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);

			propertyRow.appendChild(toggleButton);
			valueContainer.appendChild(childNode);
		} else {
			// Simple value - add colon suffix
			label.textContent = key + ': ';
			valueContainer.textContent = String(value);
		}

		propertyRow.appendChild(label);
		propertyRow.appendChild(valueContainer);
		parentContainer.appendChild(propertyRow);
	}
}