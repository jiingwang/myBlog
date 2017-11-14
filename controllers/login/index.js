module.exports = {
    'GET /': async (ctx, next) => {
        await ctx.render('signup');
    },
    'GET /signin': async (ctx, next) => {
        ctx.session.user = "wangjing";
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