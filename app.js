const Koa = require('koa2');
const app = new Koa();
const middleware = require('./middlewares');
const Router = require('koa-router');
const router = new Router();
const initRouter = require('./routers');
const { port } = require('./config');

initRouter(router);
middleware(app);
app.use(router.routes());
app.listen(port, () => {
	console.log('myblog is listening on http://127.0.0.1:' + port);
});