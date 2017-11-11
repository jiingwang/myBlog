const Koa = require('koa');
const app = new Koa();
const middleware = require('./middlewares');

middleware(app);
app.use(async (ctx, next) => {
	ctx.session.name = "hello";
	await next();
	console.log(ctx.session);
});

app.listen(3000, () => {
	console.log('myblog is listening on http://127.0.0.1:3000');
});