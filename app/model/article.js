'use strict';

const [ PAGE, PAGESIZE ] = [ 1, 10 ]; // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, TEXT, BIGINT, Op } = app.Sequelize;
  const Article = app.model.define('article', {
    articleId: { type: INTEGER, primaryKey: true }, // 文章ID
    title: { type: STRING, unique: true }, // 文章名
    content: { type: TEXT, allowNull: false }, // 文章内容
    status: { type: STRING, allowNull: false, defaultValue: '0' }, // 文章状态 0 未上线 1 上线中
    quantity: { type: BIGINT, allowNull: false, defaultValue: 0 }, // 阅读人数
  });

  // Article.sync({ force: true });
  // Article.create({
  //   title: '每12errt31232',
  //   content: '我要来ryty看34545看如何吧2s',
  //   quantity: 20,
  // });

  // 获取文章列表
  Article.getArticleList = function() {
    return this.findAll();
  };

  // 查询列表
  Article.getList = function({ keyword, page, pageSize }) {
    page = page || PAGE;
    pageSize = pageSize || PAGESIZE;
    const params = keyword ? { title: { [Op.like]: '%' + keyword + '%' } } : '';
    return this.findAndCountAll({
      where: params,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [
        [ 'createdAt' ],
      ],
    });
  };

  // 根据参数获取文章
  Article.getArticleByArgs = function(params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(','),
      },
    });
  };

  // 插入一条文章记录
  Article.createArticle = function(params) {
    return this.create(params);
  };

  // 更新/插入一条记录
  Article.upsertArticle = function(params) {
    return this.upsert(params);
  };

  // 更新一条文章记录 返回修改个数 [num]
  Article.updateArticle = function(params, exclude) {
    const option = {
      where: exclude || {},
    };
    return this.update(params, option);
  };

  // 删除记录
  Article.deleteInstances = function(params) {
    return this.destroy({
      where: params,
    });
  };

  return Article;
};
