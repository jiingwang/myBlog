const config = require('../config').db;
const mysql = require('mysql');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'blog'
});


let query = function (sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				connection.query(sql, values, (err, rows) => {
					if(err) {
						reject(err);
					} else {
						resolve(rows);
					}
				});
				connection.release();
			}
		});
	});
};


let createTable = (sql) => {
	return query(sql, []);
};

let findDataById = (table, id) => {
	let _sql = 'SELECT * FROM ?? WHERE ID = ?';
	return query(_sql, [table, id]);
};


module.exports = {
	query,
	createTable,
	findDataById
};