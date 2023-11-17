import { Request, Response } from 'express';
import UserSchema from '../schemas/UserSchema';
import { hasher, randomId } from '../common/helpers';
import connection from '../utils/database';
import { ER_DUP_ENTRY } from 'mysql-error-keys';

const registerRoute = (req: Request, res: Response) => {
	const user = req.body;

	const validate = UserSchema.safeParse(user);

	if (!validate.success) {
		console.log(validate.error);
		res.status(400).json([null, validate.error.issues]);
	}

	if (validate.success) {
		const hash = hasher(user.password);
		const str = `INSERT INTO Chess.Users (ID, Email, UserName, PasswordHash) VALUES ("${randomId()}","${
			user.email
		}","${user.username}","${hash}")`;

		connection.query(str, (error, result) => {
			if (error) {
				if (error.code === ER_DUP_ENTRY) {
					res.status(400).json([
						null,
						{
							message: 'Invalid email!',
						},
					]);
					return;
				}

				res.status(400).json([null, error]);
				return;
			}

			res.status(201).json([
				{
					success: true,
				},
				null,
			]);
		});
	}
};

export default registerRoute;
