import {
	scryptSync,
	randomBytes,
	createCipheriv,
	createDecipheriv,
} from 'node:crypto';

import { AES_192_CBC_PASS, AES_192_CBC_SALT } from '$env/static/private';

export type Serializable =
	| { [key: string]: Serializable }
	| Serializable[]
	| boolean
	| bigint
	| number
	| string
	| object
	| null;

// const AES_192_CBC_SALT = 'TEST_SALT';
// const AES_192_CBC_PASS = 'TEST_PASS';

/**
 * Encrypts JSON-serializable content.
 *
 * @param content JSON-serializable content.
 * @param customSalt Custom salt for encryption.
 * @param customPassword Custom password for encryption.
 *
 * @example
 * ```typescript
 * const encrypted = encrypt({
 *   name: 'John Doe',
 *   age: 30,
 * });
 *
 * const decrypted = decrypt(encrypted);
 *
 * console.log({
 *   encrypted,
 *   decrypted,
 * });
 * ```
 */
export function encrypt(
	content: Serializable,
	customSalt: string = AES_192_CBC_SALT,
	customPassword: string = AES_192_CBC_PASS,
) {
	const iv = randomBytes(16);
	const parsedKey = scryptSync(customPassword, customSalt, 24);

	const cipher = createCipheriv('aes-192-cbc', parsedKey, iv);
	const encrypted = cipher.update(JSON.stringify(content), 'utf8', 'hex');

	return [
		encrypted + cipher.final('hex'),
		Buffer.from(iv).toString('hex'),
	].join('\u001f');
}

/**
 * Decrypts JSON-serializable content.
 *
 * @param content JSON-serializable content.
 * @param customSalt Custom salt for decryption.
 * @param customPassword Custom password for decryption.
 *
 * @example
 * ```typescript
 * const encrypted = encrypt({
 *   name: 'John Doe',
 *   age: 30,
 * });
 *
 * const decrypted = decrypt(encrypted);
 *
 * console.log({
 *   encrypted,
 *   decrypted,
 * });
 * ```
 */
export function decrypt(
	content: string,
	customSalt: string = AES_192_CBC_SALT,
	customPassword: string = AES_192_CBC_PASS,
): Serializable {
	const decipher = createDecipheriv(
		'aes-192-cbc',
		scryptSync(customPassword, customSalt, 24),
		Buffer.from(content.split('\u001f')[1], 'hex'),
	);

	return JSON.parse(
		decipher.update(content.split('\u001f')[0], 'hex', 'utf8') +
			decipher.final('utf8'),
	);
}
