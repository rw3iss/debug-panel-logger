"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DebugPanel: () => DebugPanel,
  JsonView: () => JsonView,
  ScreenPosition: () => ScreenPosition,
  debug: () => debug,
  default: () => DebugPanel,
  getWindowSize: () => getWindowSize,
  makeDraggable: () => makeDraggable,
  makeResizable: () => makeResizable
});
module.exports = __toCommonJS(index_exports);

// src/DebugPanel/DebugPanel.scss
var css = '.debug-panel{position:fixed;z-index:99999;background:#222;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;font-family:Arial,sans-serif;color:#fff;transition:transform .2s ease-in-out,visibility .2s ease-in-out}.debug-panel.visible{visibility:visible;transform:translateY(0)}.debug-panel:not(.visible){visibility:hidden;transform:translateY(10px);pointer-events:none}.debug-panel .debug-panel-tabs{display:flex;flex-wrap:wrap;background:#1a1a1a;padding:6px 6px 0 6px;gap:3px;cursor:grab;user-select:none}.debug-panel .debug-panel-tabs:active{cursor:grabbing}.debug-panel .debug-panel-tabs .debug-tab{background:#2d2d2d;color:#888;padding:7px 8px;margin:0;border:none;border-top-left-radius:6px;border-top-right-radius:6px;cursor:pointer;position:relative;box-shadow:inset 0 -2px 4px rgba(0,0,0,.3);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif}.debug-panel .debug-panel-tabs .debug-tab:hover{background:#353535;color:#aaa}.debug-panel .debug-panel-tabs .debug-tab:focus{outline:none}.debug-panel .debug-panel-tabs .debug-tab.active{background:linear-gradient(to bottom, #3f6d9c, #24384d);color:#fff;box-shadow:0 -3px 8px rgba(0,102,204,.4),inset 0 1px 0 hsla(0,0%,100%,.2);z-index:1}.debug-panel .debug-panel-content{flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:0px 15px;background:#0d0d0d}.debug-panel .debug-panel-content .debug-tab-content{display:none;flex-direction:column;flex:1;gap:5px}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry{background:#292929;color:#ddd;padding:5px 8px;border-radius:4px;font-size:12px;word-break:break-word;border-left:3px solid #007bff;position:relative;display:flex;align-items:center}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry:hover .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry:hover .debug-copy-button{opacity:1}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-log-entry-text{flex:1;padding-right:70px}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{position:absolute;top:50%;transform:translateY(-50%);background:rgba(100,100,100,.8);color:#fff;border:none;cursor:pointer;font-size:12px;font-weight:bold;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s ease-in-out,background .2s ease-in-out}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:hover{background:#969696}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{right:36px;background:rgba(85,170,255,.8)}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:hover{background:#28f}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button{right:8px;background:rgba(223,161,152,.8)}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:hover{background:#f22}.debug-panel .debug-toolbar{display:flex;box-sizing:border-box;width:100%;align-items:center;justify-content:flex-end;gap:2px;padding:8px;background:#111;border-top:1px solid hsla(0,0%,100%,.1);flex-wrap:wrap}.debug-panel .debug-toolbar .debug-keyboard-hint{margin-right:auto;color:#999;font-size:11px;white-space:nowrap}.debug-panel .debug-toolbar .debug-opacity-container{display:flex;align-items:center;gap:0px;max-width:100px;min-width:40px;flex-shrink:1;padding:4px 0}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-label{font-size:11px;color:#999;white-space:nowrap}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider{flex:1;min-width:40px;width:100%;max-width:100%;height:4px;background:#444;border-radius:2px;outline:none;-webkit-appearance:none;appearance:none}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;background:#007bff;cursor:pointer;border-radius:50%;position:relative;top:-4px;transition:background .2s}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-thumb:hover{background:#0056b3}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-thumb{width:14px;height:14px;background:#007bff;cursor:pointer;border-radius:50%;border:none;position:relative;top:-4px;transition:background .2s}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-thumb:hover{background:#0056b3}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-runnable-track{height:4px;background:#444;border-radius:2px}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-track{height:4px;background:#444;border-radius:2px}.debug-panel .debug-toolbar button{background:#ba6c38;color:#fff;border:none;padding:5px 10px;margin:2px;border-radius:4px;font-size:12px;cursor:pointer;transition:background .2s;white-space:nowrap;flex-shrink:0}.debug-panel .debug-toolbar button:hover{background:#c9302c}.debug-panel .debug-toolbar button:focus{outline:none}.debug-panel .debug-toolbar{container-type:inline-size}@container (max-width: 350px){.debug-panel .debug-toolbar{flex-direction:column;align-items:stretch}.debug-panel .debug-toolbar .debug-keyboard-hint{display:none}.debug-panel .debug-toolbar .debug-opacity-container{max-width:100%;justify-content:center}}.debug-panel.narrow-panel .debug-toolbar{flex-direction:column;align-items:stretch}.debug-panel.narrow-panel .debug-toolbar .debug-keyboard-hint{margin-right:0;text-align:center}.debug-panel.narrow-panel .debug-toolbar .debug-opacity-container{max-width:100%;justify-content:center}.debug-panel .resize-handle{position:absolute;background:hsla(0,0%,100%,.1);z-index:10;transition:background .2s}.debug-panel .resize-handle:hover{background:hsla(0,0%,100%,.3)}.debug-panel .resize-left,.debug-panel .resize-right{top:0;bottom:0;width:6px;cursor:ew-resize}.debug-panel .resize-left{left:-3px}.debug-panel .resize-right{right:-3px}.debug-panel .resize-top,.debug-panel .resize-bottom{left:0;right:0;height:6px;cursor:ns-resize}.debug-panel .resize-top{top:-3px}.debug-panel .resize-bottom{bottom:-3px}.debug-panel .resize-top-left,.debug-panel .resize-top-right,.debug-panel .resize-bottom-left,.debug-panel .resize-bottom-right{width:10px;height:10px}.debug-panel .resize-top-left{left:-3px;top:-3px;cursor:nwse-resize}.debug-panel .resize-top-right{right:-3px;top:-3px;cursor:nesw-resize}.debug-panel .resize-bottom-left{left:-3px;bottom:-3px;cursor:nesw-resize}.debug-panel .resize-bottom-right{right:-3px;bottom:-3px;cursor:nwse-resize}.debug-state{position:relative;flex:1 0 100%;display:flex;flex-direction:column;margin-bottom:5px;margin-left:10px}.debug-state .json-toggle{position:absolute;top:2px;left:-22px;margin:0 10px 0 0;border:none;background:none;cursor:pointer;color:#888;font-size:14px;padding:0;width:20px;height:20px;transition:color .2s}.debug-state .json-toggle:hover{color:#fff}.debug-state .json-toggle:focus{outline:none}.debug-state .debug-state-label{font-size:13px;font-weight:bold;padding:5px 0;color:#ccc}.debug-state .debug-state-label:hover{color:#fff;cursor:pointer;text-decoration:underline}.debug-state .json-wrapper{position:relative;padding:5px;margin-left:-15px;background:#292929;border-radius:4px;border-left:3px solid #28a745}.debug-state .json-wrapper .debug-state-hover-actions{position:absolute;top:4px;right:4px;display:flex;gap:6px;opacity:0;transition:opacity .2s ease-in-out;z-index:10}.debug-state .json-wrapper:hover .debug-state-hover-actions{opacity:1}.debug-state .json-wrapper .debug-state-action-button{background:rgba(100,100,100,.8);color:#fff;border:none;cursor:pointer;font-size:16px;width:28px;height:28px;border-radius:4px;display:flex;align-items:center;justify-content:center;padding:0;transition:background .2s ease-in-out,transform .1s ease-in-out}.debug-state .json-wrapper .debug-state-action-button:hover{transform:scale(1.1)}.debug-state .json-wrapper .debug-state-action-button:active{transform:scale(0.95)}.debug-state .json-wrapper .debug-state-action-button:focus{outline:none}.debug-state .json-wrapper .debug-state-copy-button{background:rgba(85,170,255,.8)}.debug-state .json-wrapper .debug-state-copy-button:hover{background:#28f}.debug-state .json-wrapper .debug-state-delete-button{background:rgba(255,85,85,.8)}.debug-state .json-wrapper .debug-state-delete-button:hover{background:#f22}.debug-state.collapsed .json-wrapper{display:none}';
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

