import type { D1Database } from '@auth/d1-adapter';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}

		interface Platform {
			env: {
				D1: D1Database;
				AUTH_SECRET: string;
			};
		}
	}
}

export {};
