'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world!';
    const res = await this.ctx.service.articles.searchTag(1);
    console.log(res, '000000000000000000000000000000');
  }
}

module.exports = HomeController;
