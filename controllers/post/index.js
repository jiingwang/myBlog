const PostModel = require('../../models/post.js');

module.exports = {
    'GET /posts': async(ctx, next) => {
        const result = await PostModel.getPostsWithAuthor();
        let posts = [];
        if (result.length && result.length > 0) {
            posts = result.map(row => {
                const { id, title, content, pv, create_time, author_id, user_name, gender, description, avatar } = row;
                return {
                    id,
                    author: {
                        id: author_id,
                        user_name,
                        gender,
                        description,
                        avatar
                    },
                    title,
                    pv,
                    content,
                    create_time,
                    commentsCount: 0
                }
            });
        }
        await ctx.render('posts', {
            posts,
            user: JSON.parse(JSON.stringify(ctx.session.user))
        });
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
        const id = ctx.params.postId;
        const result = await PostModel.getPostById(id);
        if (result && result.length>0) {
            const { id, title, content, pv, create_time, author_id, user_name, gender, description, avatar } = result[0];
            const post = {
                id,
                author: {
                    id: author_id,
                    user_name,
                    gender,
                    description,
                    avatar
                },
                title,
                pv,
                content,
                create_time,
                commentsCount: 0
            }
            await ctx.render('edit', {
                post,
                user: JSON.parse(JSON.stringify(ctx.session.user))
            });
        } else {
            await ctx.redirect('back');
            return;
        }
    },
    'POST /posts/:postId/edit': async(ctx, next) => {
        const data = JSON.parse(JSON.stringify(ctx.request.fields));
        const { title, content } = data;
        const id = ctx.params.postId;
        const post = await PostModel.getAuthorIdByPostId(id);
        console.log(ctx.session.user.id, post[0].author_id);
        if (ctx.session.user.id ===  post[0].author_id) {
            const result = await PostModel.editPost(id, { title, content });
            if (result.changedRows > 0) {
                await ctx.redirect(`/posts/${id}`);
                return;
            } else {
                ctx.state.error = '操作失败';
                await ctx.redirect('back');
            }
        } else {
            ctx.state.error = '无权限操作';
            await ctx.redirect('back');
        }

    },
    'GET /posts/:postId/remove': async(ctx, next) => {
        const postId = ctx.params.postId;
        const result = await PostModel.deletePost(postId);
        if (result.affectedRows > 0) {
            await ctx.redirect('/posts');
            return;
        } else {
            ctx.redirect('back');
            return;
        }
    },
    'GET /posts/:id': async(ctx, next) => {
        const id = ctx.params.id;
        const result = await PostModel.getPostById(id);
        if (result && result.length>0) {
            const { id, title, content, pv, create_time, author_id, user_name, gender, description, avatar } = result[0];
            const post = {
                id,
                author: {
                    id: author_id,
                    user_name,
                    gender,
                    description,
                    avatar
                },
                title,
                pv,
                content,
                create_time,
                commentsCount: 0
            }
            await ctx.render('post', {
                post,
                user: JSON.parse(JSON.stringify(ctx.session.user))
            });
        } else {
            await ctx.redirect('back');
            return;
        }
    }
}