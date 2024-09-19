import type { Handle } from '@sveltejs/kit';

import { logger } from '$lib/helpers/logger';
import { createLuciaClient } from '$lib/server/lucia';

const hooksLogger = logger.child({
	from: 'hooks.server',
});

export const handle: Handle = async ({ event, resolve }) => {
	const lucia = createLuciaClient(event.platform as App.Platform);
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;

		hooksLogger.debug('Not Authenticated', {
			sessionId,
		});

		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			extend(sessionCookie.attributes, { path: '.' }),
		);
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();

		event.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			extend(sessionCookie.attributes, { path: '.' }),
		);
	}

	event.locals.user = user ?? null;
	event.locals.session = session ?? null;

	hooksLogger.debug('Maybe Authenticated', {
		session,
		user,
	});

	return resolve(event);
};

function extend<A, B>(defaults: A, exts: B): A & B {
	return { ...exts, ...defaults };
}
