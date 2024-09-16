import { raise } from '$lib/helpers/other';
import { SvelteKitAuth } from '@auth/sveltekit';
import { D1Adapter, up } from '@auth/d1-adapter';

import Passkey from '@auth/core/providers/passkey';
import Resend from '@auth/sveltekit/providers/resend';

import type { ServerLoadEvent } from '@sveltejs/kit';

export const { handle, signIn, signOut } = SvelteKitAuth(
	async ({ platform }) => ({
		adapter: D1Adapter(
			platform?.env.D1 ?? raise('Environment variable D1 is not set'),
		),

		providers: [Passkey, Resend],
		secret: platform?.env.AUTH_SECRET,

		session: {
			strategy: 'database',
			updateAge: 86400,
			maxAge: 2592000,
		},
	}),
);

export async function migrateServerHook(event: ServerLoadEvent) {
	await up(
		event.platform?.env.D1 ?? raise('Environment variable D1 is not set'),
	);
}
