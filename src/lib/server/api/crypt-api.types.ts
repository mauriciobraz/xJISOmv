import type {
	Fiat as FiatEnum,
	Ticker as TickerEnum,
} from '$lib/constants/currency';

import type { LiteralCompletion } from '$lib/types/string';
import type { NestedObject } from '$lib/types/object';

export type Bool = 0 | 1;

export type Fiat = (string & {}) | `${FiatEnum}`;
export type Ticker = (string & {}) | `${TickerEnum}`;

/**
 * Addresses as string values.
 * @example "TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5"
 * @example "0.5@TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5|..."
 */
export type Addresses = string;

/**
 * Callback URLs containing metadata on query parameters.
 * @example "https://example.com/api/callback?user_id=1234"
 */
export type Callback = LiteralCompletion<`${string}://${string}`>;

/**
 * Email address(es).
 * @example "yJ9l8@example.com"
 */
export type Email = LiteralCompletion<`${string}@${string}`>;

/**
 * API errors as an object.
 * @example { error: "Invalid address", status: "error" }
 */
export type Error = Record<'error' | 'status', string>;

export type CoinInformation = {
	/**
	 * Human-readable name of the currency.
	 * @example USDT
	 */
	coin?: string;

	/**
	 * URL to the logo of the currency.
	 * @example https://.../USDT.png
	 */
	logo?: string;

	/**
	 * Ticker of the currency.
	 * @example TRC20/USDT
	 */
	ticker?: Ticker;

	/**
	 * - CryptAPI currently doesn't charge a minimum fee.
	 * - On Bitcoin and Bitcoin Cash there's a minimum transaction fee of
	 *   546 Satoshis due to dust threshold. For Litecoin it's 5460 Litoshis.
	 *
	 * @example 0.00000546
	 */
	minimum_fee?: number;

	/**
	 * - CryptAPI currently doesn't charge a minimum fee.
	 * - On Bitcoin and Bitcoin Cash there's a minimum transaction fee of
	 *   546 Satoshis due to dust threshold. For Litecoin it's 5460 Litoshis.
	 *
	 * @example 0.00000546
	 */
	minimum_fee_coin?: string;

	/**
	 * Minimum transaction value for this currency, values below
	 * this value are disregarded by CryptAPI.
	 * @example 0.00008000
	 */
	minimum_transaction?: number;

	/**
	 * Minimum transaction value for this currency, values below
	 * this value are disregarded by CryptAPI.
	 * @example "8000"
	 */
	minimum_transaction_coin?: string;

	/**
	 * Datetime of the last price update.
	 * @example 2019-10-14T13:00:09.585Z
	 */
	prices_updated?: string;

	/**
	 * - Updated every 5 minutes.
	 * - Keys are the names of the currencies, values are the exchange rates.
	 * - Object with the exchange rate of this currency in various FIAT currencies.
	 * @example {'CAD': '10985.14', 'AED': '30517.01', 'BRL': '34243.36', 'USD': '8308.47', ...}
	 */
	prices?: Record<Fiat, string>;

	/**
	 * Status of the request.
	 * @example "success"
	 */
	status?: string;

	/**
	 * Fee percentage for this currency.
	 * @example 1.00
	 */
	fee_percent?: string;

	/**
	 * Estimation of the blockchain fee for this cryptocurrency/token.
	 * This value is informative. To obtain a blockchain
	 * fee estimation use the estimate endpoint instead.
	 * @example 31.89800000
	 */
	network_fee_estimation?: string;
};

export type CallbackLogItem = {
	/**
	 * Response given by your system.
	 * @example "{ 'status': 'success' }"
	 */
	responeses?: string;

	/**
	 * Http status code given by your system.
	 * @example "200"
	 */
	response_status?: string;

	/**
	 * UTC-00:00 datetime of the next try or "done".
	 * @example "2019-10-14T13:00:09.585Z"
	 */
	next_try?: LiteralCompletion<'done'>;

	/**
	 * URL provided by your system to callback.
	 * @note If was set to POST while creating the address the only GET parameters
	 *       provided in the URL, will be the ones provided by you in the callback
	 *       parameter, while the CryptAPI parameters will be in POST.
	 *
	 * @example "https://example.com/api/callback?user_id=1234"
	 */
	request_url?: string;

	/**  Boolean indicating if the callback type is 'Pending'.  */
	pending?: boolean;

	/**  Boolean indicating if the callback type is 'Confirmed'.  */
	confirmed?: boolean;
};

