const LoginModel = require('../../models/login.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    'GET /': async (ctx, next) => {
        await ctx.render('signup');
    },
    'GET /signin': async (ctx, next) => {
        // ctx.session.user = "wangjing";
        // ctx.response.body = "signin success";
    },
    'POST /signin': async (ctx, next) => {

    },
    'GET /signout': async (ctx, next) => {

    },
    'GET /signup': async (ctx, next) => {

    },
    'POST /signup': async (ctx, next) => {
        const data = JSON.parse(JSON.stringify(ctx.request.fields));
        const avatarFile = data.avatar[0];
        const destFile = path.join('public/upload/image', 'avtar'+(new Date())*1 + path.extname(avatarFile.name));
        const srcFile = avatarFile.path;
        const ws = fs.createWriteStream(destFile);
        fs.createReadStream(srcFile).pipe(ws);
        const dataObj = {
            user_name: data.name,
            pwd: data.password,
            gender: data.gender,
            description: data.bio,
            avatar: 'upload/image/avatar' + '-' + (new Date()*1) + path.extname(avatarFile.name)
        };
        const isCreateSuccess = LoginModel.createUser(dataObj);

        if (isCreateSuccess) {
            ctx.body = "create sucess";
        } else {
            ctx.body = "create failed";
        }
    }
};