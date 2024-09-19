declare global {
	namespace App {
		// interface PageState {}
		// interface PageData {}
		// interface Error {}

		interface Platform {
			env: {
				D1: import('@cloudflare/workers-types').D1Database;
				ARGON2: import('@cloudflare/workers-types').Fetcher;
			};

			context: {
				waitUntil(promise: Promise<unknown>): void;
			};

			caches: CacheStorage & {
				default: Cache;
			};
		}

		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
	}
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			username: string;
		};
	}
}

export {};
