'use strict';

const Service = require('egg').Service;

class ArticlesService extends Service {
  async update() {
    const { ctx } = this;
    const data = { title: '1一月一号要做啥', content: '定计划定计划dd' };
    const { title, content } = data;
    if (data.articleId) {
      const { articleId } = data;
      console.log({ title, content }, { articleId }, '22222222222222222222222222222222222222222222222222222');
      const res = await ctx.model.Article.updateArticle({ title, content }, { articleId });
      console.log(res, '22222222222222222222222222222222222222222222222222222');
      ctx.body = { code: 0, message: 'update success', data: { articleAmount: res[0] } };
    } else {
      try {
        const res = await ctx.model.Article.insertArticle(data);
        console.log(res, '11111111111111111111111111111111111111111111111111111');
        console.log(res.null, '111111111111111111111111111111111111');
        ctx.body = { code: 0, message: 'insert success', data: { articleId: res.null } };
      } catch (e) {
        const res = await ctx.model.Article.upsertArticle(data);
        console.log(res, '555555555555555555555555555555555555555555555555555');
        ctx.body = { code: 0, message: 'upsert success' };
      }
    }
    // const res = await ctx.model.Article.updateArticle(data, { articleId });
    // ctx.body = { code: 0, message: 'success', data: articles };
  }
}

module.exports = ArticlesService;
