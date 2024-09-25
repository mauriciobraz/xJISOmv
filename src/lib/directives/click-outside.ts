function outside(
	node: Node,
	listener: string,
	callback: (node: Event) => Promise<void> | void,
) {
	function handleClick(event: Event): void {
		if (
			node &&
			!event.defaultPrevented &&
			!node.contains(event.target as Node)
		) {
			callback(event);
		}
	}

	document.addEventListener(listener, handleClick);

	return {
		destroy(): void {
			document.removeEventListener(listener, handleClick);
		},
	};
}

/**
 * Add a click listener to the node that calls a callback when clicked outside the node.
 *
 * @example
 * ```svelte
 * <dialog use:clickOutside={() => console.log('ClickedOutside')}>
 *   <slot />
 * </dialog>
 * ```
 */
export function clickOutside(node: Node, callback: (node: Event) => void) {
	return outside(node, 'click', callback);
}

/**
 * Add a mousedown listener to the node that calls a callback when clicked outside the node.
 *
 * @example
 * ```svelte
 * <dialog use:tapOutside={() => console.log('ClickedOutside')}>
 *   <slot />
 * </dialog>
 */
export function tapOutside(node: Node, callback: (node: Event) => void) {
	return outside(node, 'mousedown', callback);
}
