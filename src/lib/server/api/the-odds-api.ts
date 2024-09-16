import createClient from 'openapi-fetch';
import type { paths } from './the-odds-api.types';

export const OddsClient = createClient<paths>({
	baseUrl: 'https://the-odds-api.com',
});

export type * from './the-odds-api.types';
