const mysql = require('mysql2');
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize= new Sequelize(
	{
		host: 'localhost',
		user: 'DB_USER',
		password: 'DB_PW',
		database: 'DB_NAME',
		dialect: 'mysql',
	},
	console.log('Connected to the employee_db database.')
);

module.exports = sequelize.database;
