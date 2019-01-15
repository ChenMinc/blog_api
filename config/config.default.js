'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542622467450_2820';

  config.middleware = [ 'auth' ];

  // egg-sqlite
  config.sqlite3 = {
    database: 'blog.db',
  };

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // egg-bcrypt 密码hash
  config.bcrypt = {
    saltRounds: 10, // default 10
  };

  return config;
};
