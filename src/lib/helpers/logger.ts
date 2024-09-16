import pino from 'pino';
import toast from 'svelte-french-toast';

import { ZodError } from 'zod';
import { browser, dev } from '$app/environment';

import type { ToastOptions } from 'svelte-french-toast';

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
	browser: {
		write: {
			info: (object) => showToast.info(getErrorReason(object)),
			warn: (object) => showToast.warn(getErrorReason(object)),
			error: (object) => showToast.error(getErrorReason(object)),
			fatal: (object) => showToast.fatal(getErrorReason(object)),
			debug: (object) => showToast.debug(getErrorReason(object)),
			trace: (object) => showToast.trace(getErrorReason(object)),
		},
		asObject: false,
	},
});

export type { Logger } from 'pino';

/**
 * Gets an readable error message from an object
 * @param object Unknown object to get error message from
 */
function getErrorReason(object: unknown) {
	if (object instanceof Error) return object.message;
	if (object instanceof ZodError) return object.message;

	if (typeof object === 'string') return object;

	if (typeof object === 'object' && object !== null) {
		const message = ['message', 'content', 'error', 'cause'].find(
			(key) => key in object,
		);

		if (message) return message;
	}

	return typeof object === 'object' && object !== null && 'msg' in object
		? String(object.msg)
		: 'UNKNOWN';
}

function showToast(message: string, opts?: ToastOptions): string {
	if (browser && dev) toast(message, opts);
	return message;
}

showToast.error = (message: string, opts?: ToastOptions) =>
	browser &&
	dev &&
	showToast(message, {
		style: 'background-color: #f8d7da; color: #721c24;',
		position: 'top-right',
		...opts,
	});

showToast.fatal = (message: string, opts?: ToastOptions) =>
	browser &&
	dev &&
	showToast(message, {
		position: 'top-right',
		style: 'background-color: #f5c6cb; color: #721c24;',
		...opts,
	});

showToast.debug = (message: string, opts?: ToastOptions) =>
	browser &&
	dev &&
	showToast(message, {
		style: 'background-color: #cce5ff; color: #004085;',
		position: 'top-right',
		icon: '🐛',
		...opts,
	});

showToast.info = (message: string, opts?: ToastOptions) =>
	browser &&
	dev &&
	showToast(message, {
		style: 'background-color: #d1ecf1; color: #0c5460;',
		position: 'top-right',
		icon: '📑',
		...opts,
	});

showToast.trace = (message: string, opts?: ToastOptions) =>
	browser &&
	dev &&
	showToast(message, {
		style: 'background-color: #d4edda; color: #155724;',
		position: 'top-right',
		icon: '🔎',
		...opts,
	});

showToast.warn = (message: string, opts?: ToastOptions) =>
	browser &&
	dev &&
	showToast(message, {
		style: 'background-color: #fff3cd; color: #856404;',
		position: 'top-right',
		icon: '⚠️',
		...opts,
	});
