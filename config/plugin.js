'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sqlite3',
};

exports.static = {
  enable: true,
  prefix: '/public/',
  dir: './app/public/',
  package: 'egg-static',
};

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};
