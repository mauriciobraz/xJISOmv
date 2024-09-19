import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

/**
 * Creates a new Prisma Client using `&platform.env.D1`.
 * @param platform Reference to the platform-specific context.
 *
 * @example
 * ```typescript
 * export const GET: RequestHandler = async ({ platform }) => {
 *   const prisma = createPrismaClient(platform);
 *   ...
 * };
 */
export function createPrismaClient(platform: Readonly<App.Platform>) {
	return new PrismaClient({ adapter: new PrismaD1(platform.env.D1) });
}

/**
 * Complies Prisma Client with D1.
 * @reference {@link createPrismaClient}
 */
export type PrismaClientX = ReturnType<typeof createPrismaClient>;
