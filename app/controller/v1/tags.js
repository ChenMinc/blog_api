'use strict';

const Controller = require('egg').Controller;

class TagsController extends Controller {
  // get /tags
  async index() {
    const { ctx } = this;
    const articles = await ctx.model.Tag.getList(ctx.request.query);
    ctx.body = { code: 0, message: 'success', data: articles };
  }

  // get /tags/all
  async show() {
    const { ctx } = this;
    const articles = await ctx.model.Tag.getAll(ctx.request.query);
    ctx.body = { code: 0, message: 'success', data: articles };
  }

  // post /tags
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;

    if (!data.tagName.trim()) {
      ctx.body = { code: 1, message: 'empty tagName' };
      return;
    }

    data.status = data.status === '' ? '0' : data.status;
    const { tagName, status } = data;
    try {
      const res = await ctx.model.Tag.createTag({ tagName, status });
      const tagId = res.null;
      ctx.body = { code: 0, message: 'create success', data: { tagId } };
    } catch (e) {
      ctx.body = { code: 4, message: 'same as the name of other tags' };
    }
  }

  // put /tag/:id
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;

    if (!data.tagName.trim()) {
      ctx.body = { code: 1, message: 'empty tagName' };
      return;
    }

    // tagId选定
    let { tagId } = data;
    if (!tagId) {
      const url = ctx.request.url;
      tagId = Number(url.slice(url.lastIndexOf('/') + 1));
    }
    if (!tagId) {
      ctx.body = { code: 1, message: 'miss id of tag' };
      return;
    }

    data.status = data.status === '' ? '0' : data.status;
    const { tagName, status } = data;
    const res = await ctx.model.Tag.updateTag({ tagName, status }, { tagId });
    if (res[0] === 0) {
      ctx.body = { code: 4, message: 'update failure' };
    } else {
      ctx.body = { code: 0, message: 'update success', data: { TagAmount: res[0] } };
    }
  }

  // delete /tags
  async destroy() {
    const { ctx } = this;
    const url = ctx.request.url;
    const tagId = Number(url.slice(url.lastIndexOf('/') + 1));
    await ctx.model.ArticleTag.deleteInstances({ tagId });
    const res = await ctx.model.Tag.deleteInstances({ tagId });
    ctx.body = { code: 0, message: 'delete success', data: res };
  }
}

module.exports = TagsController;
