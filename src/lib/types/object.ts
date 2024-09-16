/* eslint-disable @typescript-eslint/no-unused-vars */

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

export namespace OpenApiFetch {
	export type Method =
		| 'options'
		| 'delete'
		| 'trace'
		| 'patch'
		| 'head'
		| 'post'
		| 'put'
		| 'get';

	export type Parameters = {
		path?: Record<string, unknown> | never;
		query?: Record<string, unknown> | never;
		header?: Record<string, unknown> | never;
		cookie?: Record<string, unknown> | never;
	};

	export type Response = {
		content?: Record<string, unknown> | never;
		headers?: Record<string, unknown> | never;
	};

	export type Responses = Record<string, Response>;
	export type RequestBody = Record<string, unknown>;

	export type Path = {
		[K in Method]?:
			| {
					responses?: Responses | never;
					parameters?: Parameters | never;
					requestBody?: RequestBody | never;
			  }
			| never;
	} & { parameters?: Parameters };

	export type Paths<T extends Record<string, Path>> = T;
}
