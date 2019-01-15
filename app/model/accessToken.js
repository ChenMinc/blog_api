'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const AccessToken = app.model.define('accessToken', {
    accessToken: { type: STRING, unique: true },
    accessTokenExpiresAt: DATE,
    userId: { type: STRING, allowNull: false },
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true,
  });

  // AccessToken.sync({ force: true });

  AccessToken.getAccessToken = function(bearerToken) {
    return this.findOne({
      where: { accessToken: bearerToken },
    });
  };

  AccessToken.saveAccessToken = async function(token, user) {
    await this.create({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      userId: user.userId,
    });
  };

  return AccessToken;
};
