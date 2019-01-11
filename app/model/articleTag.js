'use strict';

module.exports = app => {
  const { BIGINT } = app.Sequelize;
  const ArticleTag = app.model.define('article_tag', {
    articleId: { type: BIGINT, allowNull: false }, // 文章id
    tagId: { type: BIGINT, allowNull: false }, // 标签id
  });

  // ArticleTag.sync({ force: true });
  // ArticleTag.sync({ force: true }).then(() => {
  //   return ArticleTag.create({
  //     articleId: 1,
  //     tagId: 2,
  //   });
  // });

  // 查询列表
  ArticleTag.getList = function(params) {
    return this.findAll({
      where: params,
      order: [
        [ 'createdAt' ],
      ],
    });
  };

  // 删除记录
  ArticleTag.deleteInstances = function(params) {
    return this.destroy({
      where: params,
    });
  };

  // 批量插入数据
  ArticleTag.addInstances = function(arr) {
    return this.bulkCreate(arr);
  };

  return ArticleTag;
};
