const path = require('path');
const session = require('koa-session');
const miCheck = require('./check/check');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const views = require('koa-views');


module.exports = (app) => {
	app.keys = ['some secrete'];

	app.use(session({
		key: 'user'
	}, app));
	app.use(views(path.resolve(__dirname, '../views')))
	app.use(miCheck());

	app.use(bodyParser());
	app.use(static(path.resolve(__dirname, '../pulbic')));
};