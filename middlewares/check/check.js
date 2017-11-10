module.exports = () => {
	return async (ctx, next) => {
		console.log(ctx.request.path);
		if (ctx.request.path !== '/signin') {
			if (!ctx.session.name) {
                ctx.redirect('/signin');
			}
		} else {
			if (ctx.session.name) {
				ctx.redirect('back');
			}
		}
		await next();
	}
}