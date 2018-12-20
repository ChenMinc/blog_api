'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    userId: { type: INTEGER, primaryKey: true }, // 用户id
    userName: { type: STRING(30), unique: true, allowNull: false }, // 用户名
    email: { type: STRING, unique: true, allowNull: false }, // 邮箱
    hashedPassword: STRING, // hashed密码
  });

  // User.sync({ force: true }).then(() => {
  //   // Table created
  //   return User.create({
  //     userName: 'cmc',
  //     email: 'sky_cmc@163.com',
  //     hashedPassword: '$2a$10$pSDqUErayX2lMQw3MwkbEO7ud4SzCjOvfh5kfD/gmzZjqFX6RnHe2',
  //   });
  // });

  // 根据参数获取用户
  User.getUserByArgs = function(params) {
    return this.findOne({
      where: params,
      // attributes: {
      //   exclude: exclude.split(','),
      // },
    });
  };

  // 记录上次登录时间
  // User.prototype.login = async function() {
  //   await this.update({ lastSignInAt: new Date() });
  // };

  return User;
};
