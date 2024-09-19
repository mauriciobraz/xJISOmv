import { dev } from '$app/environment';
import { createPrismaClient } from '$lib/server/prisma';

import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Lucia } from 'lucia';

/**
 * Creates a new Lucia Client using `&platform.env.D1`.
 * @param platform Reference to the platform-specific context.
 *
 * @example
 * ```typescript
 * export const handle: Handle = async ({ platform }) => {
 *   const lucia = createLuciaClient(platform);
 *   ...
 * };
 * ```
 */
export function createLuciaClient(
	platform: Readonly<App.Platform>,
	prisma = createPrismaClient(platform),
) {
	return new Lucia(new PrismaAdapter(prisma.session, prisma.user), {
		sessionCookie: { attributes: { secure: !dev } },
		getUserAttributes: (attributes) => ({
			username: attributes.username,
		}),
	});
}
