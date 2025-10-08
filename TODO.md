- panel should maintain a flag if it is currently 'snapped' to a side. when the page refreshed, it should try to snap again to that side, if it was previously snapped.
- add 'collapse/expand all'
- scrolling should not scroll outer container
- add more vertical padding in scroll container parent tab-content
- export global log methods.
- make json label headers more of a button look across entire json-wrapper top.
- allow debug to support array args, and primitive values.
- try to determine strategy for not cloning the json state during updates:
	- if in != out, clear original value and assign in
- add buttons/controls to maximize panel vertically or horizontally
- add ability to lay tab content out horizontally
- add abilility to drag and drop json view objects in sort order?
- add ability to change the vertical height of json-wrapper when dragging buttom edge (and horizontal in row mode?), and make the json-wrapper containers scrollable.
	- add utility to kill the scroll event inside the scroll containers in debug panel, so they don't propagate outside.

* debug() calls should maybe be tied to a new DebugPanelLogger, or otherwise set an option to emit the event for debugPanel, and expose debug().
	- otherwise all calls to log should emit their log, debug events, if log option emitLogEvents: true.
	- or make DebugPanelLogger... with option to 'logToPanel: true', otherwise just log to console if logEnabled: true

* add options to clear the current debug panel if the page or route changes... (how to tie into custom routing?)
	- DebugPanelLogModule is registered in app... Module registers on route change to clear objects.

* add option and ability to "resize on snap" to a different side if the user tries to force drag it to another side. it should snap to that size and resize.
	- add option 'always fill width or height depending on snap side'.

- add option: clear on hide
	- add option: disable debugging if panel not showing (ie. dont route debug calls...) ?

- change the animations of to just animate the opacity in and out, and make it very quick.

- support arg spread for debug: print subsequent items as debug (multiple json views per id?)

- regular log panel entries should have less line height.

- add another view option to 'dock'
	- could show indication on the dock label if there is an object change (delta)?

- add option:
	- expandNewObjects: if true, any new json objects should be expanded in their JsonView, otherwise keep all new objects contracted.

- combine DebugPanel & LogModule Options for DebugPaneLogModule
- benchmark the diffing algorithm vs normal replace.
- export 'autoexpand' JsonView options in DebugPanel (ie. some rules to always expand certain nodes)
- LogEvents and in general namespaces need better filtering in/out of clients


--------------------------------------------------------------------------------

dev-loggers library changes (ignore these for this project):
- don't return this from console objects, should return void (or make configurable or something)
