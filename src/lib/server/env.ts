import * as R from 'remeda';
import { parseEnv, z } from 'znv';

import { env } from '$env/dynamic/private';
import { dedent } from '$lib/helpers/dedent';
import { Address, encodeAddress, TickerKey } from '$lib/models/addr';

export const {
	ADDRESSES_TARGET,
	AES_192_CBC_PASS,
	AES_192_CBC_SALT,
	AUTH_SECRET,
} = parseEnv(env, {
	AUTH_SECRET: {
		schema: z.string(),
		defaults: { development: '1bc19ec27dbce934' },
	},

	AES_192_CBC_PASS: {
		schema: z.string(),
		defaults: { development: '837d3a70b26267d4' },
	},

	AES_192_CBC_SALT: {
		schema: z.string(),
		defaults: { development: 'dfc317362e86298f' },
	},

	ADDRESSES_TARGET: {
		schema: z
			.record(TickerKey, Address)
			.transform((x) => R.mapValues(x, (address) => encodeAddress(address))),

		description: dedent`
      Addresses that can receive payments. The key is the address, the value is
      the percentage of the total amount to send to that address. The sum
      of all values must be 1.

      Example: { "BTC": "1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP",
                 "ETH": { "0x6B175474E89094C44Da98b954EedeAC495271d0F": 0.5,
                          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": 0.5 }, ... }
    `,
	},
});
