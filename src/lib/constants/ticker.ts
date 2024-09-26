export enum Fiat {
	AED = 'AED',
	AUD = 'AUD',
	BGN = 'BGN',
	BRL = 'BRL',
	CAD = 'CAD',
	CHF = 'CHF',
	CNY = 'CNY',
	CZK = 'CZK',
	DKK = 'DKK',
	EUR = 'EUR',
	GBP = 'GBP',
	HKD = 'HKD',
	HUF = 'HUF',
	IDR = 'IDR',
	INR = 'INR',
	JPY = 'JPY',
	LKR = 'LKR',
	MXN = 'MXN',
	MYR = 'MYR',
	NGN = 'NGN',
	NOK = 'NOK',
	PHP = 'PHP',
	PLN = 'PLN',
	RON = 'RON',
	RUB = 'RUB',
	SEK = 'SEK',
	SGD = 'SGD',
	THB = 'THB',
	TRY = 'TRY',
	TWD = 'TWD',
	UAH = 'UAH',
	UGX = 'UGX',
	USD = 'USD',
	ZAR = 'ZAR',
}

export enum Ticker {
	ARBITRUM_ARB = 'arbitrum/arb',
	ARBITRUM_DAI = 'arbitrum/dai',
	ARBITRUM_ETH = 'arbitrum/eth',

	ARBITRUM_LINK = 'arbitrum/link',
	ARBITRUM_PEPE = 'arbitrum/pepe',
	ARBITRUM_USDC = 'arbitrum/usdc',
	ARBITRUM_USDT = 'arbitrum/usdt',
	ARBITRUM_WBTC = 'arbitrum/wbtc',

	ARBITRUM_USDC_E = 'arbitrum/usdc.e',

	AVAX_C_AVAX = 'avax-c/avax',
	AVAX_C_EURC = 'avax-c/eurc',
	AVAX_C_USDC = 'avax-c/usdc',
	AVAX_C_USDT = 'avax-c/usdt',

	AVAX_C_WAVAX = 'avax-c/wavax',
	AVAX_C_BTC_E = 'avax-c/btc.e',

	AVAX_C_WBTC_E = 'avax-c/wbtc.e',
	AVAX_C_WETH_E = 'avax-c/weth.e',
	AVAX_C_USDC_E = 'avax-c/usdc.e',

	BASE_DAI = 'base/dai',
	BASE_ETH = 'base/eth',

	BASE_EURC = 'base/eurc',
	BASE_USDC = 'base/usdc',

	BEP20_ADA = 'bep20/ada',
	BEP20_BNB = 'bep20/bnb',
	BEP20_DAI = 'bep20/dai',
	BEP20_ETH = 'bep20/eth',
	BEP20_INJ = 'bep20/inj',
	BEP20_LTC = 'bep20/ltc',
	BEP20_THC = 'bep20/thc',
	BEP20_XRP = 'bep20/xrp',

	BEP20_DOGE = 'bep20/doge',
	BEP20_BTCB = 'bep20/btcb',
	BEP20_CAKE = 'bep20/cake',
	BEP20_USDC = 'bep20/usdc',
	BEP20_PHPT = 'bep20/phpt',
	BEP20_SHIB = 'bep20/shib',
	BEP20_USDT = 'bep20/usdt',

	BEP20_MATIC = 'bep20/matic',
	BEP20_VIRTU = 'bep20/virtu',
	BEP20_1INCH = 'bep20/1inch',

	ERC20_ARB = 'erc20/arb',
	ERC20_BNB = 'erc20/bnb',
	ERC20_DAI = 'erc20/dai',
	ERC20_MKR = 'erc20/mkr',

	ERC20_EURC = 'erc20/eurc',
	ERC20_EURT = 'erc20/eurt',
	ERC20_LINK = 'erc20/link',
	ERC20_NEXO = 'erc20/nexo',
	ERC20_PEPE = 'erc20/pepe',
	ERC20_SHIB = 'erc20/shib',
	ERC20_TUSD = 'erc20/tusd',
	ERC20_USDC = 'erc20/usdc',
	ERC20_USDP = 'erc20/usdp',
	ERC20_USDT = 'erc20/usdt',

	ERC20_VERSE = 'erc20/verse',
	ERC20_1INCH = 'erc20/1inch',

	OPTIMISM_OP = 'optimism/op',

	OPTIMISM_DAI = 'optimism/dai',
	OPTIMISM_ETH = 'optimism/eth',

	OPTIMISM_LINK = 'optimism/link',
	OPTIMISM_USDC = 'optimism/usdc',
	OPTIMISM_USDT = 'optimism/usdt',
	OPTIMISM_WBTC = 'optimism/wbtc',
	OPTIMISM_USDC_E = 'optimism/usdc.e',

	POLYGON_SMT = 'polygon/smt',
	POLYGON_AVAX = 'polygon/avax',
	POLYGON_USDC = 'polygon/usdc',
	POLYGON_WBTC = 'polygon/wbtc',
	POLYGON_WETH = 'polygon/weth',
	POLYGON_MANA = 'polygon/mana',
	POLYGON_USDT = 'polygon/usdt',

