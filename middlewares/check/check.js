module.exports = () => {
	return async (ctx, next) => {
		if (ctx.path === '/signin' || ctx.path === '/signup') {
			if (ctx.session.user.id) {
				await ctx.redirect('/');
                return;
			}
		} else {
			if (!ctx.session.user.id) {
				await ctx.redirect('/signin');
				return;
			}
		}
		await next();
	}
}