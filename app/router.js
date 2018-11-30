'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.v1.home.index);
  router.post('/api/v1/users/login', controller.v1.users.login);
  router.post('/api/v1/users/loginOut', controller.v1.users.loginOut);
  // router.get('/api/v1/users/login', controller.v1.user.login);
};
