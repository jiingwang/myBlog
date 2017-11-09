const session = require('koa-session2');

module.exports = (app) => {
	app.use(session());
}