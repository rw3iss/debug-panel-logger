'use client';

// TODO: remove this, add react example...
import { addLogModule } from 'get-loggers';
import { useEffect, useRef } from 'react';
import { DebugPanelLogModule } from 'debug-panel-logger';
import './DebugPanel.scss';
import { debugState, ScreenPosition } from 'debug-panel-logger';

// Client-only React wrapper for DebugPanel. This is essentially a virtual wrapped. The core DebugPanel handles its own state and rendering (it's vanilla).
export const DebugPanelComponent = ({ data = undefined, startingHeight = 400, startingWidth = 200 }) => {
	const panelRef = useRef<DebugPanelLogModule>(undefined);

	useEffect(() => {
		// register global debug panel
		if (!panelRef.current) {
			const lm = new DebugPanelLogModule({ snap: true, position: ScreenPosition.TopRight });
			panelRef.current = lm;
			addLogModule(lm);
			if (data) debugState('data', data); // todo: clean api
		}
	}, []);

	// todo: should return a component for DebugPanel to mount to?
	return undefined;
};