	POLYGON_MATIC = 'polygon/matic',
	POLYGON_VIRTU = 'polygon/virtu',
	POLYGON_USDC_E = 'polygon/usdc.e',

	TRC20_AEDT = 'trc20/aedt',
	TRC20_INRT = 'trc20/inrt',
	TRC20_TUSD = 'trc20/tusd',
	TRC20_USDC = 'trc20/usdc',
	TRC20_USDT = 'trc20/usdt',
	TRC20_BTC = 'trc20/btc',

	DOGE = 'doge',
	BCH = 'bch',
	BTC = 'btc',
	ETH = 'eth',
	LTC = 'ltc',
	TRX = 'trx',
}

export type SupportedTicker = Partial<
	Record<
		Ticker,
		{
			logo: string;
			name: string;
			network: string;
		}
	>
>;

export const SUPPORTED_TICKERS = {
	// [Ticker.ERC20_ARB]: {
	// 	logo: '/assets/tickers/ERC20_ARB.png',
	// 	network: 'Ethereum',
	// 	name: 'Arbitrum',
	// },
	// [Ticker.ERC20_BNB]: {
	// 	logo: '/assets/tickers/ERC20_BNB.png',
	// 	network: 'Binance Smart Chain',
	// 	name: 'Binance Coin',
	// },
	// [Ticker.ERC20_DAI]: {
	// 	logo: '/assets/tickers/ERC20_DAI.png',
	// 	network: 'Ethereum',
	// 	name: 'Dai',
	// },
	// [Ticker.ERC20_MKR]: {
	// 	logo: '/assets/tickers/ERC20_MKR.png',
	// 	network: 'Ethereum',
	// 	name: 'Maker',
	// },
	// [Ticker.ERC20_EURC]: {
	// 	logo: '/assets/tickers/ERC20_EURC.png',
	// 	network: 'Ethereum',
	// 	name: 'Euro Coin',
	// },
	// [Ticker.ERC20_EURT]: {
	// 	logo: '/assets/tickers/ERC20_EURT.png',
	// 	network: 'Ethereum',
	// 	name: 'Tether EURT',
	// },
	// [Ticker.ERC20_LINK]: {
	// 	logo: '/assets/tickers/ERC20_LINK.png',
	// 	network: 'Ethereum',
	// 	name: 'Chainlink',
	// },
	// [Ticker.ERC20_NEXO]: {
	// 	logo: '/assets/tickers/ERC20_NEXO.png',
	// 	network: 'Ethereum',
	// 	name: 'Nexo',
	// },
	// [Ticker.ERC20_PEPE]: {
	// 	logo: '/assets/tickers/ERC20_PEPE.png',
	// 	network: 'Ethereum',
	// 	name: 'Pepe',
	// },
	// [Ticker.ERC20_SHIB]: {
	// 	logo: '/assets/tickers/ERC20_SHIB.png',
	// 	network: 'Ethereum',
	// 	name: 'Shiba Inu',
	// },
	// [Ticker.ERC20_TUSD]: {
	// 	logo: '/assets/tickers/ERC20_TUSD.png',
	// 	network: 'Ethereum',
	// 	name: 'TrueUSD',
	// },
	[Ticker.ERC20_USDC]: {
		logo: '/assets/tickers/ERC20_USDC.png',
		network: 'Ethereum',
		name: 'USD Coin',
	},
	// [Ticker.ERC20_USDP]: {
	// 	logo: '/assets/tickers/ERC20_USDP.png',
	// 	network: 'Ethereum',
	// 	name: 'Pax Dollar',
	// },
	[Ticker.ERC20_USDT]: {
		logo: '/assets/tickers/ERC20_USDT.png',
		network: 'Ethereum',
		name: 'Tether',
	},
	// [Ticker.ERC20_VERSE]: {
	// 	logo: '/assets/tickers/ERC20_VERSE.png',
	// 	network: 'Ethereum',
	// 	name: 'Verse',
	// },
	// [Ticker.ERC20_1INCH]: {
	// 	logo: '/assets/tickers/ERC20_1INCH.png',
	// 	network: 'Ethereum',
	// 	name: '1inch',
	// },
	[Ticker.TRC20_USDT]: {
		logo: '/assets/tickers/TRC20_USDT.png',
		network: 'Tron',
		name: 'Tether TRC20',
	},
	[Ticker.TRC20_USDC]: {
		logo: '/assets/tickers/TRC20_USDC.png',
		network: 'Tron',
		name: 'USD Coin TRC20',
	},
	[Ticker.BEP20_XRP]: {
		logo: '/assets/tickers/BEP20_XRP.png',
		network: 'Binance Smart Chain',
		name: 'XRP',
	},
	[Ticker.DOGE]: {
		logo: '/assets/tickers/DOGE.png',
		network: 'Dogecoin',
		name: 'Dogecoin',
	},
	[Ticker.TRX]: {
		logo: '/assets/tickers/TRX.png',
		network: 'Tron',
		name: 'Tron',
	},
	[Ticker.BTC]: {
		logo: '/assets/tickers/BTC.png',
		network: 'Bitcoin',
		name: 'Bitcoin',
	},
} as const satisfies SupportedTicker;
