import createClient from 'openapi-fetch';
import type { paths } from './crypt-api.types';

export const CryptClient = createClient<paths>({
	baseUrl: 'https://the-odds-api.com',
});

export type * from './crypt-api.types';
