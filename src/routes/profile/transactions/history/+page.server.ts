import { z } from 'zod';
import { fail } from '@sveltejs/kit';

import { prisma } from '$lib/server/prisma';
import { logger } from '$lib/helpers/logger';

import { Ticker } from '$lib/constants/currency';
import { enumKeys, typedFormData } from '$lib/helpers/zod';
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
	history: async ({ request }) => {
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
				displayLogo: '',
				displayName: '',
				slug: actionData.ticker,
			},
			update: {},
		});

		const transactions = await prisma.transaction.findMany({
			where: {
				Wallet: {
					userId: user.id,
					tickerId: ticker.id,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return { transactions };
	},
};
