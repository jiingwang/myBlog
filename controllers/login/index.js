module.exports = {
    'GET /': async (ctx, next) => {
        ctx.response.body = ctx.session ? ctx.session.name : 'defautl';
    },
    'GET /signin': async (ctx, next) => {
        ctx.session.name = "wangjing";
        ctx.response.body = "signin success";
    },
    'POST /signin': async (ctx, next) => {

    },
    'GET /signout': async (ctx, next) => {

    },
    'GET /signup': async (ctx, next) => {

    },
    'POST /signup': async (ctx, next) => {

    }
}