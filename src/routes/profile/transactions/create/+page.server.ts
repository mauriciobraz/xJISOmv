import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import normalizeUrl from 'normalize-url';

import { prisma } from '$lib/server/prisma';
import { logger } from '$lib/helpers/logger';

import { Ticker } from '$lib/constants/currency';
import { CryptClient } from '$lib/server/api/crypt-api';

import { ADDRESS_OUT } from '$lib/constants/address';
import { encodeCallbackURL } from '$lib/helpers/url';
import { enumKeys, typedFormData } from '$lib/helpers/zod';

import { ConfirmedParams } from '$lib/models/confirm-callback';
import { encodeAddress } from '$lib/models/address';
import type { Actions } from './$types';

const CreateActionSchema = typedFormData(
	z.object({
		/**
		 * User ID on database.
		 * @example "1234567890"
		 */
		userId: z.string(),

		/**
		 * Payment currency used by your customer.
		 * @example "TRC20/USDT"
		 */
		ticker: z.enum(enumKeys(Ticker)),

		/**
		 * Expected payment amount in the `ticker` currency.
		 * @example 86000.912345
		 */
		price: z.number().nonnegative().optional().default(0),
	}),
);

export const actions: Actions = {
	create: async ({ request }) => {
		const {
			data: actionData,
			error: actionError,
			success: actionSuccess,
		} = CreateActionSchema.safeParse(await request.formData());

		logger.debug('ACTION /transaction/create?default', {
			actionSuccess,
			actionError,
			actionData,
		});

		if (actionError) {
			return fail(400, {
				errors: actionError.errors,
			});
		}

		const user = await prisma.user.upsert({
			where: { id: actionData.userId },
			create: { id: actionData.userId },
			update: {},
		});

		const ticker = await prisma.ticker.upsert({
			where: { slug: actionData.ticker },
			create: {
				displayLogo: 'N/A',
				displayName: 'N/A',
				slug: actionData.ticker,
			},
			update: {},
		});

		const transaction = await prisma.transaction.create({
			data: {
				Wallet: {
					connectOrCreate: {
						create: {
							userId: user.id,
							tickerId: ticker.id,
						},
						where: {
							userId_tickerId: {
								userId: user.id,
								tickerId: ticker.id,
							},
						},
					},
				},
			},
		});

		const tickerAddress = ADDRESS_OUT.get(actionData.ticker);

		if (!tickerAddress) {
			return fail(400, {
				errors: [{ field: 'ticker', message: 'Unsupported Ticker' }],
			});
		}

		const address = encodeAddress(tickerAddress);

		const callback = encodeCallbackURL({
			url: `${normalizeUrl(request.url)}/api/callback/confirm`,
			content: ConfirmedParams.parse({ transactionId: transaction.id }),
		});

		const addressResponse = await CryptClient.GET('/{ticker}/create', {
			params: {
				path: { ticker: actionData.ticker },
				query: { address, callback },
			},
		});

		// TODO: Generate QR Code manually using a better library that supports:
		// adding images to the center of the QR Code; rounded corners of the QR Code.

		const qrCodeResponse = await CryptClient.GET('/{ticker}/qrcode', {
			params: {
				path: { ticker: actionData.ticker },
				query: { address, callback },
			},
		});

		if (!addressResponse.data || !qrCodeResponse.data) {
			await prisma.transaction.delete({
				where: { id: transaction.id },
			});

			return fail(400, {
				errors: [
					{ field: '&QRCodeResponse.data', message: 'Something went wrong' },
					{ field: '&AddressResponse.data', message: 'Something went wrong' },
				],
			});
		}

		await prisma.transaction.update({
			where: { id: transaction.id },
			data: {
				addressIn: addressResponse.data.address_in,
				addressOut: addressResponse.data.address_out,
				callbackUrl: addressResponse.data.callback_url,
			},
		});

		return {
			qrCode: qrCodeResponse.data.qr_code,
			address: addressResponse.data.address_in,
			paymentUri: qrCodeResponse.data.payment_uri,
		};
	},
};
