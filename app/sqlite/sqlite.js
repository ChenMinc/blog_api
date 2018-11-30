'use strict';

const Service = require('egg').Service;
// const Sequelize = require('sequelize');
class SqliteService extends Service {
  async base() {
    const {
      app,
    } = this;
    // get,run,all
    const table = await app.db.all('SELECT username FROM user where username = ?', 'cmc').catch(function(err) {
      console.log('失败：' + err);
    });
    console.log('22222222', table);
  }
}

module.exports = SqliteService;
