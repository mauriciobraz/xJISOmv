/**
 * Makes a string literal string type like `string & {}`.
 *
 * @example
 * ```typescript
 * type B = LiteralCompletion<"a" | "b" | "c">;
 *
 * const b1: B = "b"; // Valid
 * const b2: B = "d"; // Valid
 * ```
 */
export type LiteralCompletion<T extends string> = (string & {}) | T;
