'use strict';

const Service = require('egg').Service;
const users_rules = require('./rules/users_rules');

class UserService extends Service {

  async login() {
    const {
      ctx,
      app,
    } = this;

    // validate 验证密码
    ctx.validate(users_rules.loginRule);
    const { email, password } = ctx.request.body;

    // 查询用户列表
    const select = await app.db.all('SELECT password, username FROM user where email = ?', email).catch(function(err) {
      console.log('失败：' + err);
    });
    if (select.length === 0) {
      ctx.throw(404, 'email not found');
    }

    // 对比hash密码
    const checked = await ctx.compare(password, select[0].password);
    console.log('11111', select[0]);
    if (checked) {
      const resToken = ctx.service.auth.sign(select[0]);
      ctx.body = { code: 0, message: 'success', data: { user: select[0].username, token: resToken } };
    } else {
      ctx.throw(404, 'password wrong')
    }
  }

  loginOut() {
    const {
      ctx,
    } = this;
    // 删除session
    delete ctx.session.userId;
    ctx.body = { code: 0, message: 'login out' };
  }
}

module.exports = UserService;
