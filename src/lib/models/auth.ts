import { z } from 'zod';

export const SecurePass = z.string().superRefine((value, ctx) => {
	if (value.length < 6) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Must have at least 6 characters',
		});
	}

	if (value.length > 256) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Must have at most 256 characters',
		});
	}

	if (!/[0-9]/.test(value)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Must have at least one number',
		});
	}

	if (!/[A-Z]/.test(value)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Must have at least one uppercase letter',
		});
	}

	if (!/[a-z]/.test(value)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Must have at least one lowercase letter',
		});
	}

	if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]*$/.test(value)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Must have at least one special character',
		});
	}
});

const Username = z
	.string()
	.min(3)
	.max(32)
	.superRefine((value, ctx) => {
		if (!/^[a-zA-Z0-9]*$/.test(value)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Only letters and numbers are allowed',
			});
		}
	});

export const SignInSchema = z.object({
	username: Username,
	password: SecurePass,
});

export const SignUpSchema = z
	.object({
		username: Username,
		password: SecurePass,
		confirmPassword: SecurePass,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: '&.confirmPassword must match &.password',
		path: ['confirmPassword', 'password'],
	});

export const ChangePasswordSchema = z
	.object({
		username: Username,
		password: SecurePass,
		passwordConfirm: SecurePass,
		currentPassword: SecurePass,
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: '&.passwordConfirm must match &.password',
		path: ['passwordConfirm', 'password'],
	});
