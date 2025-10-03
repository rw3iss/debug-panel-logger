# Install
```
yarn install debug-panel-logger
or
npm install debug-panel-logger
```

# Usage

## Standalone (vanilla):
Create a new DebugPanelLogModule, and add it to the global log modules.

This automatically creates a singleton DebugPanel and mounts it to 'root' if given, otherwise document.body.
```
const lm = new DebugPanelLogModule({ root: optionalMountEl });
addLogModule(lm);
```
Draw or update the state in the panel from anywhere else:
```
debugState('anId', anyObject);
```


## Components (React):
You can just mount an instance of DebugPanelComponent somewhere, and it will pickup all calls to debugState('id', data):
```
<DebugPanelComponent />

// anywhere else:
debugState('anId', anyObject);
```



## Todo:
Separate react dependency...