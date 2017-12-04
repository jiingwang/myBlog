const PostModel = require('../../models/post.js');

module.exports = {
    'GET /posts': async(ctx, next) => {

    },
    'GET /posts/create': async(ctx, next) => {
        await ctx.render('create');
    },
    'POST /posts/create': async(ctx, next) => {
        const postData = JSON.parse(JSON.stringify(ctx.request.fields));
        const {title, content} = postData;
        if (!title) {
            ctx.state.error = '标题不能为空';
            return ctx.render('create');
        }
        if (!content) {
            ctx.state.error = '内容不能为空';
            return ctx.render('create');
        }
        const authorId = ctx.session.user.id;
        const result = await PostModel.createPost(authorId, title, content);
        if (result) {
            return ctx.redirect(`/posts/${result.insertId}`)
        } else {
            ctx.state.error = '发布帖子失败';
            return ctx.render('create');
        }
    },
    'GET /posts/:postId/edit': async(ctx, next) => {

    },
    'POST /posts/:postId/edit': async(ctx, next) => {

    },
    'GET /posts/:postId/remove': async(ctx, next) => {

    }
}