'use strict';
const Service = require('egg').Service;
const guser = require("../db/guser")
class GUserService extends Service {
  async register ({ code, password, role, tel }) {
    const user = await guser.insertGuser({ code, password, role, tel })
    return user;
  }
  async login ({ code, password, role }) {
    const user = await guser.selectGUser({ code, password, role })
    return user;
  }
}
module.exports = GUserService;
