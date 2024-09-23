import { dev } from '$app/environment';
import pino from 'pino';

export const logger = pino({
	level: dev ? 'debug' : 'info',
	transport: {
		options: {
			colorize: true,
			levelFirst: true,
			translateTime: true,
			ignore: 'pid,hostname',
		},
		target: 'pino-pretty',
	},
});

export type { Logger } from 'pino';
