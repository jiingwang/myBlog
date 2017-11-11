const comment = require('./comment');
const login = require('./login');
const post = require('./post');

module.exports = Object.assign({}, comment, login, post);