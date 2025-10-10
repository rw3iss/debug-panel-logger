export type ResizeOptions = {
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

export function makeResizable(container: HTMLElement, options: ResizeOptions = {}) {
	// Remove existing handles
	container.querySelectorAll('.resize-handle').forEach((handle) => handle.remove());

	// Default options - now includes all sides and corners
	const {
		handles = ['top', 'left', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
		maxWidth = Infinity,
		maxHeight = Infinity,
		minWidth = 100,
		minHeight = 100,
		snapPadding = 20,
		onResizeStart = () => { },
		onResize = () => { },
		onResizeEnd = () => { }
	} = options;

	let resizing = false;
	let resizeDirection: string | null = null;
	let startX = 0,
		startY = 0;
	let startWidth = 0,
		startHeight = 0;
	let startLeft = 0,
		startTop = 0;

	function createHandle(position: string) {
		const handle = document.createElement('div');
		handle.classList.add('resize-handle', `resize-${position}`);
		handle.addEventListener('mousedown', (e) => startResizing(e, position));
		container.appendChild(handle);
	}

	function startResizing(event: MouseEvent, direction: string) {
		resizing = true;
		resizeDirection = direction;
		startX = event.clientX;
		startY = event.clientY;

		// Capture initial dimensions and position
		startWidth = container.offsetWidth;
		startHeight = container.offsetHeight;
		startLeft = container.offsetLeft;
		startTop = container.offsetTop;

		event.preventDefault();
		event.stopPropagation();

		onResizeStart();

		document.addEventListener('mousemove', resize);
		document.addEventListener('mouseup', stopResizing);
	}

	function resize(event: MouseEvent) {
		if (!resizing || !resizeDirection) return;

		let newWidth = startWidth;
		let newHeight = startHeight;
		let newLeft = startLeft;
		let newTop = startTop;

		const deltaX = event.clientX - startX;
		const deltaY = event.clientY - startY;

		const windowWidth = window.innerWidth || document.documentElement.clientWidth;
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;

		// Handle horizontal resizing
		if (resizeDirection.includes('right')) {
			newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
			const rightEdge = newLeft + newWidth;

			// Snap right edge to right side of window
			if (Math.abs(rightEdge - windowWidth) <= snapPadding) {
				newWidth = windowWidth - newLeft;
			}
		}
		if (resizeDirection.includes('left')) {
			const potentialWidth = startWidth - deltaX;
			const potentialLeft = startLeft + deltaX;

			if (potentialWidth >= minWidth && potentialWidth <= maxWidth) {
				newWidth = potentialWidth;
				newLeft = potentialLeft;

				// Snap left edge to left side of window
				if (Math.abs(newLeft) <= snapPadding) {
					const diff = newLeft;
					newLeft = 0;
					newWidth += diff;
				}
			}
		}

		// Handle vertical resizing
		if (resizeDirection.includes('bottom')) {
			newHeight = Math.min(Math.max(startHeight + deltaY, minHeight), maxHeight);
			const bottomEdge = newTop + newHeight;

			// Snap bottom edge to bottom of window
			if (Math.abs(bottomEdge - windowHeight) <= snapPadding) {
				newHeight = windowHeight - newTop;
			}
		}
		if (resizeDirection.includes('top')) {
			const potentialHeight = startHeight - deltaY;
			const potentialTop = startTop + deltaY;

			if (potentialHeight >= minHeight && potentialHeight <= maxHeight) {
				newHeight = potentialHeight;
				newTop = potentialTop;

				// Snap top edge to top of window
				if (Math.abs(newTop) <= snapPadding) {
					const diff = newTop;
					newTop = 0;
					newHeight += diff;
				}
			}
		}

		container.style.width = `${newWidth}px`;
		container.style.height = `${newHeight}px`;
		container.style.left = `${newLeft}px`;
		container.style.top = `${newTop}px`;

		onResize(newWidth, newHeight);
	}

	function stopResizing() {
		if (!resizing) return;

		resizing = false;
		resizeDirection = null;
		document.removeEventListener('mousemove', resize);
		document.removeEventListener('mouseup', stopResizing);

		onResizeEnd();
	}

	// Add handles based on config
	handles.forEach((handle) => createHandle(handle));
}

export type DragOptions = {
	onDragStart?: (e: MouseEvent) => void;
	onDrag?: (x: number, y: number) => void | { x?: number; y?: number };
	onDragEnd?: () => void;
	allowResize?: boolean; // Allow resizing when dragging away from snapped edges
};

export function makeDraggable(
	element: HTMLElement,
	handleElement?: HTMLElement,
	options: DragOptions = {}
) {
	const dragHandle = handleElement || element;
	let isDragging = false;
	let startX = 0;
	let startY = 0;
	let initialLeft = 0;
	let initialTop = 0;
	let initialWidth = 0;
	let initialHeight = 0;

	const { onDragStart, onDrag, onDragEnd, allowResize = false } = options;

	function startDragging(event: MouseEvent) {
		// Don't start dragging if clicking on buttons or interactive elements
		const target = event.target as HTMLElement;
		if (target.tagName === 'BUTTON' || target.closest('button')) {
			return;
		}

		isDragging = true;
		startX = event.clientX;
		startY = event.clientY;

		// Get current computed position (handles both absolute and other positioning)
		const computedStyle = getComputedStyle(element);
		initialLeft = parseInt(computedStyle.left) || element.offsetLeft;
		initialTop = parseInt(computedStyle.top) || element.offsetTop;
		initialWidth = element.offsetWidth;
		initialHeight = element.offsetHeight;

		// Ensure element has position fixed or absolute for dragging
		if (computedStyle.position !== 'absolute' && computedStyle.position !== 'fixed') {
			element.style.position = 'absolute';
			element.style.left = `${initialLeft}px`;
			element.style.top = `${initialTop}px`;
		}

		event.preventDefault();
		dragHandle.style.cursor = 'grabbing';

		if (onDragStart) onDragStart(event);

		document.addEventListener('mousemove', drag);
		document.addEventListener('mouseup', stopDragging);
	}

	function drag(event: MouseEvent) {
		if (!isDragging) return;

		const deltaX = event.clientX - startX;
		const deltaY = event.clientY - startY;

		let newLeft = initialLeft + deltaX;
		let newTop = initialTop + deltaY;
		let newWidth = initialWidth;
		let newHeight = initialHeight;

		// If allowResize, check if panel is against window edges and resize instead of move
		if (allowResize) {
			const windowWidth = window.innerWidth || document.documentElement.clientWidth;
			const windowHeight = window.innerHeight || document.documentElement.clientHeight;

			// Check if right edge is snapped to window right edge
			const rightEdge = initialLeft + initialWidth;
			const isRightSnapped = Math.abs(rightEdge - windowWidth) < 10;

			// Check if bottom edge is snapped to window bottom edge
			const bottomEdge = initialTop + initialHeight;
			const isBottomSnapped = Math.abs(bottomEdge - windowHeight) < 10;

			// Check if left edge is snapped to window left edge
			const isLeftSnapped = Math.abs(initialLeft) < 10;

			// Check if top edge is snapped to window top edge
			const isTopSnapped = Math.abs(initialTop) < 10;

			// If trying to drag right while right edge is snapped, shrink width from left
			if (isRightSnapped && deltaX > 0) {
				newLeft = initialLeft + deltaX;
				newWidth = initialWidth - deltaX;
				// Don't allow width to go below minimum
				if (newWidth < 200) {
					newWidth = 200;
					newLeft = initialLeft + initialWidth - 200;
				}
			}

			// If trying to drag down while bottom edge is snapped, shrink height from top
			if (isBottomSnapped && deltaY > 0) {
				newTop = initialTop + deltaY;
				newHeight = initialHeight - deltaY;
				// Don't allow height to go below minimum
				if (newHeight < 150) {
					newHeight = 150;
					newTop = initialTop + initialHeight - 150;
				}
			}

			// If trying to drag left while left edge is snapped, shrink width from right
			if (isLeftSnapped && deltaX < 0) {
				newLeft = 0;
				newWidth = initialWidth + deltaX;
				// Don't allow width to go below minimum
				if (newWidth < 200) {
					newWidth = 200;
				}
			}

			// If trying to drag up while top edge is snapped, shrink height from bottom
			if (isTopSnapped && deltaY < 0) {
				newTop = 0;
				newHeight = initialHeight + deltaY;
				// Don't allow height to go below minimum
				if (newHeight < 150) {
					newHeight = 150;
				}
			}

			// Apply new dimensions if they changed
			if (newWidth !== initialWidth) {
				element.style.width = `${newWidth}px`;
			}
			if (newHeight !== initialHeight) {
				element.style.height = `${newHeight}px`;
			}
		}

		// Call onDrag callback which may modify the position (e.g., for snapping)
		if (onDrag) {
			const result = onDrag(newLeft, newTop);
			// If onDrag returns adjusted coordinates, use them
			if (result && typeof result === 'object') {
				if (typeof result.x === 'number') newLeft = result.x;
				if (typeof result.y === 'number') newTop = result.y;
			}
		}

		element.style.left = `${newLeft}px`;
		element.style.top = `${newTop}px`;
	}

	function stopDragging() {
		if (!isDragging) return;

		isDragging = false;
		dragHandle.style.cursor = 'grab';

		if (onDragEnd) onDragEnd();

		document.removeEventListener('mousemove', drag);
		document.removeEventListener('mouseup', stopDragging);
	}

	// Set up drag handle cursor
	dragHandle.style.cursor = 'grab';
	dragHandle.addEventListener('mousedown', startDragging);

	// Return cleanup function
	return () => {
		dragHandle.removeEventListener('mousedown', startDragging);
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('mouseup', stopDragging);
	};
}

export function getScrollbarWidth(): number {
	// Create temporary element to measure scrollbar
	const outer = document.createElement('div');
	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll';
	document.body.appendChild(outer);

	const inner = document.createElement('div');
	outer.appendChild(inner);

	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
	document.body.removeChild(outer);

	return scrollbarWidth;
}

export function getWindowSize(): { width: number; height: number } {
	const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return { width, height };
}
