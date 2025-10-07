"use strict";
var DevDebugPanel = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
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

  // node_modules/eventbusjs/lib/eventbus.min.js
  var require_eventbus_min = __commonJS({
    "node_modules/eventbusjs/lib/eventbus.min.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object" && typeof module === "object") module.exports = factory();
        else if (typeof define === "function" && define.amd) define("EventBus", [], factory);
        else if (typeof exports === "object") exports["EventBus"] = factory();
        else root["EventBus"] = factory();
      })(exports, function() {
        var EventBusClass = {};
        EventBusClass = function() {
          this.listeners = {};
        };
        EventBusClass.prototype = { addEventListener: function(type, callback, scope) {
          var args = [];
          var numOfArgs = arguments.length;
          for (var i = 0; i < numOfArgs; i++) {
            args.push(arguments[i]);
          }
          args = args.length > 3 ? args.splice(3, args.length - 1) : [];
          if (typeof this.listeners[type] != "undefined") {
            this.listeners[type].push({ scope, callback, args });
          } else {
            this.listeners[type] = [{ scope, callback, args }];
          }
        }, removeEventListener: function(type, callback, scope) {
          if (typeof this.listeners[type] != "undefined") {
            var numOfCallbacks = this.listeners[type].length;
            var newArray = [];
            for (var i = 0; i < numOfCallbacks; i++) {
              var listener = this.listeners[type][i];
              if (listener.scope == scope && listener.callback == callback) {
              } else {
                newArray.push(listener);
              }
            }
            this.listeners[type] = newArray;
          }
        }, hasEventListener: function(type, callback, scope) {
          if (typeof this.listeners[type] != "undefined") {
            var numOfCallbacks = this.listeners[type].length;
            if (callback === void 0 && scope === void 0) {
              return numOfCallbacks > 0;
            }
            for (var i = 0; i < numOfCallbacks; i++) {
              var listener = this.listeners[type][i];
              if ((scope ? listener.scope == scope : true) && listener.callback == callback) {
                return true;
              }
            }
          }
          return false;
        }, dispatch: function(type, target) {
          var event = { type, target };
          var args = [];
          var numOfArgs = arguments.length;
          for (var i = 0; i < numOfArgs; i++) {
            args.push(arguments[i]);
          }
          args = args.length > 2 ? args.splice(2, args.length - 1) : [];
          args = [event].concat(args);
          if (typeof this.listeners[type] != "undefined") {
            var listeners = this.listeners[type].slice();
            var numOfCallbacks = listeners.length;
            for (var i = 0; i < numOfCallbacks; i++) {
              var listener = listeners[i];
              if (listener && listener.callback) {
                var concatArgs = args.concat(listener.args);
                listener.callback.apply(listener.scope, concatArgs);
              }
            }
          }
        }, getEvents: function() {
          var str = "";
          for (var type in this.listeners) {
            var numOfCallbacks = this.listeners[type].length;
            for (var i = 0; i < numOfCallbacks; i++) {
              var listener = this.listeners[type][i];
              str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
              str += " listen for '" + type + "'\n";
            }
          }
          return str;
        } };
        var EventBus2 = new EventBusClass();
        return EventBus2;
      });
    }
  });

  // node_modules/fast-safe-stringify/index.js
  var require_fast_safe_stringify = __commonJS({
    "node_modules/fast-safe-stringify/index.js"(exports, module) {
      module.exports = stringify;
      stringify.default = stringify;
      stringify.stable = deterministicStringify;
      stringify.stableStringify = deterministicStringify;
      var LIMIT_REPLACE_NODE = "[...]";
      var CIRCULAR_REPLACE_NODE = "[Circular]";
      var arr = [];
      var replacerStack = [];
      function defaultOptions() {
        return {
          depthLimit: Number.MAX_SAFE_INTEGER,
          edgesLimit: Number.MAX_SAFE_INTEGER
        };
      }
      function stringify(obj, replacer, spacer, options) {
        if (typeof options === "undefined") {
          options = defaultOptions();
        }
        decirc(obj, "", 0, [], void 0, 0, options);
        var res;
        try {
          if (replacerStack.length === 0) {
            res = JSON.stringify(obj, replacer, spacer);
          } else {
            res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
          }
        } catch (_) {
          return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
        } finally {
          while (arr.length !== 0) {
            var part = arr.pop();
            if (part.length === 4) {
              Object.defineProperty(part[0], part[1], part[3]);
            } else {
              part[0][part[1]] = part[2];
            }
          }
        }
        return res;
      }
      function setReplace(replace, val, k, parent) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
        if (propertyDescriptor.get !== void 0) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: replace });
            arr.push([parent, k, val, propertyDescriptor]);
          } else {
            replacerStack.push([val, k, replace]);
          }
        } else {
          parent[k] = replace;
          arr.push([parent, k, val]);
        }
      }
      function decirc(val, k, edgeIndex, stack, parent, depth, options) {
        depth += 1;
        var i;
        if (typeof val === "object" && val !== null) {
          for (i = 0; i < stack.length; i++) {
            if (stack[i] === val) {
              setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
              return;
            }
          }
          if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
          }
          if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
          }
          stack.push(val);
          if (Array.isArray(val)) {
            for (i = 0; i < val.length; i++) {
              decirc(val[i], i, i, stack, val, depth, options);
            }
          } else {
            var keys = Object.keys(val);
            for (i = 0; i < keys.length; i++) {
              var key = keys[i];
              decirc(val[key], key, i, stack, val, depth, options);
            }
          }
          stack.pop();
        }
      }
      function compareFunction(a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      }
      function deterministicStringify(obj, replacer, spacer, options) {
        if (typeof options === "undefined") {
          options = defaultOptions();
        }
        var tmp = deterministicDecirc(obj, "", 0, [], void 0, 0, options) || obj;
        var res;
        try {
          if (replacerStack.length === 0) {
            res = JSON.stringify(tmp, replacer, spacer);
          } else {
            res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
          }
        } catch (_) {
          return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
        } finally {
          while (arr.length !== 0) {
            var part = arr.pop();
            if (part.length === 4) {
              Object.defineProperty(part[0], part[1], part[3]);
            } else {
              part[0][part[1]] = part[2];
            }
          }
        }
        return res;
      }
      function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
        depth += 1;
        var i;
        if (typeof val === "object" && val !== null) {
          for (i = 0; i < stack.length; i++) {
            if (stack[i] === val) {
              setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
              return;
            }
          }
          try {
            if (typeof val.toJSON === "function") {
              return;
            }
          } catch (_) {
            return;
          }
          if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
          }
          if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
          }
          stack.push(val);
          if (Array.isArray(val)) {
            for (i = 0; i < val.length; i++) {
              deterministicDecirc(val[i], i, i, stack, val, depth, options);
            }
          } else {
            var tmp = {};
            var keys = Object.keys(val).sort(compareFunction);
            for (i = 0; i < keys.length; i++) {
              var key = keys[i];
              deterministicDecirc(val[key], key, i, stack, val, depth, options);
              tmp[key] = val[key];
            }
            if (typeof parent !== "undefined") {
              arr.push([parent, k, val]);
              parent[k] = tmp;
            } else {
              return tmp;
            }
          }
          stack.pop();
        }
      }
      function replaceGetterValues(replacer) {
        replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
          return v;
        };
        return function(key, val) {
          if (replacerStack.length > 0) {
            for (var i = 0; i < replacerStack.length; i++) {
              var part = replacerStack[i];
              if (part[1] === key && part[0] === val) {
                val = part[2];
                replacerStack.splice(i, 1);
                break;
              }
            }
          }
          return replacer.call(this, key, val);
        };
      }
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    DebugPanel: () => DebugPanel,
    JsonView: () => JsonView,
    ScreenPosition: () => ScreenPosition,
    debug: () => debug,
    getWindowSize: () => getWindowSize,
    makeDraggable: () => makeDraggable,
    makeResizable: () => makeResizable
  });

  // src/DebugPanel/DebugPanel.scss
  var css = '.debug-panel{position:fixed;z-index:99999;background:#222;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;font-family:Arial,sans-serif;color:#fff;transition:transform .2s ease-in-out,visibility .2s ease-in-out}.debug-panel.visible{visibility:visible;transform:translateY(0)}.debug-panel:not(.visible){visibility:hidden;transform:translateY(10px);pointer-events:none}.debug-panel .debug-panel-tabs{display:flex;flex-wrap:wrap;background:#1a1a1a;padding:6px 6px 0 6px;gap:3px;cursor:grab;user-select:none}.debug-panel .debug-panel-tabs:active{cursor:grabbing}.debug-panel .debug-panel-tabs .debug-tab{background:#2d2d2d;color:#888;padding:7px 8px;border:none;border-top-left-radius:6px;border-top-right-radius:6px;cursor:pointer;position:relative;box-shadow:inset 0 -2px 4px rgba(0,0,0,.3);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif}.debug-panel .debug-panel-tabs .debug-tab:hover{background:#353535;color:#aaa}.debug-panel .debug-panel-tabs .debug-tab:focus{outline:none}.debug-panel .debug-panel-tabs .debug-tab.active{background:linear-gradient(to bottom, #3f6d9c, #24384d);color:#fff;box-shadow:0 -3px 8px rgba(0,102,204,.4),inset 0 1px 0 hsla(0,0%,100%,.2);z-index:1}.debug-panel .debug-panel-content{flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:0px 15px;background:#0d0d0d}.debug-panel .debug-panel-content .debug-tab-content{display:none;flex-direction:column;flex:1;gap:5px}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry{background:#292929;color:#ddd;padding:5px 8px;border-radius:4px;font-size:12px;word-break:break-word;border-left:3px solid #007bff;position:relative;display:flex;align-items:center}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry:hover .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry:hover .debug-copy-button{opacity:1}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-log-entry-text{flex:1;padding-right:70px}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{position:absolute;top:50%;transform:translateY(-50%);background:rgba(100,100,100,.8);color:#fff;border:none;cursor:pointer;font-size:12px;font-weight:bold;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s ease-in-out,background .2s ease-in-out}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-action-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:hover,.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:hover{background:#969696}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button{right:36px;background:rgba(85,170,255,.8)}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-copy-button:hover{background:#28f}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button{right:8px;background:rgba(223,161,152,.8)}.debug-panel .debug-panel-content .debug-tab-content .debug-log-entry .debug-delete-button:hover{background:#f22}.debug-panel .debug-toolbar{display:flex;width:100%;align-items:center;justify-content:flex-end;gap:8px;padding:8px;background:#111;border-top:1px solid hsla(0,0%,100%,.1);flex-wrap:wrap}.debug-panel .debug-toolbar .debug-keyboard-hint{margin-right:auto;color:#999;font-size:11px;white-space:nowrap}.debug-panel .debug-toolbar .debug-opacity-container{display:flex;align-items:center;gap:5px;max-width:100px;min-width:40px;flex-shrink:1;padding:5px 0}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-label{font-size:11px;color:#999;white-space:nowrap}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider{flex:1;min-width:40px;width:100%;max-width:100%;height:4px;background:#444;border-radius:2px;outline:none;-webkit-appearance:none;appearance:none}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;background:#007bff;cursor:pointer;border-radius:50%;position:relative;top:-4px;transition:background .2s}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-thumb:hover{background:#0056b3}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-thumb{width:14px;height:14px;background:#007bff;cursor:pointer;border-radius:50%;border:none;position:relative;top:-4px;transition:background .2s}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-thumb:hover{background:#0056b3}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-webkit-slider-runnable-track{height:4px;background:#444;border-radius:2px}.debug-panel .debug-toolbar .debug-opacity-container .debug-opacity-slider::-moz-range-track{height:4px;background:#444;border-radius:2px}.debug-panel .debug-toolbar button{background:#d9534f;color:#fff;border:none;padding:6px 12px;border-radius:4px;font-size:12px;cursor:pointer;transition:background .2s;white-space:nowrap;flex-shrink:0}.debug-panel .debug-toolbar button:hover{background:#c9302c}.debug-panel .debug-toolbar button:focus{outline:none}.debug-panel .debug-toolbar{container-type:inline-size}@container (max-width: 350px){.debug-panel .debug-toolbar{flex-direction:column;align-items:stretch}.debug-panel .debug-toolbar .debug-keyboard-hint{display:none}.debug-panel .debug-toolbar .debug-opacity-container{max-width:100%;justify-content:center}}.debug-panel.narrow-panel .debug-toolbar{flex-direction:column;align-items:stretch}.debug-panel.narrow-panel .debug-toolbar .debug-keyboard-hint{margin-right:0;text-align:center}.debug-panel.narrow-panel .debug-toolbar .debug-opacity-container{max-width:100%;justify-content:center}.debug-panel .resize-handle{position:absolute;background:hsla(0,0%,100%,.1);z-index:10;transition:background .2s}.debug-panel .resize-handle:hover{background:hsla(0,0%,100%,.3)}.debug-panel .resize-left,.debug-panel .resize-right{top:0;bottom:0;width:6px;cursor:ew-resize}.debug-panel .resize-left{left:-3px}.debug-panel .resize-right{right:-3px}.debug-panel .resize-top,.debug-panel .resize-bottom{left:0;right:0;height:6px;cursor:ns-resize}.debug-panel .resize-top{top:-3px}.debug-panel .resize-bottom{bottom:-3px}.debug-panel .resize-top-left,.debug-panel .resize-top-right,.debug-panel .resize-bottom-left,.debug-panel .resize-bottom-right{width:10px;height:10px}.debug-panel .resize-top-left{left:-3px;top:-3px;cursor:nwse-resize}.debug-panel .resize-top-right{right:-3px;top:-3px;cursor:nesw-resize}.debug-panel .resize-bottom-left{left:-3px;bottom:-3px;cursor:nesw-resize}.debug-panel .resize-bottom-right{right:-3px;bottom:-3px;cursor:nwse-resize}.debug-state{position:relative;flex:1 0 100%;display:flex;flex-direction:column;margin-bottom:5px;margin-left:10px}.debug-state .json-toggle{position:absolute;top:2px;left:-22px;margin:0 10px 0 0;border:none;background:none;cursor:pointer;color:#888;font-size:14px;padding:0;width:20px;height:20px;transition:color .2s}.debug-state .json-toggle:hover{color:#fff}.debug-state .json-toggle:focus{outline:none}.debug-state .debug-state-label{font-size:13px;font-weight:bold;padding:5px 0;color:#ccc}.debug-state .debug-state-label:hover{color:#fff;cursor:pointer;text-decoration:underline}.debug-state .json-wrapper{position:relative;padding:5px;margin-left:-15px;background:#292929;border-radius:4px;border-left:3px solid #28a745}.debug-state .json-wrapper .debug-state-hover-actions{position:absolute;top:4px;right:4px;display:flex;gap:6px;opacity:0;transition:opacity .2s ease-in-out;z-index:10}.debug-state .json-wrapper:hover .debug-state-hover-actions{opacity:1}.debug-state .json-wrapper .debug-state-action-button{background:rgba(100,100,100,.8);color:#fff;border:none;cursor:pointer;font-size:16px;width:28px;height:28px;border-radius:4px;display:flex;align-items:center;justify-content:center;padding:0;transition:background .2s ease-in-out,transform .1s ease-in-out}.debug-state .json-wrapper .debug-state-action-button:hover{transform:scale(1.1)}.debug-state .json-wrapper .debug-state-action-button:active{transform:scale(0.95)}.debug-state .json-wrapper .debug-state-action-button:focus{outline:none}.debug-state .json-wrapper .debug-state-copy-button{background:rgba(85,170,255,.8)}.debug-state .json-wrapper .debug-state-copy-button:hover{background:#28f}.debug-state .json-wrapper .debug-state-delete-button{background:rgba(255,85,85,.8)}.debug-state .json-wrapper .debug-state-delete-button:hover{background:#f22}.debug-state.collapsed .json-wrapper{display:none}';
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
  var import_eventbusjs = __toESM(require_eventbus_min(), 1);
  var import_fast_safe_stringify = __toESM(require_fast_safe_stringify(), 1);

  // node_modules/jsondiffpatch/lib/clone.js
  function cloneRegExp(re) {
    var _a;
    const regexMatch = /^\/(.*)\/([gimyu]*)$/.exec(re.toString());
    if (!regexMatch) {
      throw new Error("Invalid RegExp");
    }
    return new RegExp((_a = regexMatch[1]) !== null && _a !== void 0 ? _a : "", regexMatch[2]);
  }
  function clone(arg) {
    if (typeof arg !== "object") {
      return arg;
    }
    if (arg === null) {
      return null;
    }
    if (Array.isArray(arg)) {
      return arg.map(clone);
    }
    if (arg instanceof Date) {
      return new Date(arg.getTime());
    }
    if (arg instanceof RegExp) {
      return cloneRegExp(arg);
    }
    const cloned = {};
    for (const name in arg) {
      if (Object.prototype.hasOwnProperty.call(arg, name)) {
        cloned[name] = clone(arg[name]);
      }
    }
    return cloned;
  }

  // node_modules/jsondiffpatch/lib/assertions/arrays.js
  function assertNonEmptyArray(arr, message) {
    if (arr.length === 0) {
      throw new Error(message || "Expected a non-empty array");
    }
  }
  var lastNonEmpty = (arr) => arr[arr.length - 1];

  // node_modules/jsondiffpatch/lib/contexts/context.js
  var Context = class {
    setResult(result) {
      this.result = result;
      this.hasResult = true;
      return this;
    }
    exit() {
      this.exiting = true;
      return this;
    }
    push(child, name) {
      child.parent = this;
      if (typeof name !== "undefined") {
        child.childName = name;
      }
      child.root = this.root || this;
      child.options = child.options || this.options;
      if (!this.children) {
        this.children = [child];
        this.nextAfterChildren = this.next || null;
        this.next = child;
      } else {
        assertNonEmptyArray(this.children);
        lastNonEmpty(this.children).next = child;
        this.children.push(child);
      }
      child.next = this;
      return this;
    }
  };

  // node_modules/jsondiffpatch/lib/contexts/diff.js
  var DiffContext = class extends Context {
    constructor(left, right) {
      super();
      this.left = left;
      this.right = right;
      this.pipe = "diff";
    }
    prepareDeltaResult(result) {
      var _a, _b, _c, _d;
      if (typeof result === "object") {
        if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.omitRemovedValues) && Array.isArray(result) && result.length > 1 && (result.length === 2 || // modified
        result[2] === 0 || // deleted
        result[2] === 3)) {
          result[0] = 0;
        }
        if ((_b = this.options) === null || _b === void 0 ? void 0 : _b.cloneDiffValues) {
          const clone2 = typeof ((_c = this.options) === null || _c === void 0 ? void 0 : _c.cloneDiffValues) === "function" ? (_d = this.options) === null || _d === void 0 ? void 0 : _d.cloneDiffValues : clone;
          if (typeof result[0] === "object") {
            result[0] = clone2(result[0]);
          }
          if (typeof result[1] === "object") {
            result[1] = clone2(result[1]);
          }
        }
      }
      return result;
    }
    setResult(result) {
      this.prepareDeltaResult(result);
      return super.setResult(result);
    }
  };
  var diff_default = DiffContext;

  // node_modules/jsondiffpatch/lib/contexts/patch.js
  var PatchContext = class extends Context {
    constructor(left, delta) {
      super();
      this.left = left;
      this.delta = delta;
      this.pipe = "patch";
    }
  };
  var patch_default = PatchContext;

  // node_modules/jsondiffpatch/lib/contexts/reverse.js
  var ReverseContext = class extends Context {
    constructor(delta) {
      super();
      this.delta = delta;
      this.pipe = "reverse";
    }
  };
  var reverse_default = ReverseContext;

  // node_modules/jsondiffpatch/lib/pipe.js
  var Pipe = class {
    constructor(name) {
      this.name = name;
      this.filters = [];
    }
    process(input) {
      if (!this.processor) {
        throw new Error("add this pipe to a processor before using it");
      }
      const debug2 = this.debug;
      const length = this.filters.length;
      const context = input;
      for (let index = 0; index < length; index++) {
        const filter = this.filters[index];
        if (!filter)
          continue;
        if (debug2) {
          this.log(`filter: ${filter.filterName}`);
        }
        filter(context);
        if (typeof context === "object" && context.exiting) {
          context.exiting = false;
          break;
        }
      }
      if (!context.next && this.resultCheck) {
        this.resultCheck(context);
      }
    }
    log(msg) {
      console.log(`[jsondiffpatch] ${this.name} pipe, ${msg}`);
    }
    append(...args) {
      this.filters.push(...args);
      return this;
    }
    prepend(...args) {
      this.filters.unshift(...args);
      return this;
    }
    indexOf(filterName) {
      if (!filterName) {
        throw new Error("a filter name is required");
      }
      for (let index = 0; index < this.filters.length; index++) {
        const filter = this.filters[index];
        if ((filter === null || filter === void 0 ? void 0 : filter.filterName) === filterName) {
          return index;
        }
      }
      throw new Error(`filter not found: ${filterName}`);
    }
    list() {
      return this.filters.map((f) => f.filterName);
    }
    after(filterName, ...params) {
      const index = this.indexOf(filterName);
      this.filters.splice(index + 1, 0, ...params);
      return this;
    }
    before(filterName, ...params) {
      const index = this.indexOf(filterName);
      this.filters.splice(index, 0, ...params);
      return this;
    }
    replace(filterName, ...params) {
      const index = this.indexOf(filterName);
      this.filters.splice(index, 1, ...params);
      return this;
    }
    remove(filterName) {
      const index = this.indexOf(filterName);
      this.filters.splice(index, 1);
      return this;
    }
    clear() {
      this.filters.length = 0;
      return this;
    }
    shouldHaveResult(should) {
      if (should === false) {
        this.resultCheck = null;
        return this;
      }
      if (this.resultCheck) {
        return this;
      }
      this.resultCheck = (context) => {
        if (!context.hasResult) {
          console.log(context);
          const error = new Error(`${this.name} failed`);
          error.noResult = true;
          throw error;
        }
      };
      return this;
    }
  };
  var pipe_default = Pipe;

  // node_modules/jsondiffpatch/lib/processor.js
  var Processor = class {
    constructor(options) {
      this.selfOptions = options || {};
      this.pipes = {};
    }
    options(options) {
      if (options) {
        this.selfOptions = options;
      }
      return this.selfOptions;
    }
    pipe(name, pipeArg) {
      let pipe = pipeArg;
      if (typeof name === "string") {
        if (typeof pipe === "undefined") {
          return this.pipes[name];
        }
        this.pipes[name] = pipe;
      }
      if (name && name.name) {
        pipe = name;
        if (pipe.processor === this) {
          return pipe;
        }
        this.pipes[pipe.name] = pipe;
      }
      if (!pipe) {
        throw new Error(`pipe is not defined: ${name}`);
      }
      pipe.processor = this;
      return pipe;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process(input, pipe) {
      let context = input;
      context.options = this.options();
      let nextPipe = pipe || input.pipe || "default";
      let lastPipe = void 0;
      while (nextPipe) {
        if (typeof context.nextAfterChildren !== "undefined") {
          context.next = context.nextAfterChildren;
          context.nextAfterChildren = null;
        }
        if (typeof nextPipe === "string") {
          nextPipe = this.pipe(nextPipe);
        }
        nextPipe.process(context);
        lastPipe = nextPipe;
        nextPipe = null;
        if (context) {
          if (context.next) {
            context = context.next;
            nextPipe = context.pipe || lastPipe;
          }
        }
      }
      return context.hasResult ? context.result : void 0;
    }
  };
  var processor_default = Processor;

  // node_modules/jsondiffpatch/lib/filters/lcs.js
  var defaultMatch = (array1, array2, index1, index2) => array1[index1] === array2[index2];
  var lengthMatrix = (array1, array2, match, context) => {
    var _a, _b, _c;
    const len1 = array1.length;
    const len2 = array2.length;
    let x;
    let y;
    const matrix = new Array(len1 + 1);
    for (x = 0; x < len1 + 1; x++) {
      const matrixNewRow = new Array(len2 + 1);
      for (y = 0; y < len2 + 1; y++) {
        matrixNewRow[y] = 0;
      }
      matrix[x] = matrixNewRow;
    }
    matrix.match = match;
    for (x = 1; x < len1 + 1; x++) {
      const matrixRowX = matrix[x];
      if (matrixRowX === void 0) {
        throw new Error("LCS matrix row is undefined");
      }
      const matrixRowBeforeX = matrix[x - 1];
      if (matrixRowBeforeX === void 0) {
        throw new Error("LCS matrix row is undefined");
      }
      for (y = 1; y < len2 + 1; y++) {
        if (match(array1, array2, x - 1, y - 1, context)) {
          matrixRowX[y] = ((_a = matrixRowBeforeX[y - 1]) !== null && _a !== void 0 ? _a : 0) + 1;
        } else {
          matrixRowX[y] = Math.max((_b = matrixRowBeforeX[y]) !== null && _b !== void 0 ? _b : 0, (_c = matrixRowX[y - 1]) !== null && _c !== void 0 ? _c : 0);
        }
      }
    }
    return matrix;
  };
  var backtrack = (matrix, array1, array2, context) => {
    let index1 = array1.length;
    let index2 = array2.length;
    const subsequence = {
      sequence: [],
      indices1: [],
      indices2: []
    };
    while (index1 !== 0 && index2 !== 0) {
      if (matrix.match === void 0) {
        throw new Error("LCS matrix match function is undefined");
      }
      const sameLetter = matrix.match(array1, array2, index1 - 1, index2 - 1, context);
      if (sameLetter) {
        subsequence.sequence.unshift(array1[index1 - 1]);
        subsequence.indices1.unshift(index1 - 1);
        subsequence.indices2.unshift(index2 - 1);
        --index1;
        --index2;
      } else {
        const matrixRowIndex1 = matrix[index1];
        if (matrixRowIndex1 === void 0) {
          throw new Error("LCS matrix row is undefined");
        }
        const valueAtMatrixAbove = matrixRowIndex1[index2 - 1];
        if (valueAtMatrixAbove === void 0) {
          throw new Error("LCS matrix value is undefined");
        }
        const matrixRowBeforeIndex1 = matrix[index1 - 1];
        if (matrixRowBeforeIndex1 === void 0) {
          throw new Error("LCS matrix row is undefined");
        }
        const valueAtMatrixLeft = matrixRowBeforeIndex1[index2];
        if (valueAtMatrixLeft === void 0) {
          throw new Error("LCS matrix value is undefined");
        }
        if (valueAtMatrixAbove > valueAtMatrixLeft) {
          --index2;
        } else {
          --index1;
        }
      }
    }
    return subsequence;
  };
  var get = (array1, array2, match, context) => {
    const innerContext = context || {};
    const matrix = lengthMatrix(array1, array2, match || defaultMatch, innerContext);
    return backtrack(matrix, array1, array2, innerContext);
  };
  var lcs_default = {
    get
  };

  // node_modules/jsondiffpatch/lib/filters/arrays.js
  var ARRAY_MOVE = 3;
  function arraysHaveMatchByRef(array1, array2, len1, len2) {
    for (let index1 = 0; index1 < len1; index1++) {
      const val1 = array1[index1];
      for (let index2 = 0; index2 < len2; index2++) {
        const val2 = array2[index2];
        if (index1 !== index2 && val1 === val2) {
          return true;
        }
      }
    }
    return false;
  }
  function matchItems(array1, array2, index1, index2, context) {
    const value1 = array1[index1];
    const value2 = array2[index2];
    if (value1 === value2) {
      return true;
    }
    if (typeof value1 !== "object" || typeof value2 !== "object") {
      return false;
    }
    const objectHash = context.objectHash;
    if (!objectHash) {
      return context.matchByPosition && index1 === index2;
    }
    context.hashCache1 = context.hashCache1 || [];
    let hash1 = context.hashCache1[index1];
    if (typeof hash1 === "undefined") {
      context.hashCache1[index1] = hash1 = objectHash(value1, index1);
    }
    if (typeof hash1 === "undefined") {
      return false;
    }
    context.hashCache2 = context.hashCache2 || [];
    let hash2 = context.hashCache2[index2];
    if (typeof hash2 === "undefined") {
      context.hashCache2[index2] = hash2 = objectHash(value2, index2);
    }
    if (typeof hash2 === "undefined") {
      return false;
    }
    return hash1 === hash2;
  }
  var diffFilter = function arraysDiffFilter(context) {
    var _a, _b, _c, _d, _e;
    if (!context.leftIsArray) {
      return;
    }
    const matchContext = {
      objectHash: (_a = context.options) === null || _a === void 0 ? void 0 : _a.objectHash,
      matchByPosition: (_b = context.options) === null || _b === void 0 ? void 0 : _b.matchByPosition
    };
    let commonHead = 0;
    let commonTail = 0;
    let index;
    let index1;
    let index2;
    const array1 = context.left;
    const array2 = context.right;
    const len1 = array1.length;
    const len2 = array2.length;
    let child;
    if (len1 > 0 && len2 > 0 && !matchContext.objectHash && typeof matchContext.matchByPosition !== "boolean") {
      matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);
    }
    while (commonHead < len1 && commonHead < len2 && matchItems(array1, array2, commonHead, commonHead, matchContext)) {
      index = commonHead;
      child = new diff_default(array1[index], array2[index]);
      context.push(child, index);
      commonHead++;
    }
    while (commonTail + commonHead < len1 && commonTail + commonHead < len2 && matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {
      index1 = len1 - 1 - commonTail;
      index2 = len2 - 1 - commonTail;
      child = new diff_default(array1[index1], array2[index2]);
      context.push(child, index2);
      commonTail++;
    }
    let result;
    if (commonHead + commonTail === len1) {
      if (len1 === len2) {
        context.setResult(void 0).exit();
        return;
      }
      result = result || {
        _t: "a"
      };
      for (index = commonHead; index < len2 - commonTail; index++) {
        result[index] = [array2[index]];
        context.prepareDeltaResult(result[index]);
      }
      context.setResult(result).exit();
      return;
    }
    if (commonHead + commonTail === len2) {
      result = result || {
        _t: "a"
      };
      for (index = commonHead; index < len1 - commonTail; index++) {
        const key = `_${index}`;
        result[key] = [array1[index], 0, 0];
        context.prepareDeltaResult(result[key]);
      }
      context.setResult(result).exit();
      return;
    }
    matchContext.hashCache1 = void 0;
    matchContext.hashCache2 = void 0;
    const trimmed1 = array1.slice(commonHead, len1 - commonTail);
    const trimmed2 = array2.slice(commonHead, len2 - commonTail);
    const seq = lcs_default.get(trimmed1, trimmed2, matchItems, matchContext);
    const removedItems = [];
    result = result || {
      _t: "a"
    };
    for (index = commonHead; index < len1 - commonTail; index++) {
      if (seq.indices1.indexOf(index - commonHead) < 0) {
        const key = `_${index}`;
        result[key] = [array1[index], 0, 0];
        context.prepareDeltaResult(result[key]);
        removedItems.push(index);
      }
    }
    let detectMove = true;
    if (((_c = context.options) === null || _c === void 0 ? void 0 : _c.arrays) && context.options.arrays.detectMove === false) {
      detectMove = false;
    }
    let includeValueOnMove = false;
    if ((_e = (_d = context.options) === null || _d === void 0 ? void 0 : _d.arrays) === null || _e === void 0 ? void 0 : _e.includeValueOnMove) {
      includeValueOnMove = true;
    }
    const removedItemsLength = removedItems.length;
    for (index = commonHead; index < len2 - commonTail; index++) {
      const indexOnArray2 = seq.indices2.indexOf(index - commonHead);
      if (indexOnArray2 < 0) {
        let isMove = false;
        if (detectMove && removedItemsLength > 0) {
          for (let removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
            index1 = removedItems[removeItemIndex1];
            const resultItem = index1 === void 0 ? void 0 : result[`_${index1}`];
            if (index1 !== void 0 && resultItem && matchItems(trimmed1, trimmed2, index1 - commonHead, index - commonHead, matchContext)) {
              resultItem.splice(1, 2, index, ARRAY_MOVE);
              resultItem.splice(1, 2, index, ARRAY_MOVE);
              if (!includeValueOnMove) {
                resultItem[0] = "";
              }
              index2 = index;
              child = new diff_default(array1[index1], array2[index2]);
              context.push(child, index2);
              removedItems.splice(removeItemIndex1, 1);
              isMove = true;
              break;
            }
          }
        }
        if (!isMove) {
          result[index] = [array2[index]];
          context.prepareDeltaResult(result[index]);
        }
      } else {
        if (seq.indices1[indexOnArray2] === void 0) {
          throw new Error(`Invalid indexOnArray2: ${indexOnArray2}, seq.indices1: ${seq.indices1}`);
        }
        index1 = seq.indices1[indexOnArray2] + commonHead;
        if (seq.indices2[indexOnArray2] === void 0) {
          throw new Error(`Invalid indexOnArray2: ${indexOnArray2}, seq.indices2: ${seq.indices2}`);
        }
        index2 = seq.indices2[indexOnArray2] + commonHead;
        child = new diff_default(array1[index1], array2[index2]);
        context.push(child, index2);
      }
    }
    context.setResult(result).exit();
  };
  diffFilter.filterName = "arrays";
  var compare = {
    numerically(a, b) {
      return a - b;
    },
    numericallyBy(name) {
      return (a, b) => a[name] - b[name];
    }
  };
  var patchFilter = function nestedPatchFilter(context) {
    var _a;
    if (!context.nested) {
      return;
    }
    const nestedDelta = context.delta;
    if (nestedDelta._t !== "a") {
      return;
    }
    let index;
    let index1;
    const delta = nestedDelta;
    const array = context.left;
    let toRemove = [];
    let toInsert = [];
    const toModify = [];
    for (index in delta) {
      if (index !== "_t") {
        if (index[0] === "_") {
          const removedOrMovedIndex = index;
          if (delta[removedOrMovedIndex] !== void 0 && (delta[removedOrMovedIndex][2] === 0 || delta[removedOrMovedIndex][2] === ARRAY_MOVE)) {
            toRemove.push(Number.parseInt(index.slice(1), 10));
          } else {
            throw new Error(`only removal or move can be applied at original array indices, invalid diff type: ${(_a = delta[removedOrMovedIndex]) === null || _a === void 0 ? void 0 : _a[2]}`);
          }
        } else {
          const numberIndex = index;
          if (delta[numberIndex].length === 1) {
            toInsert.push({
              index: Number.parseInt(numberIndex, 10),
              value: delta[numberIndex][0]
            });
          } else {
            toModify.push({
              index: Number.parseInt(numberIndex, 10),
              delta: delta[numberIndex]
            });
          }
        }
      }
    }
    toRemove = toRemove.sort(compare.numerically);
    for (index = toRemove.length - 1; index >= 0; index--) {
      index1 = toRemove[index];
      if (index1 === void 0)
        continue;
      const indexDiff = delta[`_${index1}`];
      const removedValue = array.splice(index1, 1)[0];
      if ((indexDiff === null || indexDiff === void 0 ? void 0 : indexDiff[2]) === ARRAY_MOVE) {
        toInsert.push({
          index: indexDiff[1],
          value: removedValue
        });
      }
    }
    toInsert = toInsert.sort(compare.numericallyBy("index"));
    const toInsertLength = toInsert.length;
    for (index = 0; index < toInsertLength; index++) {
      const insertion = toInsert[index];
      if (insertion === void 0)
        continue;
      array.splice(insertion.index, 0, insertion.value);
    }
    const toModifyLength = toModify.length;
    if (toModifyLength > 0) {
      for (index = 0; index < toModifyLength; index++) {
        const modification = toModify[index];
        if (modification === void 0)
          continue;
        const child = new patch_default(array[modification.index], modification.delta);
        context.push(child, modification.index);
      }
    }
    if (!context.children) {
      context.setResult(array).exit();
      return;
    }
    context.exit();
  };
  patchFilter.filterName = "arrays";
  var collectChildrenPatchFilter = function collectChildrenPatchFilter2(context) {
    if (!context || !context.children) {
      return;
    }
    const deltaWithChildren = context.delta;
    if (deltaWithChildren._t !== "a") {
      return;
    }
    const array = context.left;
    const length = context.children.length;
    for (let index = 0; index < length; index++) {
      const child = context.children[index];
      if (child === void 0)
        continue;
      const arrayIndex = child.childName;
      array[arrayIndex] = child.result;
    }
    context.setResult(array).exit();
  };
  collectChildrenPatchFilter.filterName = "arraysCollectChildren";
  var reverseFilter = function arraysReverseFilter(context) {
    if (!context.nested) {
      const nonNestedDelta = context.delta;
      if (nonNestedDelta[2] === ARRAY_MOVE) {
        const arrayMoveDelta = nonNestedDelta;
        context.newName = `_${arrayMoveDelta[1]}`;
        context.setResult([
          arrayMoveDelta[0],
          Number.parseInt(context.childName.substring(1), 10),
          ARRAY_MOVE
        ]).exit();
      }
      return;
    }
    const nestedDelta = context.delta;
    if (nestedDelta._t !== "a") {
      return;
    }
    const arrayDelta = nestedDelta;
    for (const name in arrayDelta) {
      if (name === "_t") {
        continue;
      }
      const child = new reverse_default(arrayDelta[name]);
      context.push(child, name);
    }
    context.exit();
  };
  reverseFilter.filterName = "arrays";
  var reverseArrayDeltaIndex = (delta, index, itemDelta) => {
    if (typeof index === "string" && index[0] === "_") {
      return Number.parseInt(index.substring(1), 10);
    }
    if (Array.isArray(itemDelta) && itemDelta[2] === 0) {
      return `_${index}`;
    }
    let reverseIndex = +index;
    for (const deltaIndex in delta) {
      const deltaItem = delta[deltaIndex];
      if (Array.isArray(deltaItem)) {
        if (deltaItem[2] === ARRAY_MOVE) {
          const moveFromIndex = Number.parseInt(deltaIndex.substring(1), 10);
          const moveToIndex = deltaItem[1];
          if (moveToIndex === +index) {
            return moveFromIndex;
          }
          if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {
            reverseIndex++;
          } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {
            reverseIndex--;
          }
        } else if (deltaItem[2] === 0) {
          const deleteIndex = Number.parseInt(deltaIndex.substring(1), 10);
          if (deleteIndex <= reverseIndex) {
            reverseIndex++;
          }
        } else if (deltaItem.length === 1 && Number.parseInt(deltaIndex, 10) <= reverseIndex) {
          reverseIndex--;
        }
      }
    }
    return reverseIndex;
  };
  var collectChildrenReverseFilter = (context) => {
    if (!context || !context.children) {
      return;
    }
    const deltaWithChildren = context.delta;
    if (deltaWithChildren._t !== "a") {
      return;
    }
    const arrayDelta = deltaWithChildren;
    const length = context.children.length;
    const delta = {
      _t: "a"
    };
    for (let index = 0; index < length; index++) {
      const child = context.children[index];
      if (child === void 0)
        continue;
      let name = child.newName;
      if (typeof name === "undefined") {
        if (child.childName === void 0) {
          throw new Error("child.childName is undefined");
        }
        name = reverseArrayDeltaIndex(arrayDelta, child.childName, child.result);
      }
      if (delta[name] !== child.result) {
        delta[name] = child.result;
      }
    }
    context.setResult(delta).exit();
  };
  collectChildrenReverseFilter.filterName = "arraysCollectChildren";

  // node_modules/jsondiffpatch/lib/filters/dates.js
  var diffFilter2 = function datesDiffFilter(context) {
    if (context.left instanceof Date) {
      if (context.right instanceof Date) {
        if (context.left.getTime() !== context.right.getTime()) {
          context.setResult([context.left, context.right]);
        } else {
          context.setResult(void 0);
        }
      } else {
        context.setResult([context.left, context.right]);
      }
      context.exit();
    } else if (context.right instanceof Date) {
      context.setResult([context.left, context.right]).exit();
    }
  };
  diffFilter2.filterName = "dates";

  // node_modules/jsondiffpatch/lib/filters/nested.js
  var collectChildrenDiffFilter = (context) => {
    if (!context || !context.children) {
      return;
    }
    const length = context.children.length;
    let result = context.result;
    for (let index = 0; index < length; index++) {
      const child = context.children[index];
      if (child === void 0)
        continue;
      if (typeof child.result === "undefined") {
        continue;
      }
      result = result || {};
      if (child.childName === void 0) {
        throw new Error("diff child.childName is undefined");
      }
      result[child.childName] = child.result;
    }
    if (result && context.leftIsArray) {
      result._t = "a";
    }
    context.setResult(result).exit();
  };
  collectChildrenDiffFilter.filterName = "collectChildren";
  var objectsDiffFilter = (context) => {
    var _a;
    if (context.leftIsArray || context.leftType !== "object") {
      return;
    }
    const left = context.left;
    const right = context.right;
    const propertyFilter = (_a = context.options) === null || _a === void 0 ? void 0 : _a.propertyFilter;
    for (const name in left) {
      if (!Object.prototype.hasOwnProperty.call(left, name)) {
        continue;
      }
      if (propertyFilter && !propertyFilter(name, context)) {
        continue;
      }
      const child = new diff_default(left[name], right[name]);
      context.push(child, name);
    }
    for (const name in right) {
      if (!Object.prototype.hasOwnProperty.call(right, name)) {
        continue;
      }
      if (propertyFilter && !propertyFilter(name, context)) {
        continue;
      }
      if (typeof left[name] === "undefined") {
        const child = new diff_default(void 0, right[name]);
        context.push(child, name);
      }
    }
    if (!context.children || context.children.length === 0) {
      context.setResult(void 0).exit();
      return;
    }
    context.exit();
  };
  objectsDiffFilter.filterName = "objects";
  var patchFilter2 = function nestedPatchFilter2(context) {
    if (!context.nested) {
      return;
    }
    const nestedDelta = context.delta;
    if (nestedDelta._t) {
      return;
    }
    const objectDelta = nestedDelta;
    for (const name in objectDelta) {
      const child = new patch_default(context.left[name], objectDelta[name]);
      context.push(child, name);
    }
    context.exit();
  };
  patchFilter2.filterName = "objects";
  var collectChildrenPatchFilter3 = function collectChildrenPatchFilter4(context) {
    if (!context || !context.children) {
      return;
    }
    const deltaWithChildren = context.delta;
    if (deltaWithChildren._t) {
      return;
    }
    const object = context.left;
    const length = context.children.length;
    for (let index = 0; index < length; index++) {
      const child = context.children[index];
      if (child === void 0)
        continue;
      const property = child.childName;
      if (Object.prototype.hasOwnProperty.call(context.left, property) && child.result === void 0) {
        delete object[property];
      } else if (object[property] !== child.result) {
        object[property] = child.result;
      }
    }
    context.setResult(object).exit();
  };
  collectChildrenPatchFilter3.filterName = "collectChildren";
  var reverseFilter2 = function nestedReverseFilter(context) {
    if (!context.nested) {
      return;
    }
    const nestedDelta = context.delta;
    if (nestedDelta._t) {
      return;
    }
    const objectDelta = context.delta;
    for (const name in objectDelta) {
      const child = new reverse_default(objectDelta[name]);
      context.push(child, name);
    }
    context.exit();
  };
  reverseFilter2.filterName = "objects";
  var collectChildrenReverseFilter2 = (context) => {
    if (!context || !context.children) {
      return;
    }
    const deltaWithChildren = context.delta;
    if (deltaWithChildren._t) {
      return;
    }
    const length = context.children.length;
    const delta = {};
    for (let index = 0; index < length; index++) {
      const child = context.children[index];
      if (child === void 0)
        continue;
      const property = child.childName;
      if (delta[property] !== child.result) {
        delta[property] = child.result;
      }
    }
    context.setResult(delta).exit();
  };
  collectChildrenReverseFilter2.filterName = "collectChildren";

  // node_modules/jsondiffpatch/lib/filters/texts.js
  var TEXT_DIFF = 2;
  var DEFAULT_MIN_LENGTH = 60;
  var cachedDiffPatch = null;
  function getDiffMatchPatch(options, required) {
    var _a;
    if (!cachedDiffPatch) {
      let instance;
      if ((_a = options === null || options === void 0 ? void 0 : options.textDiff) === null || _a === void 0 ? void 0 : _a.diffMatchPatch) {
        instance = new options.textDiff.diffMatchPatch();
      } else {
        if (!required) {
          return null;
        }
        const error = new Error("The diff-match-patch library was not provided. Pass the library in through the options or use the `jsondiffpatch/with-text-diffs` entry-point.");
        error.diff_match_patch_not_found = true;
        throw error;
      }
      cachedDiffPatch = {
        diff: (txt1, txt2) => instance.patch_toText(instance.patch_make(txt1, txt2)),
        patch: (txt1, patch2) => {
          const results = instance.patch_apply(instance.patch_fromText(patch2), txt1);
          for (const resultOk of results[1]) {
            if (!resultOk) {
              const error = new Error("text patch failed");
              error.textPatchFailed = true;
              throw error;
            }
          }
          return results[0];
        }
      };
    }
    return cachedDiffPatch;
  }
  var diffFilter3 = function textsDiffFilter(context) {
    var _a, _b;
    if (context.leftType !== "string") {
      return;
    }
    const left = context.left;
    const right = context.right;
    const minLength = ((_b = (_a = context.options) === null || _a === void 0 ? void 0 : _a.textDiff) === null || _b === void 0 ? void 0 : _b.minLength) || DEFAULT_MIN_LENGTH;
    if (left.length < minLength || right.length < minLength) {
      context.setResult([left, right]).exit();
      return;
    }
    const diffMatchPatch = getDiffMatchPatch(context.options);
    if (!diffMatchPatch) {
      context.setResult([left, right]).exit();
      return;
    }
    const diff2 = diffMatchPatch.diff;
    context.setResult([diff2(left, right), 0, TEXT_DIFF]).exit();
  };
  diffFilter3.filterName = "texts";
  var patchFilter3 = function textsPatchFilter(context) {
    if (context.nested) {
      return;
    }
    const nonNestedDelta = context.delta;
    if (nonNestedDelta[2] !== TEXT_DIFF) {
      return;
    }
    const textDiffDelta = nonNestedDelta;
    const patch2 = getDiffMatchPatch(context.options, true).patch;
    context.setResult(patch2(context.left, textDiffDelta[0])).exit();
  };
  patchFilter3.filterName = "texts";
  var textDeltaReverse = (delta) => {
    var _a, _b, _c;
    const headerRegex = /^@@ +-(\d+),(\d+) +\+(\d+),(\d+) +@@$/;
    const lines = delta.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === void 0)
        continue;
      const lineStart = line.slice(0, 1);
      if (lineStart === "@") {
        const header = headerRegex.exec(line);
        if (header !== null) {
          const lineHeader = i;
          lines[lineHeader] = `@@ -${header[3]},${header[4]} +${header[1]},${header[2]} @@`;
        }
      } else if (lineStart === "+") {
        lines[i] = `-${(_a = lines[i]) === null || _a === void 0 ? void 0 : _a.slice(1)}`;
        if (((_b = lines[i - 1]) === null || _b === void 0 ? void 0 : _b.slice(0, 1)) === "+") {
          const lineTmp = lines[i];
          lines[i] = lines[i - 1];
          lines[i - 1] = lineTmp;
        }
      } else if (lineStart === "-") {
        lines[i] = `+${(_c = lines[i]) === null || _c === void 0 ? void 0 : _c.slice(1)}`;
      }
    }
    return lines.join("\n");
  };
  var reverseFilter3 = function textsReverseFilter(context) {
    if (context.nested) {
      return;
    }
    const nonNestedDelta = context.delta;
    if (nonNestedDelta[2] !== TEXT_DIFF) {
      return;
    }
    const textDiffDelta = nonNestedDelta;
    context.setResult([textDeltaReverse(textDiffDelta[0]), 0, TEXT_DIFF]).exit();
  };
  reverseFilter3.filterName = "texts";

  // node_modules/jsondiffpatch/lib/filters/trivial.js
  var diffFilter4 = function trivialMatchesDiffFilter(context) {
    if (context.left === context.right) {
      context.setResult(void 0).exit();
      return;
    }
    if (typeof context.left === "undefined") {
      if (typeof context.right === "function") {
        throw new Error("functions are not supported");
      }
      context.setResult([context.right]).exit();
      return;
    }
    if (typeof context.right === "undefined") {
      context.setResult([context.left, 0, 0]).exit();
      return;
    }
    if (typeof context.left === "function" || typeof context.right === "function") {
      throw new Error("functions are not supported");
    }
    context.leftType = context.left === null ? "null" : typeof context.left;
    context.rightType = context.right === null ? "null" : typeof context.right;
    if (context.leftType !== context.rightType) {
      context.setResult([context.left, context.right]).exit();
      return;
    }
    if (context.leftType === "boolean" || context.leftType === "number") {
      context.setResult([context.left, context.right]).exit();
      return;
    }
    if (context.leftType === "object") {
      context.leftIsArray = Array.isArray(context.left);
    }
    if (context.rightType === "object") {
      context.rightIsArray = Array.isArray(context.right);
    }
    if (context.leftIsArray !== context.rightIsArray) {
      context.setResult([context.left, context.right]).exit();
      return;
    }
    if (context.left instanceof RegExp) {
      if (context.right instanceof RegExp) {
        context.setResult([context.left.toString(), context.right.toString()]).exit();
      } else {
        context.setResult([context.left, context.right]).exit();
      }
    }
  };
  diffFilter4.filterName = "trivial";
  var patchFilter4 = function trivialMatchesPatchFilter(context) {
    if (typeof context.delta === "undefined") {
      context.setResult(context.left).exit();
      return;
    }
    context.nested = !Array.isArray(context.delta);
    if (context.nested) {
      return;
    }
    const nonNestedDelta = context.delta;
    if (nonNestedDelta.length === 1) {
      context.setResult(nonNestedDelta[0]).exit();
      return;
    }
    if (nonNestedDelta.length === 2) {
      if (context.left instanceof RegExp) {
        const regexArgs = /^\/(.*)\/([gimyu]+)$/.exec(nonNestedDelta[1]);
        if (regexArgs === null || regexArgs === void 0 ? void 0 : regexArgs[1]) {
          context.setResult(new RegExp(regexArgs[1], regexArgs[2])).exit();
          return;
        }
      }
      context.setResult(nonNestedDelta[1]).exit();
      return;
    }
    if (nonNestedDelta.length === 3 && nonNestedDelta[2] === 0) {
      context.setResult(void 0).exit();
    }
  };
  patchFilter4.filterName = "trivial";
  var reverseFilter4 = function trivialReferseFilter(context) {
    if (typeof context.delta === "undefined") {
      context.setResult(context.delta).exit();
      return;
    }
    context.nested = !Array.isArray(context.delta);
    if (context.nested) {
      return;
    }
    const nonNestedDelta = context.delta;
    if (nonNestedDelta.length === 1) {
      context.setResult([nonNestedDelta[0], 0, 0]).exit();
      return;
    }
    if (nonNestedDelta.length === 2) {
      context.setResult([nonNestedDelta[1], nonNestedDelta[0]]).exit();
      return;
    }
    if (nonNestedDelta.length === 3 && nonNestedDelta[2] === 0) {
      context.setResult([nonNestedDelta[0]]).exit();
    }
  };
  reverseFilter4.filterName = "trivial";

  // node_modules/jsondiffpatch/lib/diffpatcher.js
  var DiffPatcher = class {
    constructor(options) {
      this.processor = new processor_default(options);
      this.processor.pipe(new pipe_default("diff").append(collectChildrenDiffFilter, diffFilter4, diffFilter2, diffFilter3, objectsDiffFilter, diffFilter).shouldHaveResult());
      this.processor.pipe(new pipe_default("patch").append(collectChildrenPatchFilter3, collectChildrenPatchFilter, patchFilter4, patchFilter3, patchFilter2, patchFilter).shouldHaveResult());
      this.processor.pipe(new pipe_default("reverse").append(collectChildrenReverseFilter2, collectChildrenReverseFilter, reverseFilter4, reverseFilter3, reverseFilter2, reverseFilter).shouldHaveResult());
    }
    options(options) {
      return this.processor.options(options);
    }
    diff(left, right) {
      return this.processor.process(new diff_default(left, right));
    }
    patch(left, delta) {
      return this.processor.process(new patch_default(left, delta));
    }
    reverse(delta) {
      return this.processor.process(new reverse_default(delta));
    }
    unpatch(right, delta) {
      return this.patch(right, this.reverse(delta));
    }
    clone(value) {
      return clone(value);
    }
  };
  var diffpatcher_default = DiffPatcher;

  // node_modules/jsondiffpatch/lib/index.js
  var defaultInstance;
  function diff(left, right) {
    if (!defaultInstance) {
      defaultInstance = new diffpatcher_default();
    }
    return defaultInstance.diff(left, right);
  }
  function patch(left, delta) {
    if (!defaultInstance) {
      defaultInstance = new diffpatcher_default();
    }
    return defaultInstance.patch(left, delta);
  }

  // src/constants.ts
  var COLLAPSED_INDICATOR = "\u25BA";
  var EXPANDED_INDICATOR = "\u25BC";

  // src/JsonView/JsonView.ts
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
      if (toggleButton) toggleButton.textContent = isCollapsed ? COLLAPSED_INDICATOR : EXPANDED_INDICATOR;
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
      const delta = diff(this.json, newJson);
      if (!delta) return;
      patch(this.json, delta);
      this.patchDOM(delta);
    }
    patchDOM(delta, currentPath = "") {
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
            this.updateValueNode(propertyNode, keyPath, this.getValueAtPath(this.json, keyPath));
          } else if (change.length === 3 && change[1] === 0 && change[2] === 0) {
            if (propertyNode) propertyNode.remove();
          } else if (change.length === 1) {
            this.addPropertyNode(keyPath, change[0]);
          }
        } else if (typeof change === "object") {
          this.patchDOM(change, keyPath + "/");
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
      jsonWrapper.innerHTML = "";
      this.debugStates[id].state = state;
      this.debugStates[id].jsonView.updateJson(state);
    }
    addDebugState(id, state) {
      const content = this.contentContainer.querySelector(`[data-namespace="${DEBUG_STATE_NAMESPACE}"]`);
      if (!content) {
        console.error("No content for debug namespace.");
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
      const jsonView = new JsonView(state, jsonWrapper, {
        //expandObjs: [/children/, /children\/(.*)/, /entry/]
      });
      const hoverActions = document.createElement("div");
      hoverActions.classList.add("debug-state-hover-actions");
      const copyButton = document.createElement("button");
      copyButton.classList.add("debug-state-action-button", "debug-state-copy-button");
      copyButton.innerHTML = "\u{1F4CB}";
      copyButton.title = "Copy JSON to clipboard";
      copyButton.onclick = () => this.copyDebugStateToClipboard(id, state, copyButton);
      hoverActions.appendChild(copyButton);
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("debug-state-action-button", "debug-state-delete-button");
      deleteButton.innerHTML = "\u{1F5D1}\uFE0F";
      deleteButton.title = "Delete this object";
      deleteButton.onclick = () => this.removeDebugState(id);
      hoverActions.appendChild(deleteButton);
      jsonWrapper.appendChild(hoverActions);
      this.debugStates[id] = {
        state,
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
  return __toCommonJS(src_exports);
})();
// Export to global window object for easier access
if (typeof window !== 'undefined') {
  window.DebugPanel = DevDebugPanel.DebugPanel;
  window.debug = DevDebugPanel.debug;
  window.JsonView = DevDebugPanel.JsonView;
  window.ScreenPosition = DevDebugPanel.ScreenPosition;
}
//# sourceMappingURL=index.umd.js.map
