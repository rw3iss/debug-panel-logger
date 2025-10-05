'use client';

import { useEffect, useRef } from 'react';
import { DebugPanel, ScreenPosition } from 'dev-debug-panel';
import EventBus from 'eventbusjs';

// React wrapper for showing a DebugPanel.
// You only need to one instance of this somewhere in your application.
// The core DebugPanel class handles its own state and dom updates.
export const DebugPanelComponent = ({ data = undefined, startingHeight = 400, startingWidth = 200 }) => {
	const panelRef = useRef<DebugPanel>(undefined);

	// Instantiate a global DebugPanel on mount:
	useEffect(() => {
		if (!panelRef.current) {
			const dp = new DebugPanel({ snap: true, position: ScreenPosition.TopRight });
			panelRef.current = dp;
			if (data) dp.debug('data', data);
		}
		return () => { }
	}, []);

	// todo: should return a component for DebugPanel to mount to?
	return undefined;
};
