import { logger } from '$lib/helpers/logger';
import { CallbackParams, CallbackRequest } from '$lib/models/callback';
import { CRYPT_API_PUBLIC_KEY } from '$lib/server/env';
import { createPrismaClient } from '$lib/server/prisma';

import { error, json, type RequestHandler } from '@sveltejs/kit';
import { createVerify } from 'crypto';

const Logger = logger.child({
	from: 'API.Callback',
});

/**
 * Checks if the request signature is valid.
 * @throws {Error} If the signature is invalid.
 *
 * @example
 * ```typescript
 * const isSignatureValid = await checkSignature(request);
 * ```
 */
async function checkSignature(request: Request) {
	const RSA_SHA256_Verif = createVerify('RSA-SHA256');

	if (request.method === 'GET') RSA_SHA256_Verif.update(request.url);
	if (request.method === 'POST') RSA_SHA256_Verif.update(await request.text());

	const signatureBase64 = request.headers.get('x-ca-signature')?.toString();
	const signatureBuffer = Buffer.from(signatureBase64 ?? ' ', 'base64');

	return RSA_SHA256_Verif.verify(CRYPT_API_PUBLIC_KEY, signatureBuffer);
}

export const GET: RequestHandler = async ({ request, platform }) => {
	const {
		data: requestData,
		error: requestError,
		success: requestSuccess,
	} = CallbackRequest.safeParse(await request.json());

	const {
		data: paramsData,
		error: paramsError,
		success: paramsSuccess,
	} = CallbackParams.safeParse(new URL(request.url).searchParams);

	Logger.debug('GET /api/callback', {
		requestSuccess,
		requestError,
		requestData,

		paramsData,
		paramsError,
		paramsSuccess,
	});

	if (!platform) {
		return error(500, { message: 'Platform not found' });
	}

	if (paramsError) {
		return error(400, { message: paramsError.message });
	}

	if (requestError) {
		return error(400, { message: requestError.message });
	}

	if (!(await checkSignature(request))) {
		return error(400, { message: 'Invalid Signature' });
	}

	const prisma = createPrismaClient(platform);

	if (requestData.pending) {
		Logger.debug('Pending', {
			data: requestData,
		});
	} else {
		Logger.info('Confirmed', {
			data: requestData,
		});

		const transaction = await prisma.transaction.findFirst({
			where: { callbackId: paramsData.transactionId.toString() },
			include: { wallet: { include: { ticker: true } } },
		});

		if (transaction?.status === 'CONFIRMED') {
			return json({ ok: true });
		}

		if (!transaction) {
			Logger.info('Transaction not found', {
				requestData,
				paramsData,
			});

			return json({ ok: false });
		}

		const requestTicker = requestData.coin?.toLowerCase();
		const transactionTicker = transaction.wallet.ticker.slug.toLowerCase();

		if (requestTicker !== transactionTicker) {
			// TODO: Support ETH/ERC20 multi-token
			Logger.info('Ticker mismatch', {
				transactionId: transaction.id,
				transactionTicker,
				requestTicker,
			});

			return json({ ok: false });
		}

		await prisma.transaction.update({
			data: {
				callbackId: requestData.uuid,
				addressOut: requestData.address_out,
				addressIn: requestData.address_in,
				status: 'CONFIRMED',
			},
			where: {
				id: paramsData.transactionId.toString(),
			},
		});
	}

	return json({
		ok: true,
	});
};

export const POST: RequestHandler = GET;
