module.exports = {
    'GET /': async (ctx, next) => {
        ctx.response.body = '234234234';
    },
    'GET /signin': async (ctx, next) => {
        ctx.session.name = "sdf";
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