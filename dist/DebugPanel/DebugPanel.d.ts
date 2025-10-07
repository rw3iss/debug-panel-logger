export declare enum ScreenPosition {
    TopLeft = "topLeft",
    Top = "top",
    TopRight = "topRight",
    Right = "right",
    BottomRight = "bottomRight",
    Bottom = "bottom",
    BottomLeft = "bottomLeft",
    Left = "left"
}
export interface DebugPanelSettings {
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
    opacity: number;
}
export interface DebugPanelOptions {
    show?: boolean;
    position?: ScreenPosition;
    width?: number;
    height?: number;
    snap?: boolean;
    snapPadding?: number;
}
export declare class DebugPanel {
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
export declare function debug(idOrState: string, state?: any): void;
//# sourceMappingURL=DebugPanel.d.ts.map