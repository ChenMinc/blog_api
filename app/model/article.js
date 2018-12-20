'use strict';

const [ PAGE, PAGESIZE ] = [ 1, 10 ]; // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, TEXT, BIGINT } = app.Sequelize;
  const Article = app.model.define('article', {
    articleId: { type: INTEGER, primaryKey: true }, // 文章id
    title: { type: STRING }, // 文章名
    content: { type: TEXT, unique: true, allowNull: false }, // 文章内容
    status: { type: STRING, allowNull: false, defaultValue: '0' }, // 文章状态 0 未上线 1 上线中
    quantity: { type: BIGINT, allowNull: false, defaultValue: 0 }, // 阅读人数
  });

  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每日一记',
      content: '我要来这里看看看如何吧，我要来这里看看看如何吧，我要来这里看看看如何吧',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每2',
      content: '我要来看看如何吧2s',
      quantity: 20,
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '112233',
      content: '56879846138789',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每日一记2',
      content: '我要来这里看看看s如何吧，我要来这里看看看如何吧，我要来这里看看看如何吧',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每3',
      content: '我要来看看如何吧s2',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '123123',
      content: '56879846138789s',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每日一记ewe2',
      content: '我要来这里看看看s如何吧，我rer要来这里看看看如何吧，我要来这里看看看如何吧',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每3rewr',
      content: '我要来看看如何吧s2erer',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: 'rewr',
      content: '56879846138rwerwerwr789s',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每日一记6t456ewe2',
      content: '我要来这里看看看s如何吧，我rer要来这里978978看看看如何吧，我要来这里看看看如何吧',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: '每3re76867wr',
      content: '我要来看看如何吧s28678erer',
    });
  });
  Article.sync({ force: true }).then(() => {
    return Article.create({
      title: 're76867wr',
      content: '56879846137686788rwerwerwr789s',
    });
  });


  // 获取文章列表
  Article.getArticleList = function() {
    return this.findAll();
  };

  // 查询列表
  Article.getList = function({ params, page, pageSize }) {
    page = page || PAGE;
    pageSize = pageSize || PAGESIZE;
    params = params || '';
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

  // 记录上次登录时间
  // User.prototype.login = async function() {
  //   await this.update({ lastSignInAt: new Date() });
  // };

  return Article;
};
