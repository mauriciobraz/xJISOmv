import type { Fetcher } from '@cloudflare/workers-types';

export type CloudflareArgon2Options = {
	tagLength?: number;
	iterations?: number;
	memorySize?: number;
	parallelism?: number;
};

export const DEFAULT_OPTIONS: CloudflareArgon2Options = {
	iterations: 2,
	parallelism: 1,
	memorySize: 19456,
};

export class CloudflareArgon2 {
	constructor(
		private binding: Fetcher,
		private options: CloudflareArgon2Options = DEFAULT_OPTIONS,
	) {}

	public async hash(password: string) {
		const resp = await this.binding.fetch('http://internal/hash', {
			body: JSON.stringify({ password: password, options: this.options }),
			method: 'POST',
		});

		return ((await resp.json()) as { hash: string }).hash;
	}

	public async verify(hash: string, password: string) {
		const resp = await this.binding.fetch('http://internal/verify', {
			body: JSON.stringify({ password, hash }),
			method: 'POST',
		});

		return ((await resp.json()) as { matches: boolean }).matches;
	}
}

export type HashOptions = {
	binding: Fetcher;
	password: string;
	options?: CloudflareArgon2Options;
};

export type VerifyOptions = {
	hash: string;
	binding: Fetcher;
	password: string;
	options?: CloudflareArgon2Options;
};

/**
 * Calls Cloudflare's Argon2 hashing function with
 * the given options and returns the hash.
 *
 * @link {@link CloudflareArgon2.hash}
 */
export async function hash({ binding, password, options }: HashOptions) {
	return await new CloudflareArgon2(binding, options).hash(password);
}

/**
 * Calls Cloudflare's Argon2 verification function
 * with the given options and returns the result.
 *
 * @alias {@link CloudflareArgon2.verify}
 */
export async function verify({
	binding,
	password,
	options,
	hash,
}: VerifyOptions) {
	return await new CloudflareArgon2(binding, options).verify(hash, password);
}
