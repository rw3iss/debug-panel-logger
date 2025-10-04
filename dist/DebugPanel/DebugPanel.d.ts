import { LogModule } from 'get-loggers';
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
type LogEvent = {
    namespace: string;
    args: Array<any>;
};
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
export declare class DebugPanelLogModule implements LogModule {
    name: string;
    panel: DebugPanel;
    constructor(opts?: DebugPanelOptions);
    onLog(log: LogEvent): void;
    print(...args: any[]): void;
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
    constructor(options?: DebugPanelOptions);
    private createContainer;
    private createTabContainer;
    private createContentContainer;
    private restoreSettings;
    private loadSettings;
    private saveSettings;
    private setupPosition;
    private createGlobalToolbar;
    private handleOpacityChange;
    private setupResizable;
    private updateToolbarLayout;
    private setupDraggable;
    private handleSnapWhileDragging;
    private setupKeyboardShortcut;
    private setupEventListeners;
    debugState(id: string, state: any): void;
    private updateDebugState;
    private addDebugState;
    private addTab;
    private clearCurrentTab;
    private clearTab;
    private switchTab;
    addLog(namespace: string, message: Array<any> | object | string): void;
    private createLogElement;
    private removeLogEntry;
    private renderLogEntry;
    show(): void;
    hide(): void;
    toggle(): void;
}
export declare function debugState(id: string, state: any): void;
export {};
//# sourceMappingURL=DebugPanel.d.ts.map