// src/JsonView/JsonView.scss
var css2 = ".json-node{position:relative;margin-left:20px;padding-left:0;font-size:12px;line-height:1.2em}.json-node .json-properties{display:flex;flex-direction:column}.json-node .json-property{position:relative;display:flex;align-items:flex-start;padding:2px 0}.json-node .json-property.object{flex-direction:column}.json-node .json-key{font-weight:bold;margin-right:5px;color:#9cdcfe}.json-node .json-key.clickable{cursor:pointer}.json-node .json-key.clickable:hover{color:#4fc3f7;text-decoration:underline}.json-node .json-value{color:#ce9178;white-space:pre-wrap;word-break:break-word;flex:1}.json-node .json-toggle{position:absolute;top:0px;left:-22px;border:none;background:none;cursor:pointer;color:#888;font-size:12px;padding:0;width:20px;height:20px;transition:color .2s}.json-node .json-toggle:hover{color:#fff}.json-node .json-toggle:focus{outline:none}.json-node .collapsed .json-properties{display:none}";
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = css2;
  document.head.appendChild(style);
}

// src/DebugPanel/DebugPanel.ts
var import_eventbusjs = __toESM(require("eventbusjs"), 1);
var import_fast_safe_stringify = __toESM(require("fast-safe-stringify"), 1);

