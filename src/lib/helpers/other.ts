import { performance } from 'node:perf_hooks';

/**
 * Check if a function throws an error
 * @param callback Callback function to check
 * @returns Boolean indicating if an error was thrown
 *
 * @example
 * ```typescript
 * throws(() => { throw new Error("Method not implemented"); });
 * // true
 * ```
 */
export function throws(callback: () => unknown) {
	try {
		callback();
		return false;
	} catch {
		return true;
	}
}

/**
 * Measure the time it takes to execute a function
 * @param callback Callback function to measure
 * @returns Time in milliseconds
 *
 * @example
 * ```typescript
 * const time = await measure(async () => {
 *   await new Promise((resolve) => setTimeout(resolve, 1000));
 * });
 *
 * console.log(time); // 1000
 * ```
 */
export async function measure(callback: () => Promise<unknown>) {
	const start = performance.now();
	await callback();
	return performance.now() - start;
}

export function raise(...args: string[]): never {
	throw new Error(...args);
}