export type CallbackLogs = {
	/**
	 * Hash of the transaction received from the client.
	 * @example f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16
	 */
	txid_in?: string;

	/**
	 * Hash of the transaction of the payment sent to you.
	 * @example f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16
	 */
	txid_out?: string;

	/**
	 * Value of CryptAPI deducted from {@link value_coin}
	 * @example 0.00000546
	 */
	fee_coin?: number;

	/**
	 * Percentage of the fee charged by CryptAPI.
	 * @example 0.25
	 */
	fee_percent?: number;

	/**
	 * Value sent by your customer to the created address.
	 * @example 0.00008000
	 */
	value_coin?: number;

	/**
	 * Value forwarded to your wallet address, after fees.
	 * @example 0.00000546
	 */
	value_forwarded_coin?: number;

	/**
	 * Coin price in USD at the time of receiving
	 * @example 12.34
	 */
	prices?: number;

	/**
	 * Time and date when this callback was last updated (UTC-0).
	 * @example "2019-10-14T13:00:09.585Z"
	 */
	last_update?: string;

	/**
	 * Number of blockchain confirmations of the current transaction.
	 * @example 4
	 */
	confirmations?: number;

	/**
	 * Result status of this callback.
	 * @example "pending"
	 */
	result?: CallbackResult;

	/**
	 * Last 10 requests to your server, ordered by timestamp descending.
	 * @example [{ ... }, { ... }, { ... }, ...]
	 */
	logs?: CallbackLogItem[];
};

/**
 * Result of the callback.
 * @example "pending"
 */
export type CallbackResult = 'pending' | 'received' | 'sent' | 'done';

export type Error400 = {
	headers?: never;
	content: {
		/**
		 * Error message.
		 * @example "Invalid address"
		 */
		error?: string;

		/**
		 * Error status.
		 * @example "error"
		 */
		status?: string;
	};
};

