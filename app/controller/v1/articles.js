'use strict';

const Controller = require('egg').Controller;

class ArticlesController extends Controller {
  // get /articles
  async index() {
    const { ctx } = this;
    const { tag } = ctx.request.query;
    const articles = await ctx.model.Article.getList(ctx.request.query);
    const { count } = articles;
    const selectedArticles = [];
    for (let i = 0; i < articles.rows.length; i++) {
      const item = articles.rows[i];
      const tagRes = await this.ctx.service.articles.searchTag(item.articleId, tag);
      if (tagRes) {
        item.dataValues.tags = tagRes;
        selectedArticles.push(item);
      }
    }
    ctx.body = { code: 0, message: 'success', data: { count, rows: selectedArticles } };
  }

  // post /articles
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;

    if (!data.title.trim()) {
      ctx.body = { code: 1, message: 'empty title' };
      return;
    }
    if (!data.content.trim()) {
      ctx.body = { code: 1, message: 'empty content' };
      return;
    }

    // 插入articles表
    data.status = data.status === '' ? '0' : data.status;
    const { title, content, status, tags } = data;
    let articleId = null;
    try {
      const res = await ctx.model.Article.createArticle({ title, content, status });
      articleId = res.null;
      // 修改article_tags表
      const newArr = [];
      for (const i in tags) {
        newArr.push({ articleId, tagId: tags[i].tagId });
      }
      await ctx.model.ArticleTag.addInstances(newArr);
      ctx.body = { code: 0, message: 'create success', data: { articleId } };
    } catch (e) {
      ctx.body = { code: 4, message: 'same as the title of other articles' };
    }
  }

  // put /articles/:id
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;

    if (!data.title.trim()) {
      ctx.body = { code: 1, message: 'empty title' };
      return;
    }
    if (!data.content.trim()) {
      ctx.body = { code: 1, message: 'empty content' };
      return;
    }

    // articleId选定
    let { articleId } = data;
    if (!articleId) {
      const url = ctx.request.url;
      articleId = Number(url.slice(url.lastIndexOf('/') + 1));
    }
    if (!articleId) {
      ctx.body = { code: 1, message: 'miss id of article' };
      return;
    }

    data.status = data.status === '' ? '0' : data.status;
    const { title, content, status, tags } = data;
    const res = await ctx.model.Article.updateArticle({ title, content, status }, { articleId });
    if (res[0] === 0) {
      ctx.body = { code: 4, message: 'update failure' };
    } else {
      // 修改article_tags表
      const searchTag = await ctx.service.articles.searchTag(articleId);
      if (JSON.stringify(searchTag) !== JSON.stringify(tags)) {
        await ctx.model.ArticleTag.deleteInstances({ articleId });
        const newArr = [];
        for (const i in tags) {
          newArr.push({ articleId, tagId: tags[i].tagId });
        }
        await ctx.model.ArticleTag.addInstances(newArr);
      }
      ctx.body = { code: 0, message: 'update success', data: { articleAmount: res[0] } };
    }
  }

  // delete /articles/:id
  async destroy() {
    const { ctx } = this;
    const url = ctx.request.url;
    const articleId = Number(url.slice(url.lastIndexOf('/') + 1));
    const res = await ctx.model.Article.deleteInstances({ articleId });
    ctx.body = { code: 0, message: 'delete success', data: res };
  }

}

module.exports = ArticlesController;
