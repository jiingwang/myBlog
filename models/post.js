const { query } = require('../utils/db-util.js');

module.exports = {
	createPost(author_id, title, content) {
		const sql = 'INSERT INTO post (author_id, title, content) VALUES (?, ?, ?)';
		const result = query(sql, [author_id, title, content]);
		return result;
	}
}