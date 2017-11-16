const path = require('path');
const session = require('koa-session');
const miCheck = require('./check/check');
const bodyParser = require('koa-better-body');
const static = require('koa-static');
const views = require('koa-views');

module.exports = (app) => {
	app.keys = ['some secrete'];
	const pkg = {
		name: 'myblog',
		description: 'my persional blog'
	};

	// 添加模板必需的三个变量
	app.use(async function (ctx, next) {
		ctx.state.blog = {
			title: pkg.name,
	  		description: pkg.description	
		};
	  ctx.state.user = ctx.session.user;
	  ctx.state.success = '';
	  ctx.state.error = '';
	  await next();
	});
		
	app.use(session({
		key: 'user'
	}, app));

	app.use(views(path.resolve(__dirname, '../views'), {
		extension: 'ejs'
	}));

	app.use(miCheck());
	app.use(static(path.resolve(__dirname, '../public')));
	app.use(bodyParser());
	
};