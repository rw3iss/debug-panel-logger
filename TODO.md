- integrate dev-loggers

- try not to clone the object? Is it possible to do that somehow? Verify with me first before changing that functionality.

- add abilility to drag and drop json view objects in sort order?

- add ability to change the vertical height of json-wrapper when dragging buttom edge (and horizontal in row mode?), and make the json-wrapper containers scrollable.

* add options to clear the current debug panel if the page or route changes... (how to tie into custom routing?)
	- DebugPanelLogModule is registered in app... Module registers on route change to clear objects.

* add option and ability to "resize on snap" to a different side if the user tries to force drag it to another side. it should snap to that size and resize.
	- add option 'always fill width or height depending on snap side'.


- change the animations of to just animate the opacity in and out, and make it very quick.

- regular log panel entries should have less line height.

- add another view option to 'dock'
	- could show indication on the dock label if there is an object change (delta)?

- add option:
	- expandNewObjects: if true, any new json objects should be expanded in their JsonView, otherwise keep all new objects contracted.

- add delete tabs buttons

- combine DebugPanel & LogModule Options for DebugPaneLogModule
- benchmark the diffing algorithm vs normal replace.
- export 'autoexpand' JsonView options in DebugPanel (ie. some rules to always expand certain nodes)
- LogEvents and in general namespaces need better filtering in/out of clients


--------------------------------------------------------------------------------

dev-loggers library changes (ignore these for this project):
- don't return this from console objects, should return void (or make configurable or something)
