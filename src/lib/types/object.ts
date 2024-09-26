/**
 * Transforms a string path into a nested object (single level).
 * @example
 * ```typescript
 * NestedObject<"TRC20/USDT" | "TRC20/USDC" | "TRC20/DAI/USDT", number>;
 * => { TRC20: { USDT: number, USDC: number, 'DAI/USDT': number } }
 * ```
 */
export type NestedObject<T extends string, V = unknown> = {
	[K in T as K extends `${infer Prefix}/${infer _}`
		? Prefix
		: K]: K extends `${infer _}/${infer Suffix}`
		? {
				[P in Suffix]: V;
			}
		: V;
};
