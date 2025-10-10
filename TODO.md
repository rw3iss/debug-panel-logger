
# Styling Improvements:
- make the json-wrapper labels for the JsonView objects look more like button bars that are clickable. They should retain the current functionality of expanding and contract that json-wrapper.
- I want the individual json-wrapper elements to each be scrollable. Please leave the parent debug-tab-content scrollable, but I want the individual object's json-wrappers to have a maximum height, then be scrollable. Make sure the buttons to copy and remove the json elements are still floating in the upper right, even if the user scrolls.
- Move all of the bottom button bar actions (opacity, hide, clear), to a new "Config" panel that will show a hidden panel when the user clicks a "Cog" icon in the lower right corner. Lay all of the different actions or setting options out vertically in a nice panel that shows when the cog is clicked, and hides when the user hovers off the panel (but add 20px hidden padding around the panel to cover the hover space a bit more). Keep the 'clear' button outside of this cog panel, it should stay on the bottom bar to the left of the cog settings button.
- Add a toggle to the left of the clear button to collapse or expand all JsonView objects currently in the debug panel.
- Scrolling inside of a JsonView or json-wrapper should not propogate the scroll to outer containers. It should not sroll the background page when the JsonView scrolls.

# Smarter Snapping:
- When the panel is snapped to a side, or corner, it should keep track of this in a new setting. When the page is refreshed, or panel is reloaded, it should see if this "snappedTo" setting is set, and snap the panel again to that position on the screen.
- add an option called "stretch", which when true should make the panel's width or height fill the window's size according to where it is. If the panel is snapped against the left or right side, it should fill the height. If the panel is snapped against the top or bottom sides, it should fill the width. If the panel is snapped in a corner, stretch should default to filling the vertical height.
Then also make a toggle button in the bottom bar, next to the new collapse/expand all button, that toggles the panel 'stretch' to true or false, and will fill the panel to either the width or height according to where it is snapped. If the panel was stretch and they toggle it off, the panel should still stay snapped to whichever side or corner its at, but either its width or height should decrease to 50% of the viewort width or height, depending on the side it is snapped to.
- If the user moves the panel off of where it is currently snapped, and they had 'stretch' toggled to true, then the panel snaps to a new side, it should try to stretch the panel to that new side, even if changes from a horizontal to a vertical stretch, and vice-versa.
- Add a button to the right of the stretch button which toggles the entire DebugPanel's objects viewort to either a column or row layout. If it's row-based, it will be how it currently is (vertical), but if they click and toggle it to columns, then the DebugPanel's "debug-state" elements should all be layed out horizontally as individual columns, each with equal width, and a minimum width of 60px for now. Each JsonView will be scrollable vertically from the above styling improvement. Then the entire debug-tab-content should become scrollable horizontally. Scroll events on that element should then scroll it horizontally, if it needs it. That way when I toggle the panel as a column layout, I can also stretch it to full horizontal width, and all the objects will be laid out in individually scrollable columns.

# Functionality:
- I'd like the calls to debug to support both primitive objects, as well as arrays of arguments. If more than one argument is passed, it should then try to spread and send each as separate objects, each with their own JsonView. Basically each argument would become a separate call to debug(), however it should handle it as one call in the debug() method, and add or update each individual object there. If the first argument is a string, you should treat it as an ID, otherwise, continue to treat all arguments as objects (or other primities). Since they will not have an ID in that case, you should try to use the name of the variable, if that is possible. Since it is probably not, then you should make an ID based on the type of object (ie. string, number, boolean, object, array, etc). If the value of an object passed in debug calls is a primitive (unless it's the first string argument), it should just print that in the JsonView as its plain primitive value.
- add a DebugPanel option to 'logToConsole', that when true should also call console.log with the same arguments passed to DebugPanel.debug(). Also add a checkbox in the bottom toolbar config panel that controls this setting, and save it in local storage when changed.
- add an option to 'clearOnHide' which when true, deletes all the debug panel data when the panel becomes hidden. Save and load this settings from localstorage when loading or changing its value. Also add a checkbox/toggle button for it in the debug panel's new cog settings menu in the bottom if it.
- add a new option 'exandByDefault', that is false by default, but when true should expand all object properties, and their children, when the objects are rendered to the panel. If the value is false, the objects should show themselves and all their properties as contracted. Add a toggle button for it in the debug panel's new settings panel, with the label "Expand new objects by default" (in small text).


--------------------------------------------------------------------------------

Please make these changes:

- double clicking the top debug panel title bar where the tabs are should stretch it to wherever it should be stretched (horizonal or vertical). If it's in a corner, it should stretch vertically.

- The keyboard shortcut I have defined for toggling the show or hide (Ctrl+Alt+D) is not working on mac. Can you add another shortcut for mac to detect (Cmd+Ctrl+D) to toggle the show or hide?

- Add the 'hide' button back to the bottom panel button bar, to the left of the clear button, and move both of the buttons to the left of the other icon buttons.

