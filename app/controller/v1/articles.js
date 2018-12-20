'use strict';

const Controller = require('egg').Controller;

class ArticlesController extends Controller {
  // get /articles
  async index() {
    const { ctx } = this;
    const articles = await ctx.model.Article.getList(ctx.request.query);
    ctx.body = { code: 0, message: 'success', data: articles };
  }
}

module.exports = ArticlesController;
