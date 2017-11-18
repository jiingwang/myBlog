const { query } = require('../utils/db-util.js');
module.exports = {
	createUser(data) {
		const sql = 'INSERT INTO TABLE user (user_name, pwd, gender, avatar, description) VALUES (?, ?, ?, ?, ?)';
		const { user_name, pwd, gender, avatar, description } = data;
		const result = query(sql, [user_name, pwd, gender, avatar, description]);
		return result;
	}
}