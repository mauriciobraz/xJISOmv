// Works by memoizing the response from the Odds API every 250ms/1000ms, and storing
// it in a cache, then providing it to the client as a websocket, avoiding excessive API calls.

import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	throw new Error('Not implemented');
};
