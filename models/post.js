const { query } = require('../utils/db-util.js');
const POST_SQLS = {
	CREATE: 'INSERT INTO post (author_id, title, content) VALUES (?, ?, ?)',
	QUERY: `SELECT a.id, a.title, a.content, a.pv, a.create_time, a.author_id, b.user_name, b.gender, b.description, b.avatar 
			FROM post a, user b
			WHERE a.author_id = b.id
			ORDER BY a.create_time DESC
	 		`,
    QUERYBYID: `SELECT a.id, a.title, a.content, a.pv, a.create_time, a.author_id, b.user_name, b.gender, b.description, b.avatar 
				FROM post a, user b
				WHERE a.author_id = b.id AND a.id = ?
				`,
    UPDATE:  `UPDATE post 
    		  SET title = ?, content = ?
    		  WHERE id = ?
				`,
    QUERY_AUTHOR_ID: ` SELECT author_id FROM post
    					WHERE id = ?
    		  `,
    DELETE: ` DELETE FROM post
    			WHERE id = ?
    	`
}


module.exports = {
	createPost(author_id, title, content) {
		const result = query(POST_SQLS.CREATE, [author_id, title, content]);
		return result;
	},

	getPostsWithAuthor() {
		const result = query(POST_SQLS.QUERY);
		return result;
	},

	getPostById(id) {
        const result = query(POST_SQLS.QUERYBYID, [id]);
        return result;
	},

    getAuthorIdByPostId(id) {
        const result = query(POST_SQLS.QUERY_AUTHOR_ID, [id]);
        return result;
	},

    editPost(id, data) {
        const result = query(POST_SQLS.UPDATE, [data.title, data.content, id]);
        return result;
	},

    deletePost(id) {
        const result = query(POST_SQLS.DELETE, [id]);
        return result;
	}
}