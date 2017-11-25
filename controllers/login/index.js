const LoginModel = require('../../models/login.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    'GET /': async (ctx, next) => {

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
        await ctx.render('signup');
    },
    'POST /signup': async (ctx, next) => {
        const data = JSON.parse(JSON.stringify(ctx.request.fields));
        const avatarFile = data.avatar[0];
        const {name: user_name, password: pwd, gender, bio: description, repassword} = data;
        try {
            if (user_name.length<1 || user_name.length>10) {
                throw new Error('名字请限制在 1-10 个字符');
            }
            if (['m', 'f', 'x'].indexOf(gender) === -1) {
                throw new Error('名字请限制在 1-10 个字符');
            }
            if (!(description.length >=1 && description.length<=30)) {
                throw new Error('个人简介限制在1-30个字符');
            }
            if (!avatarFile.name) {
                throw new Error('缺少头像');
            }
            if (pwd.length < 6) {
                throw new Error('密码至少 6 个字符');
            }
            if (pwd !== repassword) {
                throw new Error('两次输入密码不一致');
            }
        } catch (e) {
            ctx.state.error = e.message;
            return ctx.render('signup');
        }

        const destFile = path.join('public/upload/image', 'avtar'+(new Date())*1 + path.extname(avatarFile.name));
        const srcFile = avatarFile.path;
        const ws = fs.createWriteStream(destFile);
        fs.createReadStream(srcFile).pipe(ws);
        const dataObj = {
            user_name,
            pwd,
            gender,
            description,
            avatar: 'upload/image/avatar' + '-' + (new Date()*1) + path.extname(avatarFile.name)
        };
        const isCreateSuccess = await LoginModel.createUser(dataObj);
        if (isCreateSuccess) {
            return ctx.redirect('/signin');
        } else {
            ctx.state.error = '注册失败';
            return ctx.render('signup');
        }
    }
};