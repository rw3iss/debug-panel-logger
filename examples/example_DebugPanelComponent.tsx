'use client';

/* React component that mounts a singleton DebugPanel with options, and starting Data */

import { useEffect, useRef } from 'react';
import { DebugPanel, ScreenPosition } from '../dist/index.js';

// React wrapper for showing a DebugPanel.
// You only need to one instance of this somewhere in your application.
// The core DebugPanel class handles its own state and dom updates.
export const DebugPanelComponent = ({ data = undefined }) => {
	const panelRef = useRef<DebugPanel>(undefined);

	// Instantiate a global DebugPanel on mount:
	useEffect(() => {
		if (!panelRef.current) {
			const dp = new DebugPanel({ position: ScreenPosition.TopRight });
			panelRef.current = dp;
			if (data) dp.debug('data', data);
		}
		return () => { }
	}, []);

	// todo: should return a component for DebugPanel to mount to?
	return undefined;
};
