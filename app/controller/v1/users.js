'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    await this.ctx.service.user.login();
  }
  async loginOut() {
    await this.ctx.service.user.loginOut();
  }
}

module.exports = UserController;
