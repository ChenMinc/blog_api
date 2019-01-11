'use strict';

const [ PAGE, PAGESIZE ] = [ 1, 10 ]; // 当前页，页大小默认值
module.exports = app => {
  const { STRING, INTEGER, Op } = app.Sequelize;
  const Tag = app.model.define('tag', {
    tagId: { type: INTEGER, primaryKey: true }, // 标签id
    tagName: { type: STRING, unique: true }, // 标签名
    status: { type: STRING, allowNull: false, defaultValue: '1' }, // 标签状态 0 未上线 1 上线中
  });

  // Tag.sync({ force: true });
  // Tag.sync({ force: true }).then(() => {
  //   return Tag.create({
  //     tagName: '标签1',
  //     status: '1',
  //   });
  // });

  // 查询列表
  Tag.getList = function({ keyword, page, pageSize }) {
    page = page || PAGE;
    pageSize = pageSize || PAGESIZE;
    const params = keyword ? { tagname: { [Op.like]: '%' + keyword + '%' } } : '';
    return this.findAndCountAll({
      where: params,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [
        [ 'createdAt' ],
      ],
    });
  };

  // 获取所有
  Tag.getAll = function() {
    return this.findAll({
      order: [
        [ 'createdAt' ],
      ],
    });
  };

  // 查询一条记录
  Tag.getTagByArgs = function(params) {
    return this.findOne({
      where: params,
    });
  };

  // 插入一条记录
  Tag.createTag = function(params) {
    return this.create(params);
  };

  // 更新/插入一条记录
  Tag.upsertTag = function(params) {
    return this.upsert(params);
  };

  // 更新一条文章记录 返回修改个数 [num]
  Tag.updateTag = function(params, exclude) {
    const option = {
      where: exclude || {},
    };
    return this.update(params, option);
  };

  // 删除记录
  Tag.deleteInstances = function(params) {
    return this.destroy({
      where: params,
    });
  };

  return Tag;
};
