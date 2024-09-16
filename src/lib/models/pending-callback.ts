import { z } from 'zod';

import { Fiat, Ticker } from '$lib/constants/currency';
import { enumKeys, typedRecord } from '$lib/helpers/zod';

const Fiats = enumKeys(Fiat);
const Tickers = enumKeys(Ticker);

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