export interface paths {
	'/{ticker}/create': {
		parameters: {
			cookie?: never;
			header?: never;
			query?: never;
			path?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				path: {
					/**
					 * The cryptocurrency ticker.
					 * @example TRC20/USDT (Tether USDT)
					 */
					ticker: Ticker;
				};
				cookie?: never;
				header?: never;

				query: {
					/**
					 * Addresses where the funds will be sent.
					 *
					 * @note For multiple addresses the minimum value per transaction
					 *       (see cryptocurrencies page) is multiplied by the following
					 *       `1 + (N - 1) / 3`, where N is the number of output addresses.
					 *
					 * @note Addresses must be valid for the ticker you are using. Otherwise,
					 *       the API will reject the payment. For example, if you try to use a Bitcoin
					 *       address while requesting a USDT TRC-20 address, the API will throw an error.
					 *
					 * @note If using multiple addresses (you may use up to 20 addresses), you
					 *       must use the following format `percentage_1@address_1|percentage_2@address_2`.
					 *       Percentages are set from 0.0001 (0.01%) to 1.0 (100%) and must add up to 1.00 (100%).
					 *
					 * @see https://support.cryptapi.io/article/multi-address-minimums
					 */
					address: Addresses;

					/**
					 * Callback URL for CryptAPI.
					 *
					 * @note The callback URL is a unique identifier that is used
					 *       to generate a new address_in. You can make your callback
					 *       URL unique by adding GET parameters, such as `?user_id=1234`.
					 *
					 * @note You can reuse callback URLs if you want to create a
					 *       reusable deposit address_in. However, if you change the
					 *       address, CryptAPI systems will not change the address_out. You
					 *       will need to change your callback URL to generate a new address_in.
					 */
					callback: string;

					/**
					 * Provides you with the ability to specify for forwarding funds to
					 * the designated address. It determines the level of fees paid to the
					 * blockchain network and can impact the speed of the transaction confirm.
					 *
					 * @notes This feature is only supported when using
					 *        `Bitcoin`, `Ethereum/ERC-20`, and `Litecoin`.
					 *         Priorities are different per currency/network.
					 *
					 * @see https://support.cryptapi.io/article/how-the-priority-parameter-works
					 */
					priority?: string;

					/**
					 * Email address to receive payments notifications.
					 * Before you can use CryptAPI, you must confirm your email address.
					 *
					 * @see https://cryptapi.io/confirm_email
					 */
					email?: Email;

					/**
					 * Number of confirmations to wait before sending the
					 * transaction (then firign the confirmation callback).
					 *
					 * @example 3
					 * @minimum 1
					 * @default 1
					 */
					confirmations?: number;

					/**
					 * Whether to post the request as `POST` or `GET`.
					 *
					 * @note Parameters will still be sent as `GET`.
					 * @note Not compatible with `json`.
					 *
					 * @example 1 (POST)
					 * @default 0 (GET)
					 */
					post?: Bool;

					/**
					 * Whether to send the request in JSON format.
					 *
					 * @note Parameters will still be sent as `GET`.
					 * @note Not compatible with `post`.
					 *
					 * @example 1 (Enabled)
					 * @default 0 (Disabled)
					 */
					json?: Bool;

					/**
					 * When enabled you'll receive a `pending` callback when the address is
					 * created (when the transaction is sent by the user but not confirmed yet).
					 *
					 * @note To avoid receiving multiple callback requests, please ensure that the
					 *       response to the callback request is a `plain/text` with the message `ok`.
					 *
					 * @example 1 (Enabled)
					 * @default 0 (Disabled)
					 */
					pending?: Bool;

					/**
					 *  When enabled, returns the value converted to FIAT in the callback,
					 *  with the parameters `value_coin_convert` and `value_forwared_coin_convert`.
					 *
					 * @example 1 (Enabled)
					 * @default 0 (Disabled)
					 */
					convert?: Bool;

					/**
					 * Allows customers to make payments using any token supported by the
					 * CryptAPI, even if the token differs from the one initially specified.
					 *
					 * @note If this is disabled and the customer sends a different token
					 *       than the one initially specified, CryptAPI will ignore those.
					 *
					 * @note On unsupported blockchains, if this parameter is enabled, the
					 *       API will not throw an error. Instead, it will simply ignore it.
					 *
					 * @note This is only available for `TRC-20` and `EVM-based` blockchains.
					 *
					 * @see https://support.cryptapi.io/article/how-the-multi_token-parameter-works
					 *
					 * @example 1 (Enabled)
					 * @default 0 (Disabled)
					 */
					multi_token?: Bool;
				};
			};

			responses: {
				200: {
					headers?: never;
					content: {
						'application/json': {
							/**
							 * Address generated by CryptAPI.
							 * Use this address to send to the customer.
							 * @example "TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5"
							 */
							address_in: Addresses;

							/**
							 * Your addresses where the funds will be sent.
							 * @example "TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5"
							 */
							address_out: Addresses;

							/**
							 * The callback URL you provided in the request.
							 * @example "https://example.com/api/webhook?metadata=..."
							 */
							callback_url: string;

							/**
							 * Confirmation priority of the request.
							 * @example "fast"
							 */
							priority: string;

							/**
							 * Status of the request.
							 * @example "success"
							 */
							status: string;
						};
					};
				};

				400: Error400;
			};

			requestBody?: never;
		};
	};

	'/{ticker}/logs': {
		parameters: {
			path: {
				/**
				 * The cryptocurrency ticker.
				 * @example TRC20/USDT (Tether USDT)
				 */
				ticker: Ticker;
			};
			cookie?: never;
			header?: never;
			query?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				path: {
					/**
					 * The cryptocurrency ticker.
					 * @example TRC20/USDT (Tether USDT)
					 */
					ticker: Ticker;
				};
				cookie?: never;
				header?: never;
				query: {
					/**
					 * Callback URL used on the creation process.
					 *
					 * @note It is recommended to store the callback URL when creating
					 *       a new payment address if you plan to use this endpoint later.
					 *
					 * @note It is advisable to URL encode the callback URL when making the
					 *       request. However, if you are using one of our libraries,
					 *       there is no need for URL encoding.
					 *
					 * @example "https://example.com/api/webhook?user_id=1234"
					 */
					callback: string;
				};
			};

			responses: {
				200: {
					headers?: never;
					content: {
						'application/json': {
							/**
							 * Address generated by CryptAPI.
							 * Use this address to send to the customer.
							 * @example "TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5"
							 */
							address_in?: Addresses;

							/**
							 * Your addresses where the funds will be sent.
							 * @example "TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5"
							 * @example {"1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP": 0.70,
							 *           "1PE5U4temq1rFzseHHGE2L8smwHCyRbkx3": 0.30}
							 */
							address_out?: Addresses;

							/**
							 * Confirmation priority of the request.
							 * @example "fast"
							 */
							priority?: string;

							/**
							 * Status of the request.
							 * @example "success"
							 */
							status?: string;

							/**
							 * The callback URL you provided in the request.
							 * @example "https://example.com/api/webhook?metadata=..."
							 */
							callback_url?: string;

							/**
							 * Amount of confirmations required for the callback to be triggered.
							 * @example 6
							 */
							notify_confirmations?: number;

							/**
							 * Whether you have enabled pending callbacks.
							 * @example true
							 */
							notify_pending?: boolean;

							/**
							 * List of payments made using this address.
							 * @example [{ ... }]
							 */
							callbacks?: CallbackLogs;
						};
					};
				};

				400: Error400;
			};

			requestBody?: never;
		};
	};

	'/info': {
		parameters: {
			cookie?: never;
			header?: never;
			query?: never;
			path?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				path?: never;
				cookie?: never;
				header?: never;
				query: {
					/**
					 * Whether to include prices in the response.
					 * @default 0 (Disabled)
					 */
					prices?: Bool;
				};
			};

			responses: {
				200: {
					headers?: never;
					content: {
						'application/json': NestedObject<Ticker, CoinInformation>;
					};
				};

				400: Error400;
			};

			requestBody?: never;
		};
	};

	'/{ticker}/info': {
		parameters: {
			cookie?: never;
			header?: never;
			query?: never;
			path?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				path: {
					/**
					 * The cryptocurrency ticker.
					 * @example TRC20/USDT (Tether USDT)
					 */
					ticker: Ticker;
				};
				cookie?: never;
				header?: never;
				query?: never;
			};

			responses: {
				200: {
					headers?: never;
					content: { 'application/json': CoinInformation };
				};
				400: Error400;
			};

			requestBody?: never;
		};
	};

	'/{ticker}/qrcode': {
		parameters: {
			cookie?: never;
			header?: never;
			query?: never;
			path?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				path: {
					/**
					 * The cryptocurrency ticker.
					 * @example TRC20/USDT (Tether USDT)
					 */
					ticker: Ticker;
				};
				cookie?: never;
				header?: never;
				query: {
					/**
					 * Addresses created by CryptAPI.
					 * @example "TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5"
					 */
					address: Addresses;

					/**
					 * Amount in the native cryptocurrency of the address.
					 *
					 * @note It's worth noting that the value parameter might not work in
					 *       most exchanges and some wallets (works with Trust and Exodus
					 *       wallets). Some user wallets or exchanges will only read the address
					 *       and will not process the value field (usually they paste the address
					 *       and amount in the address field, causing confusion to the customer and).
					 *       Therefore, it is recommended to use the value field at your own discretion.
					 */
					value?: number;

					/**
					 * Size of the QR code.
					 * @default 512
					 * @max 1024
					 * @min 64
					 */
					size?: number;
				};
			};

			responses: {
				200: {
					headers?: never;
					content: {
						'application/json': {
							/**
							 * Status of the request.
							 * @example "success"
							 */
							status: string;

							/**
							 * Base64-encoded QR code.
							 * @example "data:image/png;base64,{$$qr_code$$}..."
							 */
							qr_code: string;

							/**
							 * Payment URI in BEP-2 format.
							 * @example "bitcoin:TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5?amount=0.0001"
							 */
							payment_uri: string;
						};
					};
				};
				400: Error400;
			};

			requestBody?: never;
		};
	};

	'/{ticker}/estimate': {
		parameters: {
			cookie?: never;
			header?: never;
			query?: never;
			path?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				path: {
					/**
					 * The cryptocurrency ticker.
					 * @example TRC20/USDT (Tether USDT)
					 */
					ticker: Ticker;
				};
				cookie?: never;
				header?: never;
				query: {
					/**
					 * Addresses where the funds will be sent.
					 *
					 * @note For multiple addresses the minimum value per transaction
					 *       (see cryptocurrencies page) is multiplied by the following
					 *       `1 + (N - 1) / 3`, where N is the number of output addresses.
					 *
					 * @note Addresses must be valid for the ticker you are using. Otherwise,
					 *       the API will reject the payment. For example, if you try to use a Bitcoin
					 *       address while requesting a USDT TRC-20 address, the API will throw an error.
					 *
					 * @note If using multiple addresses (you may use up to 20 addresses), you
					 *       must use the following format `percentage_1@address_1|percentage_2@address_2`.
					 *       Percentages are set from 0.0001 (0.01%) to 1.0 (100%) and must add up to 1.00 (100%).
					 *
					 * @see https://support.cryptapi.io/article/multi-address-minimums
					 */
					address?: Addresses;

					/**
					 * Provides you with the ability to specify for forwarding funds to
					 * the designated address. It determines the level of fees paid to the
					 * blockchain network and can impact the speed of the transaction confirm.
					 *
					 * @notes This feature is only supported when using
					 *        `Bitcoin`, `Ethereum/ERC-20`, and `Litecoin`.
					 *         Priorities are different per currency/network.
					 *
					 * @see https://support.cryptapi.io/article/how-the-priority-parameter-works
					 */
					priority?: string;
				};
			};

			responses: {
				200: {
					headers?: never;
					content: {
						'application/json': {
							/**
							 * Status of the request.
							 * @example "success"
							 */
							status: string;

							/**
							 * Estimated transaction cost in the blockchain's native cryptocurrency.
							 *
							 * @note For instance, transactions on the Bitcoin network will have fees
							 *       estimated in BTC, whereas transactions using USDT on the TRC20
							 *       (Tron) network will have fees estimated in TRX.
							 */
							estimated_cost: number;

							/**
							 * Object with estimated costs in different currencies.
							 * @example {"USD": 0.0001, "EUR": 0.0001, "BRL": 0.0001}
							 */
							estimated_cost_currency: Record<Fiat, string>;
						};
					};
				};

				400: Error400;
			};

			requestBody?: never;
		};
	};

	'/{ticker}/convert': {
		parameters: {
			cookie?: never;
			header?: never;
			query?: never;
			path?: never;
		};

		options?: never;
		delete?: never;
		trace?: never;
		patch?: never;
		head?: never;
		post?: never;
		put?: never;

		get: {
			parameters: {
				path: {
					/**
					 * The cryptocurrency ticker.
					 * @example TRC20/USDT (Tether USDT)
					 */
					ticker: Ticker;
				};
				cookie?: never;
				header?: never;
				query: {
					/**
					 * The amount in the native cryptocurrency of the address.
					 * @example 0.0001
					 */
					value: number;

					/**
					 * The cryptocurrency ticker or fiat currency.
					 * @example TRC20/USDT (Tether USDT)
					 * @example BRL (Brazilian Real)
					 */
					from: Ticker | Fiat;
				};
			};

			responses: {
				200: {
					headers?: never;
					content: {
						'application/json': {
							/**
							 * Status of the request.
							 * @example "success"
							 */
							status: string;

							/**
							 * The converted amount based on `from`.
							 * @example 0.0001
							 */
							value_coin: number;

							/**
							 * The exchange rate between the two currencies.
							 * @example 0.0001
							 */
							exchange_rate: number;
						};
					};
				};

				400: Error400;
			};

			requestBody?: never;
		};
	};
}
