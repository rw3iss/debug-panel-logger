Can you please make these changes?

- when the user hovers over a JsonView in the DebugPanel, it needs to show two floating icons in the upper right:
	- One icon should be a "clipboard" or "copy" icon. When the user clicks on the copy icon, it should copy the entire JSON object string for that JsonView into the clipboard (using a tiny clipboard library, or you can write your own vanilla domUtil to do that if possible). When they click copy, the clipboard icon should change to a checkmark icon for two seconds, then change back to the clipboard icon.
	- The other icon should be a "trash" icon, and when clicked, should delete only that object, and its JsonView, from the DebugPanel collection of state objects.

- Can you please change the top tab bar (debug-panel-tabs element) to look more like an actual tabbed view, and not buttons? Currently it shows the "debug-tab" elements as buttons. You can leave them as button elements if you can make them look like tabs, but please change the tab container and tab buttons themselves to look like a normal tab bar, with the selected tab highlighted, and the others looking like they are not.





- allow debug to support array args?

- combine DebugPanel & LogModule Options for DebugPaneLogModule

- benchmark the diffing algorithm vs normal replace.

- export JsonView?
- export 'autoexpand' JsonView options in DebugPanel (ie. some rules to always expand certain nodes)

- LogEvents and in general namespaces need better filtering in/out of clients

--------------------------------------------------------------------------------

Please make these changes:

The new 'copy' and 'delete' buttons on the JsonView objects that you added should instead float in the corner of the json-wrapper element. So they will only see them if the object is expanded.

Also for the tab styling: I cannot tell the difference between the selected and non-selected tabs. Can you please make the styling more apparent, with less padding between the tabs. They should look like folders with some shadowing behind them to show the contrast a bit more. Perhaps make the selected tab brighter with a little more padding at the top. Also remove the blue line below it and make the tab content background darker than the top tab bar.

--------------------------------------------------------------------------------


Please make these changes:

- Make the top tab buttons have no spacing below them, unless they are not selected, in which case just show 1px spacing below it. Selected tabs should have the same color as the tab-content background, with no spacing separating the, so it looks like the selected tab button and content are connected.
- Make the tab button text just a little brighter.
- Currently hovering over the 'json-wrapper' element when a json object is expanded does not show the copy and delete icons. Did they get removed or are they just not showing? They should show when hovering over a json-wrapper (ie. when that json object is expanded).
- Can you please add a window resize listener, and re-position the DebugPanel anytime the user resizes the window? You can put a throttle on it of 50ms. It should snap to the position it was previously in, but against wherever the new window dimensions are

Make these changes:
- The tab buttons look like buttons, but I want them to look like tabs, sticking out of the tab content section. So there should be no padding beneath them. You can change them to divs if it works better for styling. The selected tab should be more apparent. Remove any animations or effects. Please also make the selected tab have a more colorful background and brighter text so it is more apparently selected.
- Currently the hide and copy buttons do not show when hovering over the json-wrapper of an expanded object in the JsonView. Please fix that so the button show in the top right corner of the json-wrapper when hovering over it.
- The resize is not working as intended. It should try to "snap" the panel against the nearest wall when the user resizes it, and be smart about its positioning in that case. It should react to any window resize event (like dragging window border, or opening or closing the dev tools, etc).