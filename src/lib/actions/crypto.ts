import { error, json } from '@sveltejs/kit';

import { logger } from '$lib/helpers/logger';
import { Ticker } from '$lib/constants/currency';

import { ADDRESSES_TARGET } from '$lib/server/env';
import { encodeAddress } from '$lib/models/address';

import { AddFundsSchema } from '$lib/models/actions';
import { createPrismaClient } from '$lib/server/prisma';

import { CryptClient } from '$lib/server/api/crypt-api';

import type { ConfirmedRequestParams } from '$lib/models/callback';
import type { Action } from '@sveltejs/kit';

const ActionsLogger = logger.child({
	from: 'Actions.Crypto',
});

export const AddFunds: Action = async ({ platform, request, locals }) => {
	const {
		data: requestData,
		error: requestError,
		success: requestSuccess,
	} = AddFundsSchema.safeParse(await request.json());

	ActionsLogger.debug('ACTION /AddFunds', {
		requestSuccess,
		requestError,
		requestData,
	});

	if (requestError) {
		return error(400, {
			message: requestError.message,
		});
	}

	if (!locals.session || !locals.user) {
		return error(401, {
			message: 'Unauthorized',
		});
	}

	const prisma = createPrismaClient(platform as App.Platform);

	const user = await prisma.user.findUnique({
		where: { id: locals.user.id },
	});

	const ticker = await prisma.ticker.findUnique({
		where: { slug: requestData.ticker },
	});

	if (!user) {
		return error(401, {
			message: 'Unauthorized',
		});
	}

	if (!ticker) {
		return error(400, {
			message: 'Ticker not found',
		});
	}

	const minimumTransaction = await getMinimumTransaction(requestData.ticker);

	if (requestData.amount < minimumTransaction)
		return error(400, {
			context: { minimumTransaction: minimumTransaction },
			message: 'Provided amount is less than the minimum',
		});

	const rawTickerAddress =
		ADDRESSES_TARGET[getEnumKeyByValue(Ticker, requestData.ticker)];

	if (!rawTickerAddress) return error(400, { message: 'Ticker not supported' });
	const tickerAddress = encodeAddress(rawTickerAddress);

	const transaction = await prisma.transaction.create({
		data: {
			status: 'PENDING',
			addressOut: tickerAddress,
			amountUser: requestData.amount,
			wallet: {
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

	const encodedCallback = encodeURI(
		makeCallbackUrl(new URL(request.url), {
			transactionId: transaction.id,
		} as ConfirmedRequestParams),
	);

	const { data: addrData } = await CryptClient.GET('/{ticker}/create', {
		params: {
			query: { address: tickerAddress, callback: encodedCallback },
			path: { ticker: requestData.ticker },
		},
	});

	if (!addrData || addrData?.status === 'error') {
		await prisma.transaction.update({
			where: { id: transaction.id },
			data: { status: 'FAILED' },
		});

		return error(500, { message: 'Failed to create address' });
	}

	await prisma.transaction.update({
		where: { id: transaction.id },
		data: {
			addressIn: addrData.address_in,
			addressOut: addrData.address_out,
		},
	});

	const { data: qrCodeData } = await CryptClient.GET('/{ticker}/qrcode', {
		params: {
			path: { ticker: requestData.ticker },
			query: { address: addrData.address_in },
		},
	});

	if (!qrCodeData || qrCodeData?.status === 'error') {
		await prisma.transaction.update({
			where: { id: transaction.id },
			data: { status: 'FAILED' },
		});

		return error(500, { message: 'Failed to create address' });
	}

	ActionsLogger.debug('ACTION /AddFunds', {
		Address: addrData.address_in,
		QRCode: qrCodeData.qr_code,
	});

	return json({
		image: qrCodeData.qr_code,
		address: addrData.address_in,
	});
};

async function getMinimumTransaction(ticker: Ticker) {
	const minTransaction = Number.parseFloat(
		(await getCurrencyInfo(ticker))?.minimum_transaction_coin ?? 'NaN',
	);

	if (!ADDRESSES_TARGET[getEnumKeyByValue(Ticker, ticker)]) {
		throw new Error('Address not recognized');
	}

	return (
		minTransaction *
		/** minMultiplier */ (1 +
			(ADDRESSES_TARGET[getEnumKeyByValue(Ticker, ticker)]?.length ?? 0 - 1) /
				3)
	);
}

async function getCurrencyInfo(ticker: string) {
	return (
		await CryptClient.GET('/{ticker}/info', {
			params: { path: { ticker: ticker.toLowerCase() } },
		})
	).data;
}

function getEnumKeyByValue<T extends Record<string, string>>(
	obj: T,
	value: T[keyof T],
) {
	return Object.keys(obj).find((key) => obj[key] === value) as keyof T;
}

function makeCallbackUrl(base: URL, metadata?: Record<string, unknown>) {
	return new URL(
		`/api/callback?metadata=${encodeURIComponent(JSON.stringify(metadata))}`,
		`${base.protocol}//${base.host}:${base.port}`,
	).toString();
}
