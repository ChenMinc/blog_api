'use strict';

module.exports = options => {
  const ignore = [ '/api/v1/users/login' ];

  return async function access(ctx, next) {
    let flag = false;
    for (let i in ignore) {
      if (ctx.path == ignore[i]) {
        flag = true;
        break;
      }
    }

    if (flag != true) {
      await next();
    } else {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Methods', '*');
      ctx.set('Access-Control-Allow-Headers', '*');
      if (ctx.method != 'OPTIONS') {
        await next();
      } else {
        ctx.status = 200;
      }
    }
  };
};