// src/constants.ts
var COLLAPSED_INDICATOR = "\u25BA";
var EXPANDED_INDICATOR = "\u25BC";

// src/JsonView/JsonView.ts
var jsondiffpatch = __toESM(require("jsondiffpatch"), 1);
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
    onResize = () => {
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
    if (resizeDirection.includes("right")) {
      newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
    }
    if (resizeDirection.includes("left")) {
      const potentialWidth = startWidth - deltaX;
      if (potentialWidth >= minWidth && potentialWidth <= maxWidth) {
        newWidth = potentialWidth;
        newLeft = startLeft + deltaX;
      }
    }
    if (resizeDirection.includes("bottom")) {
      newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
    }
    if (resizeDirection.includes("top")) {
      const potentialHeight = startHeight - deltaY;
      if (potentialHeight >= minHeight && potentialHeight <= maxHeight) {
        newHeight = potentialHeight;
        newTop = startTop + deltaY;
      }
    }
    container.style.width = `${newWidth}px`;
    container.style.height = `${newHeight}px`;
    container.style.left = `${newLeft}px`;
    container.style.top = `${newTop}px`;
    onResize(newWidth, newHeight);
  }
  function stopResizing() {
    resizing = false;
    resizeDirection = null;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResizing);
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
  const { onDragStart, onDrag, onDragEnd } = options;
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
var DebugPanel = class {
  constructor(options = {}) {
    this.tabEntries = {};
    this.debugStates = {};
    this.activeTab = "global";
    this.resizeThrottleTimer = null;
    this.options = {
      position: "bottomRight" /* BottomRight */,
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
    this.addTab("global");
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
    return container;
  }
  createTabContainer() {
    const tabContainer = document.createElement("div");
    tabContainer.classList.add("debug-panel-tabs");
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
    const hint = document.createElement("span");
    hint.classList.add("debug-keyboard-hint");
    hint.textContent = "Ctrl+Alt+D to hide/show";
    hint.style.color = "#999";
    hint.style.fontSize = "11px";
    const opacityContainer = document.createElement("div");
    opacityContainer.classList.add("debug-opacity-container");
    const opacityLabel = document.createElement("label");
    opacityLabel.classList.add("debug-opacity-label");
    opacityLabel.textContent = "O";
    opacityLabel.style.fontSize = "11px";
    opacityLabel.style.color = "#999";
    opacityLabel.style.marginRight = "5px";
    this.opacitySlider = document.createElement("input");
    this.opacitySlider.type = "range";
    this.opacitySlider.min = "20";
    this.opacitySlider.max = "100";
    this.opacitySlider.value = "100";
    this.opacitySlider.classList.add("debug-opacity-slider");
    this.opacitySlider.oninput = () => this.handleOpacityChange();
    opacityContainer.appendChild(this.opacitySlider);
    const clearButton = document.createElement("button");
    clearButton.classList.add("debug-clear-button");
    clearButton.textContent = "Clear";
    clearButton.onclick = () => this.clearCurrentTab();
    const hideButton = document.createElement("button");
    hideButton.classList.add("debug-hide-button");
    hideButton.textContent = "Hide";
    hideButton.onclick = () => this.hide();
    toolbar.appendChild(hint);
    toolbar.appendChild(opacityContainer);
    toolbar.appendChild(clearButton);
    toolbar.appendChild(hideButton);
    return toolbar;
  }
  setupEventListeners() {
    import_eventbusjs.default.addEventListener("log", (event) => {
      const { namespace, message } = event.target;
      this.log(namespace, message);
    });
    import_eventbusjs.default.addEventListener("debug", (event) => {
      const { id, state } = event.target;
      if (!id || !state) {
        console.log("Invalid event data for debug-state. Expected {id, state}, got:", event);
        return;
      }
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
      onResize: (newWidth) => {
        this.updateToolbarLayout(newWidth);
        this.saveSettings();
      }
    });
  }
  setupDraggable() {
    if (this.options.snap) {
      makeDraggable(this.container, this.tabContainer, {
        onDrag: (x, y) => this.handleSnapWhileDragging(x, y),
        onDragEnd: () => this.saveSettings()
      });
    } else {
      makeDraggable(this.container, this.tabContainer, {
        onDragEnd: () => this.saveSettings()
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
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        this.toggle();
      }
    });
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
        opacity
      };
      localStorage.setItem("debugPanelSettings", JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save debug panel settings:", error);
    }
  }
  // Debug objects
  // Send any object to the DebugPanel for observation. Use a string id as first argument to label it.
  debug(idOrState, state) {
    let _id = idOrState;
    let _state = state;
    if (!state && typeof idOrState == "object") {
      _id = "object";
      _state = idOrState;
    }
    if (this.debugStates[_id]) {
      this.updateDebugState(_id, _state);
    } else {
      this.addDebugState(_id, _state);
    }
  }
  updateDebugState(id, state) {
    const content = this.contentContainer.querySelector(`[data-namespace="${DEBUG_STATE_NAMESPACE}"]`);
    if (!content) {
      console.error("No content for debug namespace.");
      return;
    }
    const debugWrapper = content.querySelector(`#debug-state-${id}`);
    if (!debugWrapper) {
      console.error(`No debug state found for ${id}.`);
      return;
    }
    const jsonWrapper = debugWrapper.querySelector(".json-wrapper");
    if (!jsonWrapper) {
      console.error(`No json wrapper found for existing state ${id}`);
      return;
    }
    const clonedState = JSON.parse(JSON.stringify(state));
    this.debugStates[id].jsonView.updateJson(clonedState);
    this.debugStates[id].state = clonedState;
  }
  addDebugState(id, state) {
    const content = this.contentContainer.querySelector(`[data-namespace="${DEBUG_STATE_NAMESPACE}"]`);
    if (!content) {
      console.error("No content for debug namespace.");
      return;
    }
    const clonedState = JSON.parse(JSON.stringify(state));
    const debugWrapper = document.createElement("div");
    debugWrapper.classList.add("debug-state");
    debugWrapper.setAttribute("id", `debug-state-${id}`);
    const toggleObjectOpen = () => {
      const isExpanded = this.debugStates[id].isExpanded;
      this.debugStates[id].isExpanded = !isExpanded;
      debugWrapper.classList.toggle("collapsed", isExpanded);
      toggleButton.textContent = isExpanded ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
    };
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("json-toggle");
    toggleButton.textContent = EXPANDED_INDICATOR;
    toggleButton.onclick = toggleObjectOpen;
    debugWrapper.appendChild(toggleButton);
    const label = document.createElement("div");
    label.classList.add("debug-state-label");
    label.innerText = id || "untitled";
    label.onclick = toggleObjectOpen;
    debugWrapper.appendChild(label);
    const jsonWrapper = document.createElement("div");
    jsonWrapper.classList.add("json-wrapper");
    debugWrapper.appendChild(jsonWrapper);
    const jsonView = new JsonView(clonedState, jsonWrapper, {
      //expandObjs: [/children/, /children\/(.*)/, /entry/]
    });
    const hoverActions = document.createElement("div");
    hoverActions.classList.add("debug-state-hover-actions");
    const copyButton = document.createElement("button");
    copyButton.classList.add("debug-state-action-button", "debug-state-copy-button");
    copyButton.innerHTML = "\u{1F4CB}";
    copyButton.title = "Copy JSON to clipboard";
    copyButton.onclick = () => this.copyDebugStateToClipboard(id, this.debugStates[id].state, copyButton);
    hoverActions.appendChild(copyButton);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("debug-state-action-button", "debug-state-delete-button");
    deleteButton.innerHTML = "\u{1F5D1}\uFE0F";
    deleteButton.title = "Delete this object";
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
    this.contentContainer.appendChild(content);
    if (Object.keys(this.tabEntries).length === 1) {
      this.switchTab(namespace);
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
      activeContent.style.display = "block";
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
      return (0, import_fast_safe_stringify.default)(message);
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
  handleSnapWhileDragging(x, y) {
    const snapPadding = this.options.snapPadding || 20;
    const { width: windowWidth, height: windowHeight } = getWindowSize();
    const panelWidth = this.container.offsetWidth;
    const panelHeight = this.container.offsetHeight;
    let snappedX = x;
    let snappedY = y;
    if (x < snapPadding) {
      snappedX = 0;
    } else if (x + panelWidth > windowWidth - snapPadding) {
      snappedX = windowWidth - panelWidth;
    }
    if (y < snapPadding) {
      snappedY = 0;
    } else if (y + panelHeight > windowHeight - snapPadding) {
      snappedY = windowHeight - panelHeight;
    }
    return { x: snappedX, y: snappedY };
  }
  // Panel controls
  show() {
    this.container.classList.add("visible");
    const opacity = parseFloat(this.container.style.opacity) || 1;
    this.container.style.opacity = String(opacity);
    this.saveSettings();
  }
  hide() {
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
  import_eventbusjs.default.dispatch("debug", { id: idOrState, state });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DebugPanel,
  JsonView,
  ScreenPosition,
  debug,
  getWindowSize,
  makeDraggable,
  makeResizable
});
//# sourceMappingURL=index.cjs.js.map