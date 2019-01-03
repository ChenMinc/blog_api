'use strict';

const [ PAGE, PAGESIZE ] = [ 1, 10 ]; // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, BIGINT } = app.Sequelize;
  const Tag = app.model.define('tag', {
    tagId: { type: INTEGER, primaryKey: true }, // 标签id
    title: { type: STRING }, // 标签名
    status: { type: STRING, allowNull: false, defaultValue: '0' }, // 文章状态 0 未上线 1 上线中
    quantity: { type: BIGINT, allowNull: false, defaultValue: 0 }, // 阅读人数
  });

  // Article.sync({ force: true });
  // Article.sync({ force: true }).then(() => {
  //   return Article.create({
  //     title: '标签1',
  //     quantity: 20,
  //   });
  // });

  // 查询列表
  Tag.getList = function({ params, page, pageSize }) {
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
  Tag.getArticleByArgs = function(params, exclude) {
    return this.findOne({
      where: params,
      attributes: {
        exclude: exclude.split(','),
      },
    });
  };

  // 插入一条文章记录
  Tag.createArticle = function(params) {
    return this.create(params);
  };

  // 更新/插入一条记录
  Tag.upsertArticle = function(params) {
    return this.upsert(params);
  };

  // 更新一条文章记录 返回修改个数 [num]
  Tag.updateArticle = function(params, exclude) {
    const option = {
      where: exclude || {},
    };
    return this.update(params, option);
  };

  // 记录上次登录时间
  // User.prototype.login = async function() {
  //   await this.update({ lastSignInAt: new Date() });
  // };

  return Tag;
};
