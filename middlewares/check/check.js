module.exports = () => {
	return async (ctx, next) => {
		console.log(ctx.request.path);
		if (ctx.request.path !== '/signin') {
			if (!ctx.session.user) {
                ctx.redirect('/signin');
			}
		} else {
			if (ctx.session.user) {
				ctx.redirect('back');
			}
		}
		await next();
	}
}