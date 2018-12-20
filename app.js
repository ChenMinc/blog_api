'use strict';

module.exports = app => {
  require('./lib/sqliteSequelize')(app);
};
