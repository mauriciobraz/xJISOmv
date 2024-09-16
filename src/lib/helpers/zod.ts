import { z } from 'zod';

/**
 * Parses a zod type from any.
 * @param type Schema to parse.
 *
 * @example
 * ```typescript
 * export const mode = parseType(
 *   z.number().min(0).max(1),
 * );
 *
 * mode.parse('0.5');
 * => 0.5
 * ```
 */
export function parseType<T extends z.ZodType>(type: T) {
	return z
		.any()
		.transform((value) => {
			try {
				return type.parse(value);
			} catch {
				return value;
			}
		})
		.transform((value) => type.parse(value) as z.infer<T>);
}

/**
 * Get enum keys zod-friendly.
 * @param object Enum to get keys from.
 *
 * @example
 * ```typescript
 * enum Colors {
 *   RED = 'RED',
 *   BLUE = 'BLUE',
 *   GREEN = 'GREEN',
 * }
 *
 * export const ColorsSchema = z.enum(
 *   enumKeys(Colors),
 * );
 * ```
 */
export function enumKeys<
	T extends object = object,
	K extends keyof T = keyof T,
>(object: T) {
	return Object.keys(object) as [K, ...K[]];
}

/**
 * Creates a zod record.
 * @param key Schema for keys.
 * @param type Schema for values.
 *
 * @example
 * ```typescript
 * export const Record = typedRecord(
 *   z.enum(['A', 'B', 'C']),
 *   z.any(),
 * );
 * ```
 */
export function typedRecord<K extends string, T extends z.ZodType>(
	key: z.ZodEnum<[K, ...K[]]>,
	type: T,
) {
	return z
		.any()
		.transform((value) => JSON.parse(value))
		.transform((value) => {
			if (typeof value !== 'object' || value === null) {
				return z.NEVER;
			}

			for (const item of Object.values(value)) {
				const isValid = type.safeParse(item).success;

				if (!isValid) {
					console.error('[Zod] Invalid item:', item);

					process.exit(1);
				}
			}

			return key._def.values.reduce(
				(agg, key) => ({
					/** biome-ignore lint/performance/noAccumulatingSpread: ... */ ...agg,
					[key]: value[key as keyof typeof value],
				}),
				{} as { [P in K]: z.infer<T> },
			);
		});
}

/**
 * Creates a zod form data transformer.
 * @param type Schema to transform with.
 *
 * @example
 * ```typescript
 * export const FormData = typedFormData(
 *   z.object({
 *     age: z.number(),
 *     name: z.string(),
 *   }),
 * );
 * ```
 */
export function typedFormData<T extends z.ZodType>(type: T) {
	return z
		.instanceof(FormData)
		.transform((value) => Object.fromEntries(value.entries()))
		.transform((value) => type.parse(value) as z.infer<T>);
}
