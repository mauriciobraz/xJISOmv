import normalizeUrl from 'normalize-url';
import { decrypt, encrypt, type Serializable } from './crypt';

export type CreateCallbackURLOptions = {
	content: Serializable;
	url: string;
};

export type DecodeCallbackURLOptions = {
	url: string;
};

/**
 * Encrypt a callback URL and returns its content.
 *
 * @example
 * ```typescript
 * console.log(
 *   encodeCallbackURL({
 *     url: 'https://example.com',
 *     content: { name: 'John Doe', age: 30 },
 *   })
 * );
 * ```
 */
export function encodeCallbackURL({ content, url }: CreateCallbackURLOptions) {
	return `${normalizeUrl(url)}?__s=${encodeURIComponent(encrypt(content))}`;
}

/**
 * Decodes a callback URL and returns its content.
 * @throws {TypeError} If `url` is not a valid URL.
 *
 * @example
 * ```typescript
 * console.log(
 *   decodeCallbackURL({
 *     url: 'https://example.com?__s=eyJuYW1lIjoiS29uZyIsImFnZSI6MX0=',
 *   })
 * );
 * ```
 */
export function decodeCallbackURL({ url }: DecodeCallbackURLOptions) {
	return decrypt(new URL(url).searchParams.get('__s') ?? 'N/D');
}

/**
 * Decodes a search params and returns its content.
 * @throws {TypeError} If `url` is not a valid URL.
 *
 * @example
 * ```typescript
 * export const POST: RequestHandler = async ({ params }) => {
 *   console.log(
 *     decodeSearchParams(params)
 *   );
 * };
 * ```
 */
export function decodeSearchParams(
	searchParams: URLSearchParams | Partial<Record<string, string>>,
) {
	return decrypt(
		searchParams instanceof URLSearchParams
			? (searchParams.get('__s') ?? 'N/D')
			: (searchParams.__s ?? 'N/D'),
	);
}
