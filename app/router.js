'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.v1.home.index);
  router.post('/api/v1/users/login', controller.v1.users.login);
  router.post('/api/v1/users/loginOut', controller.v1.users.loginOut);
  router.resources('article', '/api/v1/articles', controller.v1.articles);
  router.resources('tag', '/api/v1/tags', controller.v1.tags);
};
