'use strict';

const Service = require('egg').Service;

class ArticlesService extends Service {
  async searchTag(articleId, selectTagId) {
    const { ctx } = this;
    const res = await ctx.model.ArticleTag.getList({ articleId });
    const TagArr = [];
    let isSelected = 0;
    if (res.length > 0) {
      for (let i = 0; i < res.length; i++) {
        const tag = await ctx.model.Tag.getTagByArgs({ tagId: res[i].tagId });
        TagArr.push({ tagId: tag.tagId, tagName: tag.tagName });
        if (selectTagId && Number(selectTagId) === res[i].tagId) {
          isSelected++;
        }
      }
    }
    if (!selectTagId || isSelected === 1) {
      return TagArr;
    }
    return false;
  }
}

module.exports = ArticlesService;
