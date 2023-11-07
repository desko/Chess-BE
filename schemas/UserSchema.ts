import { z } from 'zod';
import { passwordRegex } from '../common/regex';

const UserSchema = z
	.object({
		email: z.string().email('Email must be valid!'),
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters long!'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long!'),
		confirmPassword: z.string(),
	})
	.refine(
		(object) => {
			return passwordRegex.test(object.password);
		},
		{
			message:
				'Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), one special character from the set: @, $, !, %, *, ?, or &.',
			path: ['password'],
		}
	)
	.refine(
		(object) => {
			return object.password === object.confirmPassword;
		},
		{
			message: 'Passwords must be equal',
			path: ['confirmPassword'],
		}
	);

export default UserSchema;
