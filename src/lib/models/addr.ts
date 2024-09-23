import { z } from 'zod';

import { Fiat, Ticker } from '$lib/constants/currency';
import { enumKeys, parseType } from '$lib/helpers/zod';

export type Address = z.infer<typeof Address>;

export type FiatKey = z.infer<typeof FiatKey>;
export type TickerKey = z.infer<typeof TickerKey>;

export const TickerKey = z.enum(enumKeys(Ticker));
export const FiatKey = z.enum(enumKeys(Fiat));

export const Address = parseType(
	z.union([
		z.string(),
		z.record(z.string(), z.number()).superRefine((value, context) => {
			if (Object.values(value).reduce((a, b) => a + b, 0) !== 1) {
				context.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'The sum of all values must be 1',
				});
			}
		}),
	]),
);

/**
 * Encodes an address object to a string
 *
 * @example
 * ```ts
 * encodeAddress({ "1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP": 0.70, "1PE5U4temq1rFzseHHGE2L8smwHCyRbkx3": 0.30 })
 * => "0.70@1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP|0.30@1PE5U4temq1rFzseHHGE2L8smwHCyRbkx3"
 *
 * encodeAddress("1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP")
 * => "1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP"
 * ```
 */
export function encodeAddress(addresses: Address) {
	if (typeof addresses === 'object') {
		return Object.entries(addresses)
			.map(([address, percentage]) => `${percentage}@${address}`)
			.join('|');
	}

	return addresses;
}
