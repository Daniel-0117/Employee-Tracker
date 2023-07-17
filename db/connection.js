const mysql = require('mysql2');

const connection = mysql.createConnection(
	{
		host: 'localhost',
		user: 'DB_USER',
		password: 'DB_PW',
		database: 'DB_NAME',
	},
	console.log('Connected to the employee_db database.')
);

module.exports = connection;