- Add tooltips when hovering over the button bar buttons at the bottom, ie. for stretch, expand or collapse depending on which it is currentlly, and view layout (change tooltip based on what the view would be), etc.

- Make the expand/collapse icon different, maybe something that indicates objects opening or folding.

- Fix this bug: when the panel becomes unstretched (user clicks the button to unstretch), the panel should shrink to half the width of the screen if it was stretched horizontally, or otherwise half the height if it was stretched verically, and then center itself along that side. If they stretch it again, it should stretch again to the full width or height on that side. Also change the icon for the stretch button to be dynamic, so if the panel is snapped to the left or right, the icon looks more like the current icon for collapse/expand (that should also be changed as described previously), and then if the panel is snapped to the top or bottom, the icon should be how it currently is (a left and right arrow).

- Add an $animTime css variable, and set all transition animations to it's value, which should be .1s

--------------------------------------------------------------------------------

Can you also do these edits?

- Add a button on the example page to toggle panel show or hide.

- It seems the settings restore on reload, but the view state is not set correctly when I open the settings panel (for instance i have console logging enabled, and its logging, but the checkmark is unchecked in the panel on first load). Can you make sure the option views update when the panel loads?

- The cmd+ctrl+d shortcut doesn't seem to be working on my mac laptop. Can you try to figure out why and fix it? Also let's add a help panel. Replace the lower left 'Ctrl+alt+d' and other text with a help icon. When the user clicks it it should show a help overlay covering the entire DebugPanel's inner content (so the entire debug-panel element itself). If the user clicks anywhere on the help overlay it should close it and return the panel to normal. The help overlay should show a list of various shortcuts and other information. Below the help should be a section about this library and the author (me). Please include the library name, link to git url (as a git icon), the current version the built library the user is using is (if you can, or store that during compile and read it on the frontend during runtime if needed), and add a link for "Feedback" which links to the github issues page, for now. Also add "About the author" section with my name (Ryan Weiss), email (rw3iss@gmail.com), url to my website: www.ryanweiss.net, and a link to "buy me a coffee" which is: https://buymeacoffee.com/ttv1xp6yaj. Make the panel look nice a modern.


--------------------------------------------------------------------------------
 Make these changes:

- Move the debug-state json toggle into the top bar of the object label, so its to the left of the label but inside the button bar, and then the button bar should become full width.

- THe help panel is getting cut off on the top. Can you make sure it's the correct width and height of the panel itself. It needs some padding at the top, or something is off about the top as it seems cut off when the panel is small.

- When double clicking the title bar to expand it, it doesn't seem to work exactly correct. It will try to expand, but only the bottom part of the panel goes to the bottom, or it goes full height but sits in the middle where it was, and the bottom is cut off. It should snap to the side and expand to full height if its double clicked, and also contract back to half the size if they double click the title bar again. Similarly it should do the same horizontally if the panel is snapped to the top or bottom and the title bar is double-clicked.

--------------------------------------------------------------------------------

Make these changes:

- Clicking the toggle button in the headers is not expanding or contracting the objects. Make sure it does just like clicking the object bar itself does.

- Make the individual json-wrapper elements scrollable both vertically and horizontally, so the rendered objects json inside will not wrap. Then, also use the domUtils makeResizable method to make the object columns resiziable both from the left or right, and the bottom as well.

- Storage column and object view states in localstorage, and restore them for objects when those objects are drawn the first time on a new initialization. Clear them when the user clicks the clear button, with the other data.

- Change the object columns a bit so that the top button and and bottom content section look as one. I started to do that, but when the objects are collapsed in column views, it still shows a


--------------------------------------------------------------------------------


Make these changes:

- Move the debug toolbar hover buttons (on the json-wrapper) that show when hovering over it to the object's top button (the debug-state-label), on the right side together, and don't show them unless the user hovers over the button bar.

- Be default make all the debug-state object full width of the debug-tab-contnt, whether in column or row mode. If it's in column mode, the columns should have something like a flex: 1 property so they split the width.

- Move the Help, hide, and clear buttons to the left side of the bottom debug toolbar, but keep the other buttons on the right side.

- Can you go through all of the scss for DebugPanel and JsonView and clean it up. Combine any redundant classes, and use scss nested definitions when possible. Use configurable or shared values as scss variables at the top. Any styles that are repetive use base styles for and extend them. The scss should remain functionally the same as it currently is, just cleaned up.


--------------------------------------------------------------------------------

Make this change to the DebugPanel:

- if the user is resizing a side of the panel, and they try to drag the resize over to withing the snap padding of that side of the screen, the resize handler should try to snap that panel's edge to that side of the screen. So if they are dragging the right side, and they are within snap the snapp padding of the right side of the window, the right side of the panel should snap there. Similarly, if they are dragging the top or bottom, and they are within the snap padding of the top or bottom edge of the window, it should snap that side of the panel there.

# Optimizations:
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
