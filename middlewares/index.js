const path = require('path');
const session = require('koa-session2');
const miCheck = require('./check/check');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');


module.exports = (app) => {
	app.use(session({
		key: 'user'
	}));
	app.use(miCheck());

	app.use(bodyParser());
	app.use(static(path.resolve(__dirname, '../pulbic')));
}