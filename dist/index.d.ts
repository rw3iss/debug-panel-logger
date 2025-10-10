declare enum ScreenPosition {
    TopLeft = "topLeft",
    Top = "top",
    TopRight = "topRight",
    Right = "right",
    BottomRight = "bottomRight",
    Bottom = "bottom",
    BottomLeft = "bottomLeft",
    Left = "left"
}
interface DebugPanelSettings {
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
    opacity: number;
    snappedTo?: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | null;
    isStretched?: boolean;
    layoutMode?: 'row' | 'column';
    logToConsole?: boolean;
    clearOnHide?: boolean;
    expandByDefault?: boolean;
    clearOnUrlChange?: boolean;
    hiddenObjects?: string[];
}
interface DebugPanelOptions {
    show?: boolean;
    position?: ScreenPosition;
    width?: number;
    height?: number;
    snap?: boolean;
    snapPadding?: number;
    logToConsole?: boolean;
    clearOnHide?: boolean;
    expandByDefault?: boolean;
}
declare class DebugPanel {
    private container;
    private tabContainer;
    private contentContainer;
    private toolbar;
    private settingsPanel;
    private opacitySlider;
    private logToConsoleCheckbox;
    private clearOnHideCheckbox;
    private expandByDefaultCheckbox;
    private clearOnUrlChangeCheckbox;
    private collapseAllButton;
    private stretchButton;
    private layoutButton;
    private tabEntries;
    private debugStates;
    private activeTab;
    private options;
    private resizeThrottleTimer;
    private snappedTo;
    private isStretched;
    private layoutMode;
    private logToConsole;
    private clearOnHide;
    private expandByDefault;
    private clearOnUrlChange;
    private hiddenObjects;
    private hiddenTab;
    private urlChangeListener;
    private lastPathname;
    constructor(options?: DebugPanelOptions);
    private createContainer;
    private createTabContainer;
    private createContentContainer;
    private createGlobalToolbar;
    private updateCollapseAllTooltip;
    private updateStretchButton;
    private updateLayoutButtonTooltip;
    private createSettingsPanel;
    private handleUrlChangeOptionToggle;
    private setupEventListeners;
    private setupResizable;
    private setupDraggable;
    private setupPosition;
    private setupKeyboardShortcut;
    private repositionToDefault;
    private resetAllSettings;
    private showHelpOverlay;
    private setupWindowResizeListener;
    private repositionOnWindowResize;
    private restoreSettings;
    private loadSettings;
    private saveSettings;
    debug(...args: any[]): void;
    private generateTypeId;
    private updateDebugState;
    private addDebugState;
    private copyDebugStateToClipboard;
    private removeDebugState;
    private toggleHideDebugState;
    private redrawDebugTabs;
    private addTab;
    private addHiddenTab;
    private updateHiddenTabLabel;
    private clearCurrentTab;
    private clearTab;
    private switchTab;
    log(namespace: string, message: Array<any> | object | string): void;
    private createLogElement;
    private removeLogEntry;
    private renderLogEntry;
    private updateToolbarLayout;
    private handleOpacityChange;
    private handleDragStart;
    private handleResizeSnapping;
    private handleDragEnd;
    private handleSnapWhileDragging;
    private toggleExpandAll;
    private toggleStretch;
    private applyStretch;
    private toggleLayoutMode;
    private applyLayoutMode;
    show(): void;
    hide(): void;
    toggle(): void;
}
declare function debug(idOrState: string, state?: any): void;

type JsonViewOptions = {
    expandAll?: boolean;
    expandObjs?: Array<string | RegExp>;
    useViewState?: boolean;
};
declare class JsonView {
    private json;
    private parentContainer;
    private options;
    private viewStates;
    constructor(json: any, parentContainer: HTMLElement, options?: JsonViewOptions);
    private render;
    private toggleExpandNode;
    private expandAllChildren;
    private collapseAllChildren;
    private copyPropertyToClipboard;
    private drawJsonNode;
    updateJson(newJson: any): void;
    private patchDOM;
    private getValueAtPath;
    private updateValueNode;
    private addPropertyNode;
}

type ResizeOptions = {
    handles?: ('top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    snapPadding?: number;
    onResizeStart?: () => void;
    onResize?: (width: number, height: number) => void;
    onResizeEnd?: () => void;
};
declare function makeResizable(container: HTMLElement, options?: ResizeOptions): void;
type DragOptions = {
    onDragStart?: (e: MouseEvent) => void;
    onDrag?: (x: number, y: number) => void | {
        x?: number;
        y?: number;
    };
    onDragEnd?: () => void;
    allowResize?: boolean;
};
declare function makeDraggable(element: HTMLElement, handleElement?: HTMLElement, options?: DragOptions): () => void;
declare function getWindowSize(): {
    width: number;
    height: number;
};

export { DebugPanel, type DebugPanelOptions, type DebugPanelSettings, type DragOptions, JsonView, type JsonViewOptions, type ResizeOptions, ScreenPosition, debug, DebugPanel as default, getWindowSize, makeDraggable, makeResizable };
