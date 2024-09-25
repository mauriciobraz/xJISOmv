import { error, fail, redirect, type Action } from '@sveltejs/kit';

import { logger } from '$lib/helpers/logger';

import { hash, verify } from '$lib/server/argon2';
import { createLuciaClient } from '$lib/server/lucia';
import { createPrismaClient } from '$lib/server/prisma';

import { SignInSchema, SignUpSchema } from '$lib/models/actions';

export const SignUp: Action = async ({ platform, request, cookies }) => {
	const {
		data: requestData,
		error: requestError,
		success: requestSuccess,
	} = SignUpSchema.safeParse(await request.json());

	logger.debug('ACTION /SignIn', {
		requestSuccess,
		requestError,
		requestData,
	});

	if (requestError) {
		return error(400, {
			message: requestError.message,
		});
	}

	if (!platform?.env.ARGON2) {
		return error(500, {
			message: 'Argon2 not configured',
		});
	}

	const lucia = createLuciaClient(platform);
	const prisma = createPrismaClient(platform);

	const hashedPassword = await hash({
		password: requestData.password,
		binding: platform.env.ARGON2,
	});

	const exists = await prisma.user.findUnique({
		where: { username: requestData.username },
	});

	if (exists) {
		return error(400, {
			message: 'Username already taken',
		});
	}

	const { id } = await prisma.user.create({
		data: {
			username: requestData.username,
			password_hash: hashedPassword,
		},
		select: {
			id: true,
		},
	});

	const session = await lucia.createSession(id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});

	redirect(302, '/');
};

export const SignIn: Action = async ({ platform, request, cookies }) => {
	const {
		data: requestData,
		error: requestError,
		success: requestSuccess,
	} = SignInSchema.safeParse(await request.json());

	logger.debug('ACTION /SignIn', {
		requestSuccess,
		requestError,
		requestData,
	});

	if (requestError) {
		return error(400, {
			message: requestError.message,
		});
	}

	if (!platform?.env.ARGON2) {
		return error(500, {
			message: 'Argon2 not configured',
		});
	}

	const lucia = createLuciaClient(platform);
	const prisma = createPrismaClient(platform);

	const user = await prisma.user.findUnique({
		where: { username: requestData.username },
	});

	if (!user) {
		return error(400, {
			message: 'Invalid credentials',
		});
	}

	const passwordMatch = await verify({
		password: requestData.password,
		binding: platform.env.ARGON2,
		hash: user.password_hash,
	});

	if (!passwordMatch) {
		return error(400, {
			message: 'Invalid credentials',
		});
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});

	redirect(302, '/');
};

export const SignOut: Action = async ({ platform, cookies, locals }) => {
	if (!locals.session) {
		return fail(401);
	}

	if (!platform) {
		return fail(500, {
			message: 'Platform not found',
		});
	}

	const sessionCookie = createLuciaClient(platform).createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});

	redirect(302, '/');
};
