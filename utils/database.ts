import mysql, { ConnectionOptions } from 'mysql2';
import 'dotenv/config';

require('dotenv').config();

const access: ConnectionOptions = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
};

const connection = mysql.createConnection(access);

try {
	connection.connect((err) => {
		if (err) {
			throw err;
		}
	});
} catch (error) {
	console.log(error);
}

export default connection;
