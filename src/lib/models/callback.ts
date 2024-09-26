import { z } from 'zod';

import { Fiat, Ticker } from '$lib/constants/ticker';
import { enumKeys, parseType, typedRecord } from '$lib/helpers/zod';

const Fiats = enumKeys(Fiat);
const Tickers = enumKeys(Ticker);

export const ConfirmedParams = z.object({
	/**
	 * Transaction ID created on the deposit request,
	 * used to identify the transaction on the server side.
	 */
	transactionId: z.string(),
});

export const ConfirmedRequest = z.object({
	/**
	 * Converted value to various FIAT currencies of the `value_coin`.
	 * @example {"USD": 3.20, "EUR": 3.05, "GBP": 2.62, "CAD": 4.16, ...}
	 * @note Available only if added the `convert=1` parameter in the `/create` endpoint.
	 */
	value_coin_convert: typedRecord(
		z.enum(Fiats),
		z.string().transform((value) => Number.parseFloat(value)),
	).optional(),

	/**
	 * Converted value to various FIAT currencies of the `value_forwarded_coin`.
	 * @example {"USD": 3.17, "EUR": 3.01, "GBP": 2.59, "CAD": 4.12, "JPY": 0.05, ...}
	 * @note Available only if added the `convert=1` parameter in the `/create` endpoint.
	 */
	value_forwarded_coin_convert: typedRecord(
		z.enum(Fiats),
		z.string().transform((value) => Number.parseFloat(value)),
	).optional(),

	/**
	 * Transaction ID created when CryptAPI sends the funds to you.
	 *
	 * @example "1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP"
	 *
	 * @example {1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP: 0.70,
	 *            1PE5U4temq1rFzseHHGE2L8smwHCyRbkx3: 0.30}
	 */
	txid_out: parseType(
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
	),

	/**
	 * Transaction ID created when the customer deposits.
	 * @example "14PqCsA7KMgseZMPwg6mJy754MtQkrgszu"
	 */
	txid_in: z.string().optional(),

	/**
	 * Fee paid to CryptAPI, deducted from `value_coin` amount.
	 * @note To get the original value you should use `value_coin`.
	 * @example 0.1
	 */
	fee_coin: z.number().nonnegative().optional(),

	/**
	 * Value forwarded to your address(es), after fees deducted.
	 * @note To get the original value you should use `value_coin`.
	 * @example 0.9
	 */
	value_forwarded_coin: z.number().nonnegative().optional(),

	/**
	 * Payment amount sent by your customer prior to deducting any fees.
	 * @note To get the amount after fees you should use `value_forwarded_coin`.
	 * @example 1.0
	 */
	value_coin: z.number().nonnegative().optional(),

	/**
	 * Payment currency used by your customer.
	 * @example "TRC20/USDT"
	 */
	coin: z.enum(Tickers).optional(),

	/**
	 * This is an unique identifier to each payment your clients have made, so you
	 * can easily track any duplicate callbacks sent, in the case our system
	 * doesn't mark the callback as successful.
	 */
	uuid: z.string().optional(),

	/**
	 * Price of the payment in fiat USD at the time of the transaction.
	 * @example 12.50
	 */
	price: z.number().optional(),

	/**
	 * Address where the payment was sent.
	 * @example "3FZbgi29cpjq2GjdwV***HuJJnkLtktZc5"
	 */
	address_in: z.string().optional(),

	/**
	 * Address where the payment was forwarded.
	 * @example "3FZbgi29cpjq2GjdwV***HuJJnkLtktZc5"
	 */
	address_out: z.string().optional(),

	/** Payment was confirmed by the blockchain. */
	pending: z
		.number()
		.min(0)
		.max(1)
		.optional()
		.transform((value) => !!value),

	/** Number of confirmations required by the blockchain. */
	confirmations: z.number().nonnegative().optional(),
});

export type ConfirmedRequestParams = z.infer<typeof ConfirmedParams>;
export type ConfirmedResponseSchema = z.infer<typeof ConfirmedRequest>;

export const PendingParams = z.object({
	/**
	 * Transaction ID created on the deposit request,
	 * used to identify the transaction on the server side.
	 */
	transactionId: z.number(),
});

export const PendingRequest = z.object({
	/**
	 * Converted value to various FIAT currencies of the `value_forwarded_coin`.
	 * @example {"USD": 3.17, "EUR": 3.01, "GBP": 2.59, "CAD": 4.12, "JPY": 0.05, ...}
	 * @note Available only if added the `convert=1` parameter in the `/create` endpoint.
	 */
	valuecoin_convert: typedRecord(
		z.enum(Fiats),
		z.string().transform((value) => Number.parseFloat(value)),
	).optional(),

	/**
	 * Transaction ID created when the customer deposits.
	 * @example "14PqCsA7KMgseZMPwg6mJy754MtQkrgszu"
	 */
	txid_in: z.string().optional(),

	/**
	 * Fee paid to CryptAPI, deducted from `value_coin` amount.
	 * @note To get the original value you should use `value_coin`.
	 * @example 0.1
	 */
	fee_coin: z.number().nonnegative().optional(),

	/**
	 * Payment amount sent by your customer prior to deducting any fees.
	 * @note To get the amount after fees you should use `value_forwarded_coin`.
	 * @example 1.0
	 */
	value_coin: z.number().nonnegative().optional(),

	/**
	 * Payment currency used by your customer.
	 * @example "TRC20/USDT"
	 */
	coin: z.enum(Tickers).optional(),

	/**
	 * This is an unique identifier to each payment your clients have made, so you
	 * can easily track any duplicate callbacks sent, in the case our system
	 * doesn't mark the callback as successful.
	 */
	uuid: z.string().optional(),

	/**
	 * Price of the payment in fiat USD at the time of the transaction.
	 * @example 12.50
	 */
	price: z.number().optional(),

	/**
	 * Address where the payment was sent.
	 * @example "3FZbgi29cpjq2GjdwV***HuJJnkLtktZc5"
	 */
	address_in: z.string().optional(),

	/**
	 * Address where the payment was forwarded.
	 * @example "3FZbgi29cpjq2GjdwV***HuJJnkLtktZc5"
	 */
	address_out: z.string().optional(),

	/** Payment was confirmed by the blockchain. */
	pending: z
		.number()
		.min(0)
		.max(1)
		.optional()
		.transform((value) => !!value),

	/** Number of confirmations required by the blockchain. */
	confirmations: z.number().nonnegative().optional(),
});

export type PendingRequestParams = z.infer<typeof PendingParams>;
export type PendingResponseSchema = z.infer<typeof PendingRequest>;

export const CallbackParams = z.union([ConfirmedParams, PendingParams]);
export type CallbackRequestParams = z.infer<typeof CallbackParams>;

export const CallbackRequest = z.union([ConfirmedRequest, PendingRequest]);
export type CallbackRequestSchema = z.infer<typeof CallbackRequest>;
