/*
Register a custom LogModule with dev-loggers, and have it draw logs to a DebugPanel.

(Note: Do not need to do this unless needing to customize. DebugPanel automatically listens for 'log' and 'debug' events dispatched from eventbusjs)
*/

import { LogModule, LogEvent } from 'dev-loggers';
import { DebugPanel, DebugPanelOptions } from 'dev-debug-panel';

class DebugPanelLogModule implements LogModule {
	public name = 'DebugPanel';
	public panel: DebugPanel;

	constructor(opts: DebugPanelOptions = {}) {
		this.panel = new DebugPanel(opts);
	}

	public onLog(log: LogEvent) {
		this.panel.log(log.namespace, log.args);
	}

	// prints any
	public print(...args: any[]) {
		if (args.length) {
			const printArgs: any[] = [];
			args.forEach((a) => {
				if (typeof a === 'object') {
					this.panel.debug('', a);
				} else {
					this.panel.log(a
					printArgs.push(a);
				}
			});
		}
	}
}