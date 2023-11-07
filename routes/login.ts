import connection from '../utils/database';
const bcrypt = require('bcryptjs');
import { Request, Response, Errback } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

require('dotenv').config();

const secretJWT = process.env.JWT_KEY;

type LoginResponse = {
	ID: string;
	Email: string;
	PasswordHash: string;
	Username: string;
};

const loginRoute = (req: Request, res: Response) => {
	const credentials = req.body;
	const str = `SELECT ID, Email, Username, PasswordHash FROM Users WHERE Email = "${credentials.email}";`;

	connection.query(
		str,
		(error: Errback, response: LoginResponse[] /*| Response[]*/) => {
			if (error) {
				console.log(error);
				res.status(400).json(error);
			}

			if (response.length === 0) {
				res.status(403).json({
					message: 'Incorrect credentials!',
				});
				return;
			}

			const storedHash = response[0]?.PasswordHash;

			bcrypt.compare(
				credentials.password,
				storedHash,
				(err: Error, result: boolean) => {
					if (err) {
						console.error('Error comparing hash:', err);
						res.status(400).json(new Error('Login error'));
					}

					if (result && secretJWT) {
						// The plain text input matches the hashed password
						console.log(result);
						//todo return jwt
						const payload = {
							sub: response[0]?.ID,
							username: response[0]?.Username,
							email: response[0]?.Email,
						};
						const token = jwt.sign(payload, secretJWT, {
							expiresIn: '1d',
						});
						res.status(200).json({
							success: true,
							jwt: token,
						});
					} else {
						// The plain text input does not match the hashed password
						res.status(403).json({
							message: 'Incorrect credentials!',
						});
					}
				}
			);
		}
	);
};

export default loginRoute;
