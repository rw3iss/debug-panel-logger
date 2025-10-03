'use client';

import { addLogModule } from 'get-loggers';
import { useEffect, useState } from 'react';
import { DEBUG_ENABLED } from '../../../../config';
import { DebugPanelLogModule } from './DebugPanel';
import './DebugPanel.scss';
import { debugState } from './DebugPanel';

// Client-only React wrapper for DebugPanel. This is essentially a virtual wrapped. The core DebugPanel handles its own state and rendering (it's vanilla).
export const DebugPanelComponent = ({ data = undefined, startingHeight = 400, startingWidth = 200 }) => {
	const [logModule, setLogModule] = useState(undefined);

	useEffect(() => {
		// register global debug panel
		if (DEBUG_ENABLED && !logModule) {
			const lm = new DebugPanelLogModule({ show: true });
			setLogModule(lm);
			addLogModule(lm);
			if (data) debugState('data', data); // todo: clean api
		}
	}, []);

	// todo: should return a component for DebugPanel to mount to?
	return undefined;
};
