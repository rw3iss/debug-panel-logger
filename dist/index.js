// src/DebugPanel/DebugPanel.scss
var css = '.debug-panel{position:fixed;z-index:99999;background:#222;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;font-family:Arial,sans-serif;color:#fff;transition:transform .1s ease-in-out,visibility .1s ease-in-out}.debug-panel.visible{visibility:visible;transform:translateY(0)}.debug-panel:not(.visible){visibility:hidden;transform:translateY(10px);pointer-events:none}.debug-panel .debug-panel-tabs{display:flex;flex-wrap:wrap;background:#1a1a1a;padding:6px 6px 0 6px;gap:3px;cursor:grab;user-select:none}.debug-panel .debug-panel-tabs:active{cursor:grabbing}.debug-panel .debug-panel-tabs .debug-tab{background:#2d2d2d;color:#888;padding:5px 6px 7px;margin:0;border:none;border-top-left-radius:6px;border-top-right-radius:6px;cursor:pointer;position:relative;box-shadow:inset 0 -2px 4px rgba(0,0,0,.3);font-size:12px;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif}.debug-panel .debug-panel-tabs .debug-tab:hover{background:#353535;color:#aaa}.debug-panel .debug-panel-tabs .debug-tab:focus{outline:none}.debug-panel .debug-panel-tabs .debug-tab.active{background:linear-gradient(to bottom, #3f6d9c, #324f6e, #121b25);color:#fff;box-shadow:0 -3px 8px rgba(0,102,204,.4),inset 0 1px 0 hsla(0,0%,100%,.2);z-index:1;border-bottom-left-radius:0;border-bottom-right-radius:0}.debug-panel .debug-panel-tabs .debug-tab.debug-tab-hidden{margin-left:auto}.debug-panel .debug-panel-content{flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:0;background:#0d0d0d;overscroll-behavior:contain}.debug-panel .debug-panel-content .debug-tab-content{display:none;flex-direction:column;flex:1;gap:2px;padding:5px 0}.debug-panel .debug-panel-content .debug-tab-content.layout-columns{display:flex;flex-direction:row;overflow-x:auto;overflow-y:hidden}.debug-panel .debug-panel-content .debug-tab-content.layout-columns .debug-state{min-width:150px;flex:1 1 0;padding:0 2px}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry{background:#292929;color:#ddd;padding:5px 8px;border-radius:4px;font-size:12px;word-break:break-word;border-left:3px solid #007bff;position:relative;display:flex;align-items:center}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry:hover .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry:hover .debug-copy-button{opacity:1}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-log-entry-text{flex:1;padding-right:70px}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{position:absolute;top:50%;transform:translateY(-50%);background:rgba(100,100,100,.8);border:none;cursor:pointer;transition:background .1s}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button:focus,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:focus,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:focus{outline:none}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{color:#fff;display:flex;align-items:center;justify-content:center;padding:0;margin:0;font-size:14px;width:20px;height:20px;border-radius:3px;transition:background .1s,transform .1s}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:hover{transform:scale(1.1)}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button:active,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:active,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:active{transform:scale(0.95)}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{border-radius:50%;opacity:0;transition:opacity .1s,background .1s}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:hover{background:#969696}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{right:36px;opacity:.7}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:hover{opacity:1}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button{right:8px;opacity:.7}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:hover{opacity:1}.debug-panel .debug-toolbar{display:flex;box-sizing:border-box;width:100%;align-items:center;gap:2px;padding:2px;background:#111;border-top:1px solid hsla(0,0%,100%,.1);flex-wrap:wrap;position:relative}.debug-panel .debug-toolbar .debug-opacity-container{display:flex;align-items:center;gap:0;max-width:100px;min-width:40px;flex-shrink:1;padding:4px 0}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-label{font-size:11px;color:#999;white-space:nowrap}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider{flex:1;min-width:40px;width:100%;height:4px;background:#444;border-radius:2px;outline:none;-webkit-appearance:none;appearance:none}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;background:#007bff;cursor:pointer;border-radius:50%;position:relative;top:-4px;transition:background .1s}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-thumb:hover{background:#0056b3}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-thumb{width:14px;height:14px;background:#007bff;cursor:pointer;border-radius:50%;border:none;position:relative;top:-4px;transition:background .1s}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-thumb:hover{background:#0056b3}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-runnable-track,.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-track{height:4px;background:#444;border-radius:2px}.debug-panel .debug-toolbar button{border:none;cursor:pointer;transition:background .1s}.debug-panel .debug-toolbar button:focus{outline:none}.debug-panel .debug-toolbar button{background:#ba6c38;color:#fff;padding:4px 6px;margin:2px;border-radius:4px;font-size:12px;white-space:nowrap;flex-shrink:0}.debug-panel .debug-toolbar button:hover{background:#c9302c}.debug-panel .debug-toolbar button.debug-icon-button{font-size:13px;padding:3px 5px;background:#555}.debug-panel .debug-toolbar button.debug-icon-button:hover{background:#666}.debug-panel .debug-toolbar .debug-settings-panel{position:absolute;bottom:100%;right:0;background:#1a1a1a;border:1px solid #444;border-radius:6px;padding:12px;margin-bottom:8px;box-shadow:0 4px 12px rgba(0,0,0,.5);min-width:200px;display:none;flex-direction:column;gap:10px;z-index:1000}.debug-panel .debug-toolbar .debug-settings-panel.visible{display:flex}.debug-panel .debug-toolbar .debug-settings-panel::before{content:"";position:absolute;top:-20px;left:-20px;right:-20px;bottom:-20px;z-index:-1}.debug-panel .debug-toolbar .debug-settings-panel .settings-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#ccc}.debug-panel .debug-toolbar .debug-settings-panel .settings-row label{flex:1;cursor:pointer;user-select:none}.debug-panel .debug-toolbar .debug-settings-panel .settings-row input[type=checkbox]{cursor:pointer}.debug-panel .debug-toolbar .debug-settings-panel .settings-row .debug-opacity-slider{flex:1;min-width:100px}.debug-panel .resize-handle{position:absolute;background:hsla(0,0%,100%,.1);z-index:10;transition:background .1s}.debug-panel .resize-handle:hover{background:hsla(0,0%,100%,.3)}.debug-panel .resize-left,.debug-panel .resize-right{top:0;bottom:0;width:6px;cursor:ew-resize}.debug-panel .resize-left{left:-3px}.debug-panel .resize-right{right:-3px}.debug-panel .resize-top,.debug-panel .resize-bottom{left:0;right:0;height:6px;cursor:ns-resize}.debug-panel .resize-top{top:-3px}.debug-panel .resize-bottom{bottom:-3px}.debug-panel .resize-top-left,.debug-panel .resize-top-right,.debug-panel .resize-bottom-left,.debug-panel .resize-bottom-right{width:10px;height:10px}.debug-panel .resize-top-left{left:-3px;top:-3px;cursor:nwse-resize}.debug-panel .resize-top-right{right:-3px;top:-3px;cursor:nesw-resize}.debug-panel .resize-bottom-left{left:-3px;bottom:-3px;cursor:nesw-resize}.debug-panel .resize-bottom-right{right:-3px;bottom:-3px;cursor:nwse-resize}.debug-panel .debug-help-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.95);z-index:1000;display:flex;align-items:flex-start;justify-content:center;padding:20px;overflow-y:auto;cursor:pointer;box-sizing:border-box}.debug-panel .debug-help-overlay .debug-help-content{background:linear-gradient(to bottom, #2a2a2a, #1a1a1a);border-radius:8px;padding:30px;max-width:500px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.5);border:1px solid #444;margin-top:auto;margin-bottom:auto;box-sizing:border-box}.debug-panel .debug-help-overlay .debug-help-content h2{margin:0 0 20px 0;color:#fff;font-size:24px;font-weight:bold;text-align:center;border-bottom:2px solid #007bff;padding-bottom:10px}.debug-panel .debug-help-overlay .debug-help-content .help-section{margin-bottom:25px}.debug-panel .debug-help-overlay .debug-help-content .help-section h3{color:#9cdcfe;font-size:16px;margin:0 0 10px 0;font-weight:bold}.debug-panel .debug-help-overlay .debug-help-content .help-section ul{list-style:none;padding:0;margin:0}.debug-panel .debug-help-overlay .debug-help-content .help-section ul li{padding:6px 0;color:#ddd;font-size:13px;line-height:1.5}.debug-panel .debug-help-overlay .debug-help-content .help-section ul li kbd{background:#333;border:1px solid #555;border-radius:3px;padding:2px 6px;font-family:monospace;font-size:12px;color:#9cdcfe}.debug-panel .debug-help-overlay .debug-help-content .help-section ul li strong{color:#fff}.debug-panel .debug-help-overlay .debug-help-content .help-section .help-links a{color:#4fc3f7;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color .1s}.debug-panel .debug-help-overlay .debug-help-content .help-section .help-links a:hover{color:#81d4fa;text-decoration:underline}.debug-panel .debug-help-overlay .debug-help-content .help-section .help-links a svg{vertical-align:middle}.debug-panel .debug-help-overlay .debug-help-content .help-close-hint{text-align:center;color:#888;font-size:12px;margin:20px 0 0 0;font-style:italic}.debug-state{position:relative;flex:1 1 100%;display:flex;flex-direction:column;margin-bottom:5px;width:100%}.debug-state .debug-state-label{font-size:13px;font-weight:bold;padding:5px 2px 5px 3px;margin-bottom:0;color:#fff;background:linear-gradient(to bottom, #3a3a3a, #2d2d2d);border-top-left-radius:4px;border-top-right-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:all .1s ease-in-out;display:flex;align-items:center;gap:2px;width:100%;box-sizing:border-box;position:relative}.debug-state .debug-state-label:hover{background:linear-gradient(to bottom, #4a4a4a, #3d3d3d);cursor:pointer;box-shadow:0 2px 5px rgba(0,0,0,.4)}.debug-state .debug-state-label:hover .debug-state-hover-actions{opacity:1}.debug-state .debug-state-label:hover .json-toggle{color:#fff}.debug-state .debug-state-label:active{box-shadow:0 1px 2px rgba(0,0,0,.3)}.debug-state .debug-state-label .json-toggle{border:none;cursor:pointer;transition:background .1s}.debug-state .debug-state-label .json-toggle:focus{outline:none}.debug-state .debug-state-label .json-toggle{background:none;color:#888;font-size:12px;padding:0;width:20px;height:16px;transition:color .1s;flex-shrink:0}.debug-state .debug-state-label .json-toggle:hover{color:#fff}.debug-state .debug-state-label .debug-state-label-text{flex:1}.debug-state .debug-state-label .debug-state-hover-actions{display:flex;gap:4px;opacity:0;margin-right:5px;transition:opacity .1s ease-in-out;flex-shrink:0}.debug-state .debug-state-label .debug-state-action-button,.debug-state .debug-state-label .debug-state-delete-button,.debug-state .debug-state-label .debug-state-hide-button,.debug-state .debug-state-label .debug-state-copy-button{border:none;cursor:pointer;transition:background .1s}.debug-state .debug-state-label .debug-state-action-button:focus,.debug-state .debug-state-label .debug-state-delete-button:focus,.debug-state .debug-state-label .debug-state-hide-button:focus,.debug-state .debug-state-label .debug-state-copy-button:focus{outline:none}.debug-state .debug-state-label .debug-state-action-button,.debug-state .debug-state-label .debug-state-delete-button,.debug-state .debug-state-label .debug-state-hide-button,.debug-state .debug-state-label .debug-state-copy-button{color:#fff;display:flex;align-items:center;justify-content:center;padding:0;margin:0;font-size:14px;width:20px;height:20px;border-radius:3px;transition:background .1s,transform .1s}.debug-state .debug-state-label .debug-state-action-button:hover,.debug-state .debug-state-label .debug-state-delete-button:hover,.debug-state .debug-state-label .debug-state-hide-button:hover,.debug-state .debug-state-label .debug-state-copy-button:hover{transform:scale(1.1)}.debug-state .debug-state-label .debug-state-action-button:active,.debug-state .debug-state-label .debug-state-delete-button:active,.debug-state .debug-state-label .debug-state-hide-button:active,.debug-state .debug-state-label .debug-state-copy-button:active{transform:scale(0.95)}.debug-state .debug-state-label .debug-state-action-button,.debug-state .debug-state-label .debug-state-delete-button,.debug-state .debug-state-label .debug-state-hide-button,.debug-state .debug-state-label .debug-state-copy-button{background:rgba(100,100,100,.8)}.debug-state .debug-state-label .debug-state-copy-button:hover{background:rgba(34,166,120,.8)}.debug-state .debug-state-label .debug-state-hide-button:hover{background:rgba(100,100,200,.8)}.debug-state .debug-state-label .debug-state-delete-button:hover{background:rgba(198,62,41,.8)}.debug-state .json-wrapper{position:relative;padding:5px;background:#292929;max-height:400px;overflow-y:auto;overscroll-behavior:contain}.debug-state.collapsed .debug-state-label{border-radius:4px}.debug-state.collapsed .json-wrapper{display:none}';
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

