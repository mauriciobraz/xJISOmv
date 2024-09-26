import { z } from 'zod';
import * as R from 'remeda';

import { env } from '$env/dynamic/private';
import { dedent } from '$lib/helpers/dedent';
import { parseType, typedRecord } from '$lib/helpers/zod';

import { Address, encodeAddress, TickerKey } from '$lib/models/address';
import { SUPPORTED_TICKERS } from '$lib/constants/ticker';

export const ServerEnvSchema = z
	.object({
		AUTH_SECRET: z.string().min(32),
		AES_192_CBC_PASS: z.string().min(32),
		AES_192_CBC_SALT: z.string().min(32),

		CRYPT_API_ADDRESSES: typedRecord(TickerKey, Address)
			.transform((value) =>
				R.mapValues(value, (address) => encodeAddress(address)),
			)
			.refine((value) =>
				R.keys(value).every((ticker) =>
					Object.keys(SUPPORTED_TICKERS).includes(ticker),
				),
			),

		CRYPT_API_PUBLIC_KEY: z.string().optional().default(dedent`
      -----BEGIN PUBLIC KEY-----
      MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3FT0Ym8b3myVxhQW7ESuuu6lo
      dGAsUJs4fq+Ey//jm27jQ7HHHDmP1YJO7XE7Jf/0DTEJgcw4EZhJFVwsk6d3+4fy
      Bsn0tKeyGMiaE6cVkX0cy6Y85o8zgc/CwZKc0uw6d5siAo++xl2zl+RGMXCELQVE
      ox7pp208zTvown577wIDAQAB
      -----END PUBLIC KEY-----
    `),
	})
	.passthrough();

export const {
	AUTH_SECRET,
	AES_192_CBC_PASS,
	AES_192_CBC_SALT,
	ADDRESSES_TARGET,
	CRYPT_API_PUBLIC_KEY,
} = ServerEnvSchema.parse(env);
