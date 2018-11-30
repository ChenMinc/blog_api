'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class AuthService extends Service {
  sign(user) {
    const userToken = {
      id: user.id,
    };
    const token = jwt.sign(userToken, this.app.config.keys, { expiresIn: '7d' });
    return token;
  }
}

module.exports = AuthService;
