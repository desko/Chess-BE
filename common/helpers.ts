const bcrypt = require('bcryptjs');
import crypto from 'crypto';

export const hasher = (password: string): string => {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	return hash;
};

export const randomId = (): string => {
	return crypto.randomBytes(3 * 4).toString('base64');
};

export const generateJWTSecret = () => {
	return crypto.randomBytes(32).toString('hex'); // 32 bytes provides a 256-bit key
};