// src/JsonView/JsonView.scss
var css2 = ".json-node{position:relative;margin-left:15px;padding-left:0;font-size:12px;line-height:1.2em}.json-node .json-properties{display:flex;flex-direction:column}.json-node .json-property{position:relative;display:flex;align-items:flex-start;padding:0}.json-node .json-property.object{flex-direction:column}.json-node .json-key{font-weight:bold;margin-right:5px;color:#9cdcfe;padding:2px 0;flex:0}.json-node .json-key.clickable{cursor:pointer;width:100%}.json-node .json-key.clickable+.json-value{width:100%}.json-node .json-key.clickable:hover{color:#4fc3f7;text-decoration:underline}.json-node .json-value{color:#ce9178;white-space:pre-wrap;padding:2px 0;flex:1}.json-node .json-toggle{position:absolute;left:-20px;border:none;background:none;cursor:pointer;color:#888;font-size:9px;padding:0;width:22px;height:20px;transition:color .1s}.json-node .json-toggle:hover{color:#fff}.json-node .json-toggle:focus{outline:none}.json-node .json-property:hover>.json-toggle{color:#fff}.json-node.collapsed .json-properties{display:none}";
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = css2;
  document.head.appendChild(style);
}

// src/DebugPanel/DebugPanel.ts
import EventBus from "eventbusjs";
import safeStringify from "fast-safe-stringify";

// src/constants.ts
var COLLAPSED_INDICATOR = "\u25BA";
var EXPANDED_INDICATOR = "\u25BC";

