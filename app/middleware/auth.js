'use strict';

// 授权拦截中间件
module.exports = () => {
  return async function auth(ctx, next) {
    await next();
    // 没有传token，直接返回错误
    if (ctx.request.url !== '/api/v1/users/login') {
      const token = ctx.header.authorization;
      if (!token) {
        ctx.body = {
          code: 401,
          message: 'Unauthorized request: no authentication given',
        };
        return;
      }
      const getSaveToken = await ctx.model.AccessToken.getAccessToken(token);
      if (!getSaveToken) {
        ctx.body = {
          code: 401,
          message: 'Unauthorized request: authentication token wrong',
        };
        return;
      }
      if (getSaveToken.accessTokenExpiresAt.getTime() < new Date().getTime()) {
        ctx.body = {
          code: 401,
          message: 'Unauthorized request: authentication token expired',
        };
        return;
      }
    }
  };
};
