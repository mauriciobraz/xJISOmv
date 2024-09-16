import { logger } from '$lib/helpers/logger';
import { ConfirmedRequest } from '$lib/models/confirm-callback';

import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const {
		data: requestData,
		error: requestError,
		success: requestSuccess,
	} = ConfirmedRequest.safeParse(await request.json());

	logger.debug('GET /api/callback/confirm', {
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
