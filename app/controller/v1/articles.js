'use strict';

const Controller = require('egg').Controller;

class ArticlesController extends Controller {
  // get /articles
  async index() {
    const { ctx } = this;
    const articles = await ctx.model.Article.getList(ctx.request.query);
    ctx.body = { code: 0, message: 'success', data: articles };
  }

  // post /articles/update
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (data.status) {
      data.status = data.status === '' ? '0' : data.status;
    }
    if (data.articleId) {
      const { articleId } = data;
      delete data[articleId];
      const res = await ctx.model.Article.updateArticle(data, { articleId });
      if (res[0] === 0) {
        const res = await ctx.model.Article.createArticle(data);
        ctx.body = { code: 0, message: 'create success', data: { articleId: res.null } };
      } else {
        ctx.body = { code: 0, message: 'update success', data: { articleAmount: res[0] } };
      }
    } else {
      try {
        const res = await ctx.model.Article.createArticle(data);
        ctx.body = { code: 0, message: 'create success', data: { articleId: res.null } };
      } catch (e) {
        await ctx.model.Article.upsertArticle(data);
        ctx.body = { code: 0, message: 'upsert success' };
      }
    }
  }
}

module.exports = ArticlesController;