// src/JsonView/JsonView.ts
import * as jsondiffpatch from "jsondiffpatch";
var DEFAULT_OPTIONS = () => ({
  expandAll: false,
  expandObjects: [],
  useViewState: true
});
var JsonView = class {
  // viewstate tree for retaining view during state updates
  constructor(json, parentContainer, options) {
    this.viewStates = {};
    this.json = json;
    this.parentContainer = parentContainer;
    this.options = Object.assign({}, DEFAULT_OPTIONS(), options || {});
    this.render();
  }
  render() {
    this.parentContainer.innerHTML = "";
    const rootNode = this.drawJsonNode(this.json);
    this.parentContainer.appendChild(rootNode);
  }
  toggleExpandNode(childNode, keyPath, toggleButton) {
    const isCollapsed = childNode.classList.contains("collapsed");
    childNode.classList.toggle("collapsed", !isCollapsed);
    this.viewStates[keyPath] = !isCollapsed;
    if (toggleButton) toggleButton.textContent = !isCollapsed ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
  }
  drawJsonNode(jsonObj, currPath = "") {
    const nodeContainer = document.createElement("div");
    nodeContainer.classList.add("json-node");
    const propertiesContainer = document.createElement("div");
    propertiesContainer.classList.add("json-properties");
    for (const key in jsonObj) {
      if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
        const keyPath = `${currPath}${key}`;
        const propertyRow = document.createElement("div");
        propertyRow.classList.add("json-property");
        propertyRow.setAttribute("data-path", keyPath);
        const label = document.createElement("span");
        label.classList.add("json-key");
        label.textContent = key + ": ";
        const valueContainer = document.createElement("div");
        valueContainer.classList.add("json-value");
        const value = jsonObj[key];
        const isObject = typeof value === "object" && value !== null;
        const isArray = Array.isArray(value);
        if (isObject) {
          label.classList.add("clickable");
          if (isArray) label.textContent = `${key} (${value.length})`;
          else label.textContent = key;
          const hasChildren = isArray && value.length > 0 ? true : Object.keys(value).length > 0;
          propertyRow.classList.add("object");
          const toggleButton = document.createElement("button");
          toggleButton.classList.add("json-toggle");
          const childNode = this.drawJsonNode(value, keyPath + "/");
          if (this.options.expandAll) {
            toggleButton.textContent = EXPANDED_INDICATOR;
          } else {
            let expand = false;
            if (isArray && hasChildren) {
              expand = true;
            } else {
              this.options.expandObjs?.forEach((e) => {
                if (new RegExp(e).test(keyPath)) expand = true;
              });
            }
            if (this.options.useViewState) {
              if (typeof this.viewStates[keyPath] !== "undefined") expand = !this.viewStates[keyPath];
            }
            if (expand) {
              toggleButton.textContent = EXPANDED_INDICATOR;
            } else {
              toggleButton.textContent = COLLAPSED_INDICATOR;
              childNode.classList.add("collapsed");
            }
          }
          toggleButton.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
          label.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
          propertyRow.appendChild(toggleButton);
          valueContainer.appendChild(childNode);
        } else {
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
  updateJson(newJson) {
    const delta = jsondiffpatch.diff(this.json, newJson);
    if (!delta) return;
    this.patchDOM(delta, "", newJson);
    this.json = newJson;
  }
  patchDOM(delta, currentPath = "", newJson) {
    const sourceJson = newJson || this.json;
    for (const key in delta) {
      if (!Object.prototype.hasOwnProperty.call(delta, key)) continue;
      const change = delta[key];
      const keyPath = currentPath ? `${currentPath}${key}` : key;
      if (key === "_t") continue;
      const propertyNode = this.parentContainer.querySelector(
        `.json-property[data-path="${keyPath}"]`
      );
      if (Array.isArray(change)) {
        if (change.length === 2) {
          const newValue = this.getValueAtPath(sourceJson, keyPath);
          this.updateValueNode(propertyNode, keyPath, newValue);
        } else if (change.length === 3 && change[1] === 0 && change[2] === 0) {
          if (propertyNode) propertyNode.remove();
        } else if (change.length === 1) {
          this.addPropertyNode(keyPath, change[0]);
        }
      } else if (typeof change === "object") {
        this.patchDOM(change, keyPath + "/", sourceJson);
      }
    }
  }
  getValueAtPath(obj, path) {
    const parts = path.split("/").filter((p) => p);
    let current = obj;
    for (const part of parts) {
      if (current === null || current === void 0) return void 0;
      current = current[part];
    }
    return current;
  }
  updateValueNode(propertyNode, keyPath, newValue) {
    if (!propertyNode) return;
    const valueContainer = propertyNode.querySelector(".json-value");
    if (!valueContainer) return;
    const isObject = typeof newValue === "object" && newValue !== null;
    if (isObject) {
      const key = keyPath.split("/").filter((p) => p).pop() || "";
      const parentPath = keyPath.substring(0, keyPath.lastIndexOf(key));
      valueContainer.innerHTML = "";
      propertyNode.classList.add("object");
      const label = propertyNode.querySelector(".json-key");
      const isArray = Array.isArray(newValue);
      if (label) {
        label.classList.add("clickable");
        if (isArray) {
          label.textContent = `${key} (${newValue.length})`;
        } else {
          label.textContent = key;
        }
      }
      let toggleButton = propertyNode.querySelector(".json-toggle");
      if (!toggleButton) {
        toggleButton = document.createElement("button");
        toggleButton.classList.add("json-toggle");
        propertyNode.insertBefore(toggleButton, label);
      }
      const childNode = this.drawJsonNode(newValue, keyPath + "/");
      const wasExpanded = this.viewStates[keyPath];
      if (typeof wasExpanded !== "undefined") {
        if (wasExpanded) {
          toggleButton.textContent = EXPANDED_INDICATOR;
        } else {
          toggleButton.textContent = COLLAPSED_INDICATOR;
          childNode.classList.add("collapsed");
        }
      } else {
        toggleButton.textContent = COLLAPSED_INDICATOR;
        childNode.classList.add("collapsed");
      }
      toggleButton.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
      if (label) {
        label.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
      }
      valueContainer.appendChild(childNode);
    } else {
      propertyNode.classList.remove("object");
      const toggleButton = propertyNode.querySelector(".json-toggle");
      if (toggleButton) toggleButton.remove();
      valueContainer.innerHTML = "";
      valueContainer.textContent = String(newValue);
    }
  }
  addPropertyNode(keyPath, value) {
    const pathParts = keyPath.split("/").filter((p) => p);
    const key = pathParts.pop() || "";
    const parentPath = pathParts.join("/");
    let parentContainer;
    if (parentPath) {
      const parentProperty = this.parentContainer.querySelector(
        `.json-property[data-path="${parentPath}"]`
      );
      if (parentProperty) {
        parentContainer = parentProperty.querySelector(".json-properties");
      } else {
        return;
      }
    } else {
      parentContainer = this.parentContainer.querySelector(".json-properties");
    }
    if (!parentContainer) return;
    const propertyRow = document.createElement("div");
    propertyRow.classList.add("json-property");
    propertyRow.setAttribute("data-path", keyPath);
    const label = document.createElement("span");
    label.classList.add("json-key");
    label.textContent = key + ": ";
    const valueContainer = document.createElement("div");
    valueContainer.classList.add("json-value");
    const isObject = typeof value === "object" && value !== null;
    const isArray = Array.isArray(value);
    if (isObject) {
      label.classList.add("clickable");
      if (isArray) label.textContent = `${key} (${value.length})`;
      else label.textContent = key;
      propertyRow.classList.add("object");
      const toggleButton = document.createElement("button");
      toggleButton.classList.add("json-toggle");
      toggleButton.textContent = COLLAPSED_INDICATOR;
      const childNode = this.drawJsonNode(value, keyPath + "/");
      childNode.classList.add("collapsed");
      toggleButton.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
      label.onclick = () => this.toggleExpandNode(childNode, keyPath, toggleButton);
      propertyRow.appendChild(toggleButton);
      valueContainer.appendChild(childNode);
    } else {
      valueContainer.textContent = String(value);
    }
    propertyRow.appendChild(label);
    propertyRow.appendChild(valueContainer);
    parentContainer.appendChild(propertyRow);
  }
};

// src/utils/domUtils.ts
function makeResizable(container, options = {}) {
  container.querySelectorAll(".resize-handle").forEach((handle) => handle.remove());
  const {
    handles = ["top", "left", "right", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
    maxWidth = Infinity,
    maxHeight = Infinity,
    minWidth = 100,
    minHeight = 100,
    snapPadding = 20,
    onResizeStart = () => {
    },
    onResize = () => {
    },
    onResizeEnd = () => {
    }
  } = options;
  let resizing = false;
  let resizeDirection = null;
  let startX = 0, startY = 0;
  let startWidth = 0, startHeight = 0;
  let startLeft = 0, startTop = 0;
  function createHandle(position) {
    const handle = document.createElement("div");
    handle.classList.add("resize-handle", `resize-${position}`);
    handle.addEventListener("mousedown", (e) => startResizing(e, position));
    container.appendChild(handle);
  }
  function startResizing(event, direction) {
    resizing = true;
    resizeDirection = direction;
    startX = event.clientX;
    startY = event.clientY;
    startWidth = container.offsetWidth;
    startHeight = container.offsetHeight;
    startLeft = container.offsetLeft;
    startTop = container.offsetTop;
    event.preventDefault();
    event.stopPropagation();
    onResizeStart();
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
  }
  function resize(event) {
    if (!resizing || !resizeDirection) return;
    let newWidth = startWidth;
    let newHeight = startHeight;
    let newLeft = startLeft;
    let newTop = startTop;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (resizeDirection.includes("right")) {
      newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
      const rightEdge = newLeft + newWidth;
      if (Math.abs(rightEdge - windowWidth) <= snapPadding) {
        newWidth = windowWidth - newLeft;
      }
    }
    if (resizeDirection.includes("left")) {
      const potentialWidth = startWidth - deltaX;
      const potentialLeft = startLeft + deltaX;
      if (potentialWidth >= minWidth && potentialWidth <= maxWidth) {
        newWidth = potentialWidth;
        newLeft = potentialLeft;
        if (Math.abs(newLeft) <= snapPadding) {
          const diff2 = newLeft;
          newLeft = 0;
          newWidth += diff2;
        }
      }
    }
    if (resizeDirection.includes("bottom")) {
      newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
      const bottomEdge = newTop + newHeight;
      if (Math.abs(bottomEdge - windowHeight) <= snapPadding) {
        newHeight = windowHeight - newTop;
      }
    }
    if (resizeDirection.includes("top")) {
      const potentialHeight = startHeight - deltaY;
      const potentialTop = startTop + deltaY;
      if (potentialHeight >= minHeight && potentialHeight <= maxHeight) {
        newHeight = potentialHeight;
        newTop = potentialTop;
        if (Math.abs(newTop) <= snapPadding) {
          const diff2 = newTop;
          newTop = 0;
          newHeight += diff2;
        }
      }
    }
    container.style.width = `${newWidth}px`;
    container.style.height = `${newHeight}px`;
    container.style.left = `${newLeft}px`;
    container.style.top = `${newTop}px`;
    onResize(newWidth, newHeight);
  }
  function stopResizing() {
    if (!resizing) return;
    resizing = false;
    resizeDirection = null;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
    onResizeEnd();
  }
  handles.forEach((handle) => createHandle(handle));
}
function makeDraggable(element, handleElement, options = {}) {
  const dragHandle = handleElement || element;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;
  let initialWidth = 0;
  let initialHeight = 0;
  const { onDragStart, onDrag, onDragEnd, allowResize = false } = options;
  function startDragging(event) {
    const target = event.target;
    if (target.tagName === "BUTTON" || target.closest("button")) {
      return;
    }
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    const computedStyle = getComputedStyle(element);
    initialLeft = parseInt(computedStyle.left) || element.offsetLeft;
    initialTop = parseInt(computedStyle.top) || element.offsetTop;
    initialWidth = element.offsetWidth;
    initialHeight = element.offsetHeight;
    if (computedStyle.position !== "absolute" && computedStyle.position !== "fixed") {
      element.style.position = "absolute";
      element.style.left = `${initialLeft}px`;
      element.style.top = `${initialTop}px`;
    }
    event.preventDefault();
    dragHandle.style.cursor = "grabbing";
    if (onDragStart) onDragStart(event);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDragging);
  }
  function drag(event) {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;
    let newWidth = initialWidth;
    let newHeight = initialHeight;
    if (allowResize) {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const rightEdge = initialLeft + initialWidth;
      const isRightSnapped = Math.abs(rightEdge - windowWidth) < 10;
      const bottomEdge = initialTop + initialHeight;
      const isBottomSnapped = Math.abs(bottomEdge - windowHeight) < 10;
      const isLeftSnapped = Math.abs(initialLeft) < 10;
      const isTopSnapped = Math.abs(initialTop) < 10;
      if (isRightSnapped && deltaX > 0) {
        newLeft = initialLeft + deltaX;
        newWidth = initialWidth - deltaX;
        if (newWidth < 200) {
          newWidth = 200;
          newLeft = initialLeft + initialWidth - 200;
        }
      }
      if (isBottomSnapped && deltaY > 0) {
        newTop = initialTop + deltaY;
        newHeight = initialHeight - deltaY;
        if (newHeight < 150) {
          newHeight = 150;
          newTop = initialTop + initialHeight - 150;
        }
      }
      if (isLeftSnapped && deltaX < 0) {
        newLeft = 0;
        newWidth = initialWidth + deltaX;
        if (newWidth < 200) {
          newWidth = 200;
        }
      }
      if (isTopSnapped && deltaY < 0) {
        newTop = 0;
        newHeight = initialHeight + deltaY;
        if (newHeight < 150) {
          newHeight = 150;
        }
      }
      if (newWidth !== initialWidth) {
        element.style.width = `${newWidth}px`;
      }
      if (newHeight !== initialHeight) {
        element.style.height = `${newHeight}px`;
      }
    }
    if (onDrag) {
      const result = onDrag(newLeft, newTop);
      if (result && typeof result === "object") {
        if (typeof result.x === "number") newLeft = result.x;
        if (typeof result.y === "number") newTop = result.y;
      }
    }
    element.style.left = `${newLeft}px`;
    element.style.top = `${newTop}px`;
  }
  function stopDragging() {
    if (!isDragging) return;
    isDragging = false;
    dragHandle.style.cursor = "grab";
    if (onDragEnd) onDragEnd();
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDragging);
  }
  dragHandle.style.cursor = "grab";
  dragHandle.addEventListener("mousedown", startDragging);
  return () => {
    dragHandle.removeEventListener("mousedown", startDragging);
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDragging);
  };
}
function getWindowSize() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
}

