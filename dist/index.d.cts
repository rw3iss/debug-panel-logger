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
}
interface DebugPanelOptions {
    show?: boolean;
    position?: ScreenPosition;
    width?: number;
    height?: number;
    snap?: boolean;
    snapPadding?: number;
}
declare class DebugPanel {
    private container;
    private tabContainer;
    private contentContainer;
    private toolbar;
    private opacitySlider;
    private tabEntries;
    private debugStates;
    private activeTab;
    private options;
    private resizeThrottleTimer;
    constructor(options?: DebugPanelOptions);
    private createContainer;
    private createTabContainer;
    private createContentContainer;
    private createGlobalToolbar;
    private setupEventListeners;
    private setupResizable;
    private setupDraggable;
    private setupPosition;
    private setupKeyboardShortcut;
    private setupWindowResizeListener;
    private repositionOnWindowResize;
    private restoreSettings;
    private loadSettings;
    private saveSettings;
    debug(idOrState: any, state?: any): void;
    private updateDebugState;
    private addDebugState;
    private copyDebugStateToClipboard;
    private removeDebugState;
    private addTab;
    private clearCurrentTab;
    private clearTab;
    private switchTab;
    log(namespace: string, message: Array<any> | object | string): void;
    private createLogElement;
    private removeLogEntry;
    private renderLogEntry;
    private updateToolbarLayout;
    private handleOpacityChange;
    private handleSnapWhileDragging;
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
    onResize?: (width: number, height: number) => void;
};
declare function makeResizable(container: HTMLElement, options?: ResizeOptions): void;
type DragOptions = {
    onDragStart?: (e: MouseEvent) => void;
    onDrag?: (x: number, y: number) => void | {
        x?: number;
        y?: number;
    };
    onDragEnd?: () => void;
};
declare function makeDraggable(element: HTMLElement, handleElement?: HTMLElement, options?: DragOptions): () => void;
declare function getWindowSize(): {
    width: number;
    height: number;
};

export { DebugPanel, type DebugPanelOptions, type DebugPanelSettings, type DragOptions, JsonView, type JsonViewOptions, type ResizeOptions, ScreenPosition, debug, DebugPanel as default, getWindowSize, makeDraggable, makeResizable };
