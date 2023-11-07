import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
	host: 'localhost',
	user: 'root',
	password: 'royalforkNC7',
	database: 'Chess',
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
