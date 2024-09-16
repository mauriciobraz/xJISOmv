import { logger } from '$lib/helpers/logger';
import { PendingRequest } from '$lib/models/pending-callback';

import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const {
		data: requestData,
		error: requestError,
		success: requestSuccess,
	} = PendingRequest.safeParse(await request.json());

	logger.debug('GET /api/callback/pending', {
		requestSuccess,
		requestError,
		requestData,
	});

	if (requestError) {
		return error(400, {
			message: requestError.message,
		});
	}

	return json({
		ok: true,
	});
};

export const POST: RequestHandler = GET;
