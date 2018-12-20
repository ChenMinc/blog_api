'use strict';

const Controller = require('egg').Controller;
const users_rules = require('./rules/users_rules');
class UserController extends Controller {
  async login() {
    const {
      ctx,
    } = this;

    // validate 验证密码
    ctx.validate(users_rules.loginRule);
    const { email, password } = ctx.request.body;

    // 查询用户列表
    const user = await ctx.model.User.getUserByArgs({ email }, '');
    if (!user) {
      ctx.throw(404, 'email not found');
    }

    // 对比hash密码 ctx.genHash(password)
    if (!(ctx.compare(password, user.hashedPassword))) {
      ctx.throw(404, 'password wrong');
    }
    delete user.dataValues.hashedPassword;

    const resToken = ctx.service.auth.sign(user);
    ctx.body = { code: 0, message: 'success', data: { user, token: resToken } };
  }

  // 暂没用上
  async loginOut() {
    const {
      ctx,
    } = this;
    ctx.body = { code: 0, message: 'login out' };
  }
}

module.exports = UserController;