// src/DebugPanel/DebugPanel.ts
var DEBUG_STATE_NAMESPACE = "objects";
var ScreenPosition = /* @__PURE__ */ ((ScreenPosition2) => {
  ScreenPosition2["TopLeft"] = "topLeft";
  ScreenPosition2["Top"] = "top";
  ScreenPosition2["TopRight"] = "topRight";
  ScreenPosition2["Right"] = "right";
  ScreenPosition2["BottomRight"] = "bottomRight";
  ScreenPosition2["Bottom"] = "bottom";
  ScreenPosition2["BottomLeft"] = "bottomLeft";
  ScreenPosition2["Left"] = "left";
  return ScreenPosition2;
})(ScreenPosition || {});
var MIN_WIDTH = 280;
var SNAP_ANIMATION_DURATION = 150;
var DebugPanel = class {
  constructor(options = {}) {
    this.tabEntries = {};
    this.debugStates = {};
    this.activeTab = "global";
    this.resizeThrottleTimer = null;
    this.snappedTo = null;
    this.isStretched = false;
    this.layoutMode = "row";
    this.logToConsole = false;
    this.clearOnHide = false;
    this.expandByDefault = false;
    this.hiddenObjects = /* @__PURE__ */ new Set();
    this.options = {
      position: "bottomRight" /* BottomRight */,
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
    this.addTab("global");
    this.addHiddenTab();
    this.restoreSettings();
    this.setupResizable();
    this.setupDraggable();
    this.setupEventListeners();
    this.setupKeyboardShortcut();
    this.setupWindowResizeListener();
    if (options.show && !this.loadSettings()) {
      this.show();
    }
  }
  createContainer() {
    const container = document.createElement("div");
    container.classList.add("debug-panel");
    container.style.width = `${this.options.width}px`;
    container.style.height = `${this.options.height}px`;
    container.style.position = "fixed";
    container.style.opacity = "1";
    container.style.transition = `left ${SNAP_ANIMATION_DURATION}ms ease-out, top ${SNAP_ANIMATION_DURATION}ms ease-out, width ${SNAP_ANIMATION_DURATION}ms ease-out, height ${SNAP_ANIMATION_DURATION}ms ease-out`;
    return container;
  }
  createTabContainer() {
    const tabContainer = document.createElement("div");
    tabContainer.classList.add("debug-panel-tabs");
    tabContainer.addEventListener("dblclick", () => {
      this.toggleStretch();
    });
    return tabContainer;
  }
  createContentContainer() {
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("debug-panel-content");
    return contentContainer;
  }
  createGlobalToolbar() {
    const toolbar = document.createElement("div");
    toolbar.classList.add("debug-toolbar");
    const helpButton = document.createElement("button");
    helpButton.classList.add("debug-icon-button");
    helpButton.innerHTML = "?";
    helpButton.title = "Help & Info";
    helpButton.onclick = () => this.showHelpOverlay();
    const hideButton = document.createElement("button");
    hideButton.classList.add("debug-hide-button");
    hideButton.textContent = "Hide";
    hideButton.title = "Hide panel (Ctrl+Alt+D)";
    hideButton.onclick = () => this.hide();
    const clearButton = document.createElement("button");
    clearButton.classList.add("debug-clear-button");
    clearButton.textContent = "Clear";
    clearButton.title = "Clear current tab";
    clearButton.onclick = () => this.clearCurrentTab();
    this.collapseAllButton = document.createElement("button");
    this.collapseAllButton.classList.add("debug-icon-button");
    this.collapseAllButton.innerHTML = "{ }";
    this.updateCollapseAllTooltip();
    this.collapseAllButton.onclick = () => this.toggleExpandAll();
    this.stretchButton = document.createElement("button");
    this.stretchButton.classList.add("debug-icon-button");
    this.updateStretchButton();
    this.stretchButton.onclick = () => this.toggleStretch();
    this.layoutButton = document.createElement("button");
    this.layoutButton.classList.add("debug-icon-button");
    this.layoutButton.innerHTML = "\u268F";
    this.updateLayoutButtonTooltip();
    this.layoutButton.onclick = () => this.toggleLayoutMode();
    const settingsButton = document.createElement("button");
    settingsButton.classList.add("debug-icon-button");
    settingsButton.innerHTML = "\u2699";
    settingsButton.title = "Settings";
    this.settingsPanel = this.createSettingsPanel();
    settingsButton.onclick = (e) => {
      e.stopPropagation();
      this.settingsPanel.classList.toggle("visible");
    };
    document.addEventListener("click", (e) => {
      if (!this.settingsPanel.contains(e.target) && !settingsButton.contains(e.target)) {
        this.settingsPanel.classList.remove("visible");
      }
    });
    toolbar.appendChild(helpButton);
    toolbar.appendChild(hideButton);
    toolbar.appendChild(clearButton);
    const spacer = document.createElement("div");
    spacer.style.flex = "1";
    toolbar.appendChild(spacer);
    toolbar.appendChild(this.collapseAllButton);
    toolbar.appendChild(this.stretchButton);
    toolbar.appendChild(this.layoutButton);
    toolbar.appendChild(settingsButton);
    toolbar.appendChild(this.settingsPanel);
    return toolbar;
  }
  updateCollapseAllTooltip() {
    const allExpanded = Object.values(this.debugStates).every((state) => state.isExpanded);
    this.collapseAllButton.title = allExpanded ? "Collapse all objects" : "Expand all objects";
  }
  updateStretchButton() {
    let icon = "\u2194";
    if (this.snappedTo === "left" || this.snappedTo === "right" || this.snappedTo === "topLeft" || this.snappedTo === "topRight" || this.snappedTo === "bottomLeft" || this.snappedTo === "bottomRight") {
      icon = "\u21F5";
    }
    this.stretchButton.innerHTML = icon;
    this.stretchButton.title = this.isStretched ? "Unstretch panel" : "Stretch panel";
  }
  updateLayoutButtonTooltip() {
    this.layoutButton.title = this.layoutMode === "row" ? "Switch to column layout" : "Switch to row layout";
  }
  createSettingsPanel() {
    const panel = document.createElement("div");
    panel.classList.add("debug-settings-panel");
    const opacityRow = document.createElement("div");
    opacityRow.classList.add("settings-row");
    const opacityLabel = document.createElement("label");
    opacityLabel.textContent = "Opacity";
    this.opacitySlider = document.createElement("input");
    this.opacitySlider.type = "range";
    this.opacitySlider.min = "20";
    this.opacitySlider.max = "100";
    this.opacitySlider.value = "100";
    this.opacitySlider.classList.add("debug-opacity-slider");
    this.opacitySlider.oninput = () => this.handleOpacityChange();
    opacityRow.appendChild(opacityLabel);
    opacityRow.appendChild(this.opacitySlider);
    const logToConsoleRow = document.createElement("div");
    logToConsoleRow.classList.add("settings-row");
    this.logToConsoleCheckbox = document.createElement("input");
    this.logToConsoleCheckbox.type = "checkbox";
    this.logToConsoleCheckbox.id = "logToConsole";
    this.logToConsoleCheckbox.checked = this.logToConsole;
    this.logToConsoleCheckbox.onchange = () => {
      this.logToConsole = this.logToConsoleCheckbox.checked;
      this.saveSettings();
    };
    const logToConsoleLabel = document.createElement("label");
    logToConsoleLabel.htmlFor = "logToConsole";
    logToConsoleLabel.textContent = "Log to console";
    logToConsoleRow.appendChild(this.logToConsoleCheckbox);
    logToConsoleRow.appendChild(logToConsoleLabel);
    const clearOnHideRow = document.createElement("div");
    clearOnHideRow.classList.add("settings-row");
    this.clearOnHideCheckbox = document.createElement("input");
    this.clearOnHideCheckbox.type = "checkbox";
    this.clearOnHideCheckbox.id = "clearOnHide";
    this.clearOnHideCheckbox.checked = this.clearOnHide;
    this.clearOnHideCheckbox.onchange = () => {
      this.clearOnHide = this.clearOnHideCheckbox.checked;
      this.saveSettings();
    };
    const clearOnHideLabel = document.createElement("label");
    clearOnHideLabel.htmlFor = "clearOnHide";
    clearOnHideLabel.textContent = "Clear on hide";
    clearOnHideRow.appendChild(this.clearOnHideCheckbox);
    clearOnHideRow.appendChild(clearOnHideLabel);
    const expandByDefaultRow = document.createElement("div");
    expandByDefaultRow.classList.add("settings-row");
    this.expandByDefaultCheckbox = document.createElement("input");
    this.expandByDefaultCheckbox.type = "checkbox";
    this.expandByDefaultCheckbox.id = "expandByDefault";
    this.expandByDefaultCheckbox.checked = this.expandByDefault;
    this.expandByDefaultCheckbox.onchange = () => {
      this.expandByDefault = this.expandByDefaultCheckbox.checked;
      this.saveSettings();
    };
    const expandByDefaultLabel = document.createElement("label");
    expandByDefaultLabel.htmlFor = "expandByDefault";
    expandByDefaultLabel.textContent = "Expand new objects by default";
    expandByDefaultRow.appendChild(this.expandByDefaultCheckbox);
    expandByDefaultRow.appendChild(expandByDefaultLabel);
    const repositionButton = document.createElement("button");
    repositionButton.textContent = "Reposition (Ctrl+Alt+R)";
    repositionButton.style.marginTop = "10px";
    repositionButton.onclick = () => this.repositionToDefault();
    const resetSettingsButton = document.createElement("button");
    resetSettingsButton.textContent = "Reset All Settings";
    resetSettingsButton.style.marginTop = "5px";
    resetSettingsButton.onclick = () => this.resetAllSettings();
    panel.appendChild(opacityRow);
    panel.appendChild(logToConsoleRow);
    panel.appendChild(clearOnHideRow);
    panel.appendChild(expandByDefaultRow);
    panel.appendChild(repositionButton);
    panel.appendChild(resetSettingsButton);
    return panel;
  }
  setupEventListeners() {
    EventBus.addEventListener("log", (event) => {
      const { namespace, message } = event.target;
      this.log(namespace, message);
    });
    EventBus.addEventListener("debug", (event) => {
      const { id, state } = event.target;
      this.debug(id, state);
    });
  }
  setupResizable() {
    const { width, height } = getWindowSize();
    makeResizable(this.container, {
      handles: ["top", "left", "right", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
      maxWidth: width - 20,
      maxHeight: height - 20,
      minWidth: 200,
      minHeight: 150,
      snapPadding: this.options.snapPadding || 20,
      onResizeStart: () => {
        this.container.style.transition = "none";
      },
      onResize: (newWidth, newHeight) => {
        this.handleResizeSnapping();
        this.updateToolbarLayout(newWidth);
        this.saveSettings();
      },
      onResizeEnd: () => {
        this.container.style.transition = `left ${SNAP_ANIMATION_DURATION}ms ease-out, top ${SNAP_ANIMATION_DURATION}ms ease-out, width ${SNAP_ANIMATION_DURATION}ms ease-out, height ${SNAP_ANIMATION_DURATION}ms ease-out`;
      }
    });
  }
  setupDraggable() {
    if (this.options.snap) {
      makeDraggable(this.container, this.tabContainer, {
        onDragStart: () => this.handleDragStart(),
        onDrag: (x, y) => this.handleSnapWhileDragging(x, y),
        onDragEnd: () => this.handleDragEnd(),
        allowResize: true
      });
    } else {
      makeDraggable(this.container, this.tabContainer, {
        onDragEnd: () => this.handleDragEnd(),
        allowResize: true
      });
    }
  }
  setupPosition() {
    const { width, height } = getWindowSize();
    const panelWidth = this.options.width || 600;
    const panelHeight = this.options.height || 400;
    let left = 0;
    let top = 0;
    switch (this.options.position) {
      case "topLeft" /* TopLeft */:
        left = 0;
        top = 0;
        break;
      case "top" /* Top */:
        left = (width - panelWidth) / 2;
        top = 0;
        break;
      case "topRight" /* TopRight */:
        left = width - panelWidth;
        top = 0;
        break;
      case "right" /* Right */:
        left = width - panelWidth;
        top = (height - panelHeight) / 2;
        break;
      case "bottomRight" /* BottomRight */:
        left = width - panelWidth;
        top = height - panelHeight;
        break;
      case "bottom" /* Bottom */:
        left = (width - panelWidth) / 2;
        top = height - panelHeight;
        break;
      case "bottomLeft" /* BottomLeft */:
        left = 0;
        top = height - panelHeight;
        break;
      case "left" /* Left */:
        left = 0;
        top = (height - panelHeight) / 2;
        break;
    }
    this.container.style.left = `${left}px`;
    this.container.style.top = `${top}px`;
  }
  setupKeyboardShortcut() {
    document.addEventListener("keydown", (event) => {
      const isCtrlAltD = event.ctrlKey && event.altKey && event.key.toLowerCase() === "d" && !event.metaKey;
      const isCmdD = event.metaKey && event.key.toLowerCase() === "d" && !event.ctrlKey;
      if (isCtrlAltD || isCmdD) {
        event.preventDefault();
        this.toggle();
        return;
      }
      if (!this.container.classList.contains("visible")) return;
      const isCtrlAltR = event.ctrlKey && event.altKey && event.key.toLowerCase() === "r" && !event.metaKey;
      const isCmdCtrlR = event.metaKey && event.ctrlKey && event.key.toLowerCase() === "r";
      if (isCtrlAltR || isCmdCtrlR) {
        event.preventDefault();
        this.repositionToDefault();
      }
    });
  }
  repositionToDefault() {
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const defaultWidth = this.options.width || 280;
    const defaultHeight = this.options.height || windowHeight * 0.5;
    const position = this.options.position || "bottomRight" /* BottomRight */;
    this.container.style.width = `${defaultWidth}px`;
    this.container.style.height = `${defaultHeight}px`;
    let left = 0;
    let top = 0;
    switch (position) {
      case "topLeft" /* TopLeft */:
        left = 0;
        top = 0;
        break;
      case "top" /* Top */:
        left = (windowWidth - defaultWidth) / 2;
        top = 0;
        break;
      case "topRight" /* TopRight */:
        left = windowWidth - defaultWidth;
        top = 0;
        break;
      case "right" /* Right */:
        left = windowWidth - defaultWidth;
        top = (windowHeight - defaultHeight) / 2;
        break;
      case "bottomRight" /* BottomRight */:
        left = windowWidth - defaultWidth;
        top = windowHeight - defaultHeight;
        break;
      case "bottom" /* Bottom */:
        left = (windowWidth - defaultWidth) / 2;
        top = windowHeight - defaultHeight;
        break;
      case "bottomLeft" /* BottomLeft */:
        left = 0;
        top = windowHeight - defaultHeight;
        break;
      case "left" /* Left */:
        left = 0;
        top = (windowHeight - defaultHeight) / 2;
        break;
    }
    this.container.style.left = `${left}px`;
    this.container.style.top = `${top}px`;
    this.updateToolbarLayout(defaultWidth);
    this.saveSettings();
  }
  resetAllSettings() {
    if (!confirm("Are you sure you want to reset all settings? This will restore the panel to its default position and clear all preferences, but keep the current data.")) {
      return;
    }
    localStorage.removeItem("debugPanelSettings");
    this.logToConsole = this.options.logToConsole || false;
    this.clearOnHide = this.options.clearOnHide || false;
    this.expandByDefault = this.options.expandByDefault || false;
    this.hiddenObjects.clear();
    this.snappedTo = null;
    this.isStretched = false;
    this.layoutMode = "row";
    if (this.logToConsoleCheckbox) this.logToConsoleCheckbox.checked = this.logToConsole;
    if (this.clearOnHideCheckbox) this.clearOnHideCheckbox.checked = this.clearOnHide;
    if (this.expandByDefaultCheckbox) this.expandByDefaultCheckbox.checked = this.expandByDefault;
    if (this.opacitySlider) {
      this.opacitySlider.value = "100";
      this.container.style.opacity = "1";
    }
    this.updateHiddenTabLabel();
    this.repositionToDefault();
  }
  showHelpOverlay() {
    const existingOverlay = this.contentContainer.querySelector(".debug-help-overlay");
    if (existingOverlay) {
      existingOverlay.remove();
      return;
    }
    const overlay = document.createElement("div");
    overlay.classList.add("debug-help-overlay");
    overlay.innerHTML = `
			<div class="debug-help-content">
				<h2>Dev Debug Panel</h2>

				<section class="help-section">
					<h3>Keyboard Shortcuts</h3>
					<ul>
						<li><kbd>Ctrl+Alt+D</kbd> (Windows/Linux) or <kbd>Cmd+D</kbd> (Mac) - Toggle panel visibility</li>
						<li><kbd>Ctrl+Alt+R</kbd> (Windows/Linux) or <kbd>Cmd+Ctrl+R</kbd> (Mac) - Reposition to default</li>
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
								\u2615 Buy Me a Coffee
							</a>
						</li>
					</ul>
				</section>

				<p class="help-close-hint">Click anywhere to close</p>
			</div>
		`;
    overlay.addEventListener("click", () => {
      overlay.remove();
    });
    this.contentContainer.appendChild(overlay);
  }
  setupWindowResizeListener() {
    window.addEventListener("resize", () => {
      if (this.resizeThrottleTimer !== null) {
        return;
      }
      this.resizeThrottleTimer = window.setTimeout(() => {
        this.resizeThrottleTimer = null;
        this.repositionOnWindowResize();
      }, 50);
    });
  }
  repositionOnWindowResize() {
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const panelWidth = this.container.offsetWidth;
    const panelHeight = this.container.offsetHeight;
    const currentLeft = parseInt(this.container.style.left) || this.container.offsetLeft;
    const currentTop = parseInt(this.container.style.top) || this.container.offsetTop;
    const distanceToLeft = currentLeft;
    const distanceToRight = windowWidth - (currentLeft + panelWidth);
    const distanceToTop = currentTop;
    const distanceToBottom = windowHeight - (currentTop + panelHeight);
    const snapThreshold = 50;
    const wasSnappedLeft = distanceToLeft < snapThreshold;
    const wasSnappedRight = distanceToRight < snapThreshold;
    const wasSnappedTop = distanceToTop < snapThreshold;
    const wasSnappedBottom = distanceToBottom < snapThreshold;
    let newLeft = currentLeft;
    let newTop = currentTop;
    if (wasSnappedRight) {
      newLeft = windowWidth - panelWidth;
    } else if (wasSnappedLeft) {
      newLeft = 0;
    } else {
      newLeft = Math.max(0, Math.min(windowWidth - panelWidth, currentLeft));
    }
    if (wasSnappedBottom) {
      newTop = windowHeight - panelHeight;
    } else if (wasSnappedTop) {
      newTop = 0;
    } else {
      newTop = Math.max(0, Math.min(windowHeight - panelHeight, currentTop));
    }
    newLeft = Math.max(0, Math.min(windowWidth - panelWidth, newLeft));
    newTop = Math.max(0, Math.min(windowHeight - panelHeight, newTop));
    this.container.style.left = `${newLeft}px`;
    this.container.style.top = `${newTop}px`;
    this.saveSettings();
  }
  // Settings management
  restoreSettings() {
    const savedSettings = this.loadSettings();
    if (savedSettings) {
      this.container.style.left = `${savedSettings.left}px`;
      this.container.style.top = `${savedSettings.top}px`;
      this.container.style.width = `${savedSettings.width}px`;
      this.container.style.height = `${savedSettings.height}px`;
      const opacity = savedSettings.opacity !== void 0 ? savedSettings.opacity : 1;
      this.container.style.opacity = String(opacity);
      if (this.opacitySlider) {
        this.opacitySlider.value = String(Math.round(opacity * 100));
      }
      if (savedSettings.snappedTo) {
        this.snappedTo = savedSettings.snappedTo;
        if (savedSettings.isStretched) {
          this.isStretched = true;
          this.applyStretch();
        }
      }
      if (savedSettings.layoutMode) {
        this.layoutMode = savedSettings.layoutMode;
        this.applyLayoutMode();
      }
      if (savedSettings.logToConsole !== void 0) {
        this.logToConsole = savedSettings.logToConsole;
        if (this.logToConsoleCheckbox) {
          this.logToConsoleCheckbox.checked = this.logToConsole;
        }
      }
      if (savedSettings.clearOnHide !== void 0) {
        this.clearOnHide = savedSettings.clearOnHide;
        if (this.clearOnHideCheckbox) {
          this.clearOnHideCheckbox.checked = this.clearOnHide;
        }
      }
      if (savedSettings.expandByDefault !== void 0) {
        this.expandByDefault = savedSettings.expandByDefault;
        if (this.expandByDefaultCheckbox) {
          this.expandByDefaultCheckbox.checked = this.expandByDefault;
        }
      }
      if (savedSettings.hiddenObjects) {
        this.hiddenObjects = new Set(savedSettings.hiddenObjects);
        this.updateHiddenTabLabel();
      }
      if (savedSettings.visible) {
        this.container.classList.add("visible");
      } else {
        this.container.classList.remove("visible");
      }
    } else {
      this.setupPosition();
    }
  }
  loadSettings() {
    try {
      const settingsJson = localStorage.getItem("debugPanelSettings");
      if (settingsJson) {
        return JSON.parse(settingsJson);
      }
    } catch (error) {
      console.error("Failed to load debug panel settings:", error);
    }
    return null;
  }
  saveSettings() {
    try {
      const opacity = parseFloat(this.container.style.opacity) || 1;
      const settings = {
        left: parseInt(this.container.style.left) || this.container.offsetLeft,
        top: parseInt(this.container.style.top) || this.container.offsetTop,
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
        visible: this.container.classList.contains("visible"),
        opacity,
        snappedTo: this.snappedTo,
        isStretched: this.isStretched,
        layoutMode: this.layoutMode,
        logToConsole: this.logToConsole,
        clearOnHide: this.clearOnHide,
        expandByDefault: this.expandByDefault,
        hiddenObjects: Array.from(this.hiddenObjects)
      };
      localStorage.setItem("debugPanelSettings", JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save debug panel settings:", error);
    }
  }
  // Debug objects
  // Send any object to the DebugPanel for observation. Use a string id as first argument to label it.
  debug(...args) {
    if (args.length === 0) return;
    if (this.logToConsole) {
      console.log(...args);
    }
    let startIndex = 0;
    let baseId = null;
    if (typeof args[0] === "string" && args.length > 1) {
      baseId = args[0];
      startIndex = 1;
    }
    for (let i = startIndex; i < args.length; i++) {
      const value = args[i];
      let id;
      if (baseId && args.length === 2) {
        id = baseId;
      } else if (baseId) {
        id = `${baseId}-${i - startIndex}`;
      } else {
        const typeId = this.generateTypeId(value);
        id = typeId;
      }
      if (this.debugStates[id]) {
        this.updateDebugState(id, value);
      } else {
        this.addDebugState(id, value);
      }
    }
  }
  generateTypeId(value) {
    const type = Array.isArray(value) ? "array" : typeof value;
    let index = 1;
    while (this.debugStates[`${type}-${index}`]) {
      index++;
    }
    return `${type}-${index}`;
  }
  updateDebugState(id, state) {
    let debugWrapper = null;
    const namespaces = [DEBUG_STATE_NAMESPACE, "hidden"];
    for (const ns of namespaces) {
      const content = this.contentContainer.querySelector(`[data-namespace="${ns}"]`);
      if (content) {
        debugWrapper = content.querySelector(`#debug-state-${id}`);
        if (debugWrapper) break;
      }
    }
    if (!debugWrapper) {
      console.error(`No debug state found for ${id}.`);
      return;
    }
    const jsonWrapper = debugWrapper.querySelector(".json-wrapper");
    if (!jsonWrapper) {
      console.error(`No json wrapper found for existing state ${id}`);
      return;
    }
    const clonedState = state ? JSON.parse(JSON.stringify(state)) : {};
    this.debugStates[id].jsonView.updateJson(clonedState);
    this.debugStates[id].state = clonedState;
  }
  addDebugState(id, state) {
    const targetNamespace = this.hiddenObjects.has(id) ? "hidden" : DEBUG_STATE_NAMESPACE;
    const content = this.contentContainer.querySelector(`[data-namespace="${targetNamespace}"]`);
    if (!content) {
      console.error(`No content for ${targetNamespace} namespace.`);
      return;
    }
    const debugWrapper = document.createElement("div");
    debugWrapper.classList.add("debug-state");
    debugWrapper.setAttribute("id", `debug-state-${id}`);
    const toggleObjectOpen = () => {
      const isExpanded = this.debugStates[id].isExpanded;
      this.debugStates[id].isExpanded = !isExpanded;
      debugWrapper.classList.toggle("collapsed", isExpanded);
      toggleButton.textContent = isExpanded ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
    };
    const label = document.createElement("div");
    label.classList.add("debug-state-label");
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("json-toggle");
    toggleButton.textContent = EXPANDED_INDICATOR;
    toggleButton.onclick = toggleObjectOpen;
    label.appendChild(toggleButton);
    const labelText = document.createElement("span");
    labelText.classList.add("debug-state-label-text");
    labelText.innerText = id || "untitled";
    labelText.onclick = toggleObjectOpen;
    label.appendChild(labelText);
    const hoverActions = document.createElement("div");
    hoverActions.classList.add("debug-state-hover-actions");
    const copyButton = document.createElement("button");
    copyButton.classList.add("debug-state-action-button", "debug-state-copy-button");
    copyButton.innerHTML = "\u{1F4CB}";
    copyButton.title = "Copy JSON to clipboard";
    copyButton.onclick = (e) => {
      e.stopPropagation();
      this.copyDebugStateToClipboard(id, state, copyButton);
    };
    hoverActions.appendChild(copyButton);
    const hideButton = document.createElement("button");
    hideButton.classList.add("debug-state-action-button", "debug-state-hide-button");
    hideButton.innerHTML = this.hiddenObjects.has(id) ? "\u{1F441}\uFE0F" : "\u{1F648}";
    hideButton.title = this.hiddenObjects.has(id) ? "Show this object" : "Hide this object";
    hideButton.onclick = (e) => {
      e.stopPropagation();
      this.toggleHideDebugState(id);
    };
    hoverActions.appendChild(hideButton);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("debug-state-action-button", "debug-state-delete-button");
    deleteButton.innerHTML = "\u{1F5D1}\uFE0F";
    deleteButton.title = "Delete this object";
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      this.removeDebugState(id);
    };
    hoverActions.appendChild(deleteButton);
    label.appendChild(hoverActions);
    debugWrapper.appendChild(label);
    const jsonWrapper = document.createElement("div");
    jsonWrapper.classList.add("json-wrapper");
    debugWrapper.appendChild(jsonWrapper);
    const isPrimitive = state === null || state === void 0 || typeof state === "string" || typeof state === "number" || typeof state === "boolean";
    let jsonView;
    let clonedState;
    if (isPrimitive) {
      const valueDiv = document.createElement("div");
      valueDiv.style.padding = "8px";
      valueDiv.style.color = "#ce9178";
      valueDiv.textContent = String(state);
      jsonWrapper.appendChild(valueDiv);
      clonedState = { value: state };
      jsonView = new JsonView(clonedState, document.createElement("div"), {
        expandAll: this.expandByDefault
      });
    } else {
      clonedState = state ? JSON.parse(JSON.stringify(state)) : {};
      jsonView = new JsonView(clonedState, jsonWrapper, {
        expandAll: this.expandByDefault
      });
    }
    this.debugStates[id] = {
      state: clonedState,
      jsonView,
      isExpanded: true
    };
    content.appendChild(debugWrapper);
    if (targetNamespace === "hidden") {
      this.updateHiddenTabLabel();
    }
  }
  copyDebugStateToClipboard(id, state, button) {
    try {
      const jsonString = JSON.stringify(state, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
        const originalContent = button.innerHTML;
        button.innerHTML = "\u2713";
        button.style.background = "rgba(40, 167, 69, 0.8)";
        setTimeout(() => {
          button.innerHTML = originalContent;
          button.style.background = "";
        }, 2e3);
      }).catch((err) => {
        console.error("Failed to copy to clipboard:", err);
      });
    } catch (error) {
      console.error("Failed to stringify state:", error);
    }
  }
  removeDebugState(id) {
    const debugWrapper = document.getElementById(`debug-state-${id}`);
    if (debugWrapper) {
      debugWrapper.remove();
    }
    delete this.debugStates[id];
    this.hiddenObjects.delete(id);
    this.updateHiddenTabLabel();
    this.saveSettings();
  }
  toggleHideDebugState(id) {
    if (this.hiddenObjects.has(id)) {
      this.hiddenObjects.delete(id);
    } else {
      this.hiddenObjects.add(id);
    }
    this.redrawDebugTabs();
    this.updateHiddenTabLabel();
    this.saveSettings();
  }
  redrawDebugTabs() {
    const debugWrappers = {};
    Object.keys(this.debugStates).forEach((id) => {
      const wrapper = document.getElementById(`debug-state-${id}`);
      if (wrapper) {
        debugWrappers[id] = wrapper;
      }
    });
    const objectsContent = this.contentContainer.querySelector(`[data-namespace="${DEBUG_STATE_NAMESPACE}"]`);
    const hiddenContent = this.contentContainer.querySelector(`[data-namespace="hidden"]`);
    if (objectsContent) objectsContent.innerHTML = "";
    if (hiddenContent) hiddenContent.innerHTML = "";
    Object.keys(this.debugStates).forEach((id) => {
      const targetNamespace = this.hiddenObjects.has(id) ? "hidden" : DEBUG_STATE_NAMESPACE;
      const targetContent = this.contentContainer.querySelector(`[data-namespace="${targetNamespace}"]`);
      if (!targetContent) return;
      const debugWrapper = debugWrappers[id];
      if (debugWrapper) {
        const hideButton = debugWrapper.querySelector(".debug-state-hide-button");
        if (hideButton) {
          hideButton.innerHTML = this.hiddenObjects.has(id) ? "\u{1F441}\uFE0F" : "\u{1F648}";
          hideButton.title = this.hiddenObjects.has(id) ? "Show this object" : "Hide this object";
        }
        targetContent.appendChild(debugWrapper);
      }
    });
    this.switchTab(this.activeTab);
  }
  // Tab controls
  addTab(namespace) {
    if (this.tabEntries[namespace]) return;
    this.tabEntries[namespace] = [];
    const tab = document.createElement("button");
    tab.classList.add("debug-tab");
    tab.textContent = namespace;
    tab.onclick = () => this.switchTab(namespace);
    this.tabContainer.appendChild(tab);
    const content = document.createElement("div");
    content.classList.add("debug-tab-content");
    content.dataset.namespace = namespace;
    content.style.display = "none";
    this.contentContainer.appendChild(content);
    if (Object.keys(this.tabEntries).length === 1) {
      this.switchTab(namespace);
    }
  }
  addHiddenTab() {
    const namespace = "hidden";
    this.tabEntries[namespace] = [];
    this.hiddenTab = document.createElement("button");
    this.hiddenTab.classList.add("debug-tab", "debug-tab-hidden");
    this.updateHiddenTabLabel();
    this.hiddenTab.onclick = () => this.switchTab(namespace);
    this.tabContainer.appendChild(this.hiddenTab);
    const content = document.createElement("div");
    content.classList.add("debug-tab-content");
    content.dataset.namespace = namespace;
    content.style.display = "none";
    this.contentContainer.appendChild(content);
  }
  updateHiddenTabLabel() {
    if (this.hiddenTab) {
      const hiddenCount = Object.keys(this.debugStates).filter((id) => this.hiddenObjects.has(id)).length;
      this.hiddenTab.textContent = `hidden (${hiddenCount})`;
    }
  }
  clearCurrentTab() {
    this.clearTab(this.activeTab);
  }
  clearTab(namespace) {
    const content = this.contentContainer.querySelector(`[data-namespace="${namespace}"]`);
    if (!content) return;
    this.tabEntries[namespace] = [];
    if (namespace === DEBUG_STATE_NAMESPACE) {
      Object.keys(this.debugStates).forEach((key) => {
        delete this.debugStates[key];
      });
    }
    content.innerHTML = "";
  }
  switchTab(namespace) {
    this.activeTab = namespace;
    this.tabContainer.querySelectorAll(".debug-tab").forEach((tab, index) => {
      const tabNamespace = Object.keys(this.tabEntries)[index];
      tab.classList.toggle("active", tabNamespace === namespace);
    });
    this.contentContainer.querySelectorAll(".debug-tab-content").forEach((el) => {
      el.style.display = "none";
    });
    const activeContent = this.contentContainer.querySelector(`[data-namespace="${namespace}"]`);
    if (activeContent) {
      activeContent.style.display = activeContent.classList.contains("layout-columns") ? "flex" : "block";
      ;
    }
  }
  // Log controls
  log(namespace, message) {
    if (!this.tabEntries[namespace]) {
      this.addTab(namespace);
    }
    const logEntry = {
      id: `${namespace}-${Date.now()}-${Math.random()}`,
      message,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.tabEntries[namespace].push(logEntry);
    const content = this.contentContainer.querySelector(`[data-namespace="${namespace}"]`);
    if (!content) return;
    const logElement = this.createLogElement(logEntry, namespace);
    content.appendChild(logElement);
    if (namespace !== "global") {
      this.log("global", message);
    }
  }
  createLogElement(logEntry, namespace) {
    const logElement = document.createElement("div");
    logElement.classList.add("debug-log-entry");
    logElement.dataset.logId = logEntry.id;
    const logText = document.createElement("div");
    logText.innerText = `[${logEntry.timestamp.toLocaleTimeString()}] ${this.renderLogEntry(logEntry.message)}`;
    logText.classList.add("debug-log-entry-text");
    const copyButton = document.createElement("button");
    copyButton.innerText = "\u{1F4CB}";
    copyButton.classList.add("debug-copy-button");
    copyButton.onclick = () => navigator.clipboard.writeText(logText.innerText);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "\u274C";
    deleteButton.classList.add("debug-delete-button");
    deleteButton.onclick = () => this.removeLogEntry(namespace, logEntry.id, logElement);
    logElement.appendChild(logText);
    logElement.appendChild(copyButton);
    logElement.appendChild(deleteButton);
    return logElement;
  }
  removeLogEntry(namespace, logId, logElement) {
    this.tabEntries[namespace] = this.tabEntries[namespace].filter((entry) => entry.id !== logId);
    logElement.remove();
  }
  renderLogEntry(message) {
    if (Array.isArray(message)) {
      return message.join(" ");
    }
    if (typeof message === "object") {
      return safeStringify(message);
    }
    return String(message);
  }
  // Misc UI helpers
  updateToolbarLayout(width) {
    if (width < MIN_WIDTH) {
      this.container.classList.add("narrow-panel");
    } else {
      this.container.classList.remove("narrow-panel");
    }
  }
  handleOpacityChange() {
    const opacityPercent = parseInt(this.opacitySlider.value);
    const opacity = opacityPercent / 100;
    if (this.container.classList.contains("visible")) {
      this.container.style.opacity = String(opacity);
    }
    this.saveSettings();
  }
  handleDragStart() {
    this.container.style.transition = "none";
    if (this.snappedTo && this.isStretched) {
      this.isStretched = false;
      this.updateStretchButton();
    }
    this.snappedTo = null;
  }
  handleResizeSnapping() {
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const snapPadding = this.options.snapPadding || 20;
    const rect = this.container.getBoundingClientRect();
    const left = rect.left;
    const right = windowWidth - rect.right;
    const top = rect.top;
    const bottom = windowHeight - rect.bottom;
    const leftSnapped = Math.abs(left) < snapPadding;
    const rightSnapped = Math.abs(right) < snapPadding;
    const topSnapped = Math.abs(top) < snapPadding;
    const bottomSnapped = Math.abs(bottom) < snapPadding;
    const isFullWidth = leftSnapped && rightSnapped;
    const isFullHeight = topSnapped && bottomSnapped;
    if (isFullWidth && isFullHeight) {
      this.snappedTo = "topLeft";
      this.isStretched = true;
    } else if (leftSnapped && topSnapped) {
      this.snappedTo = "topLeft";
      this.isStretched = isFullWidth || isFullHeight;
    } else if (rightSnapped && topSnapped) {
      this.snappedTo = "topRight";
      this.isStretched = isFullWidth || isFullHeight;
    } else if (leftSnapped && bottomSnapped) {
      this.snappedTo = "bottomLeft";
      this.isStretched = isFullWidth || isFullHeight;
    } else if (rightSnapped && bottomSnapped) {
      this.snappedTo = "bottomRight";
      this.isStretched = isFullWidth || isFullHeight;
    } else if (leftSnapped && rightSnapped) {
      this.snappedTo = "left";
      this.isStretched = true;
    } else if (topSnapped && bottomSnapped) {
      this.snappedTo = "top";
      this.isStretched = true;
    } else if (leftSnapped) {
      this.snappedTo = "left";
      this.isStretched = false;
    } else if (rightSnapped) {
      this.snappedTo = "right";
      this.isStretched = false;
    } else if (topSnapped) {
      this.snappedTo = "top";
      this.isStretched = false;
    } else if (bottomSnapped) {
      this.snappedTo = "bottom";
      this.isStretched = false;
    } else {
      this.snappedTo = null;
      this.isStretched = false;
    }
    this.updateStretchButton();
  }
  handleDragEnd() {
    this.container.style.transition = `left ${SNAP_ANIMATION_DURATION}ms ease-out, top ${SNAP_ANIMATION_DURATION}ms ease-out, width ${SNAP_ANIMATION_DURATION}ms ease-out, height ${SNAP_ANIMATION_DURATION}ms ease-out`;
    this.saveSettings();
  }
  handleSnapWhileDragging(x, y) {
    const snapPadding = this.options.snapPadding || 20;
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const panelWidth = this.container.offsetWidth;
    const panelHeight = this.container.offsetHeight;
    let snappedX = x;
    let snappedY = y;
    let newSnappedTo = null;
    const snappedLeft = x < snapPadding;
    const snappedRight = x + panelWidth > windowWidth - snapPadding;
    const snappedTop = y < snapPadding;
    const snappedBottom = y + panelHeight > windowHeight - snapPadding;
    if (snappedLeft && snappedTop) {
      snappedX = 0;
      snappedY = 0;
      newSnappedTo = "topLeft";
    } else if (snappedRight && snappedTop) {
      snappedX = windowWidth - panelWidth;
      snappedY = 0;
      newSnappedTo = "topRight";
    } else if (snappedLeft && snappedBottom) {
      snappedX = 0;
      snappedY = windowHeight - panelHeight;
      newSnappedTo = "bottomLeft";
    } else if (snappedRight && snappedBottom) {
      snappedX = windowWidth - panelWidth;
      snappedY = windowHeight - panelHeight;
      newSnappedTo = "bottomRight";
    } else if (snappedLeft) {
      snappedX = 0;
      newSnappedTo = "left";
    } else if (snappedRight) {
      snappedX = windowWidth - panelWidth;
      newSnappedTo = "right";
    } else if (snappedTop) {
      snappedY = 0;
      newSnappedTo = "top";
    } else if (snappedBottom) {
      snappedY = windowHeight - panelHeight;
      newSnappedTo = "bottom";
    }
    if (newSnappedTo !== this.snappedTo) {
      this.snappedTo = newSnappedTo;
      this.updateStretchButton();
    }
    return { x: snappedX, y: snappedY };
  }
  // Toggle Methods
  toggleExpandAll() {
    const allExpanded = Object.values(this.debugStates).every((state) => state.isExpanded);
    Object.keys(this.debugStates).forEach((id) => {
      const debugWrapper = document.getElementById(`debug-state-${id}`);
      if (!debugWrapper) return;
      this.debugStates[id].isExpanded = !allExpanded;
      debugWrapper.classList.toggle("collapsed", allExpanded);
      const toggleButton = debugWrapper.querySelector(".json-toggle");
      if (toggleButton) {
        toggleButton.textContent = allExpanded ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
      }
    });
    this.updateCollapseAllTooltip();
  }
  toggleStretch() {
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    if (this.isStretched) {
      this.isStretched = false;
      const rect = this.container.getBoundingClientRect();
      const isFullWidth = Math.abs(rect.width - windowWidth) < 10;
      const isFullHeight = Math.abs(rect.height - windowHeight) < 10;
      if (isFullWidth && isFullHeight) {
        this.container.style.width = `${windowWidth * 0.5}px`;
        this.container.style.height = `${windowHeight * 0.5}px`;
        this.container.style.left = `${windowWidth * 0.25}px`;
        this.container.style.top = `${windowHeight * 0.25}px`;
      } else if (isFullHeight) {
        this.container.style.height = `${windowHeight * 0.5}px`;
        this.container.style.top = `${windowHeight * 0.25}px`;
      } else if (isFullWidth) {
        this.container.style.width = `${windowWidth * 0.5}px`;
        this.container.style.left = `${windowWidth * 0.25}px`;
      }
      this.snappedTo = null;
    } else {
      this.isStretched = true;
      if (this.snappedTo) {
        this.applyStretch();
      } else {
        if (this.layoutMode === "row") {
          this.container.style.height = `${windowHeight}px`;
          this.container.style.top = "0px";
        } else {
          this.container.style.width = `${windowWidth}px`;
          this.container.style.left = "0px";
        }
      }
    }
    this.updateStretchButton();
    this.saveSettings();
  }
  applyStretch() {
    if (!this.snappedTo) return;
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    if (this.snappedTo === "left" || this.snappedTo === "right") {
      this.container.style.height = `${windowHeight}px`;
      this.container.style.top = "0px";
      if (this.snappedTo === "left") {
        this.container.style.left = "0px";
      } else {
        const panelWidth = this.container.offsetWidth;
        this.container.style.left = `${windowWidth - panelWidth}px`;
      }
    } else if (this.snappedTo === "top" || this.snappedTo === "bottom") {
      this.container.style.width = `${windowWidth}px`;
      this.container.style.left = "0px";
      if (this.snappedTo === "top") {
        this.container.style.top = "0px";
      } else {
        const panelHeight = this.container.offsetHeight;
        this.container.style.top = `${windowHeight - panelHeight}px`;
      }
    } else if (this.snappedTo) {
      this.container.style.height = `${windowHeight}px`;
      if (this.snappedTo.includes("top")) {
        this.container.style.top = "0px";
      } else {
        const panelHeight = this.container.offsetHeight;
        this.container.style.top = `${windowHeight - panelHeight}px`;
      }
      if (this.snappedTo.includes("Left")) {
        this.container.style.left = "0px";
      } else {
        const panelWidth = this.container.offsetWidth;
        this.container.style.left = `${windowWidth - panelWidth}px`;
      }
    }
  }
  toggleLayoutMode() {
    this.layoutMode = this.layoutMode === "row" ? "column" : "row";
    this.applyLayoutMode();
    this.updateLayoutButtonTooltip();
    this.saveSettings();
  }
  applyLayoutMode() {
    const objectsContent = this.contentContainer.querySelector(`[data-namespace="${DEBUG_STATE_NAMESPACE}"]`);
    const hiddenContent = this.contentContainer.querySelector(`[data-namespace="hidden"]`);
    [objectsContent, hiddenContent].forEach((content) => {
      if (!content) return;
      if (this.layoutMode === "column") {
        content.classList.add("layout-columns");
      } else {
        content.classList.remove("layout-columns");
      }
    });
    const activeContent = this.contentContainer.querySelector(`[data-namespace="${this.activeTab}"]`);
    if (activeContent) {
      activeContent.style.display = activeContent.classList.contains("layout-columns") ? "flex" : "block";
    }
  }
  // Panel controls
  show() {
    this.container.classList.add("visible");
    const opacity = parseFloat(this.container.style.opacity) || 1;
    this.container.style.opacity = String(opacity);
    this.saveSettings();
  }
  hide() {
    if (this.clearOnHide) {
      this.clearCurrentTab();
    }
    this.container.classList.remove("visible");
    this.saveSettings();
  }
  toggle() {
    if (this.container.classList.contains("visible")) {
      this.hide();
    } else {
      this.show();
    }
  }
};
function debug(idOrState, state) {
  EventBus.dispatch("debug", { id: idOrState, state });
}
export {
  DebugPanel,
  JsonView,
  ScreenPosition,
  debug,
  DebugPanel as default,
  getWindowSize,
  makeDraggable,
  makeResizable
};
//# sourceMappingURL=index.js.map