'use strict'
const Service = require('egg').Service
const guser = require("../db/guser")
class GUserService extends Service {
  async register ({ code, password, role, tel }) {
    const user = await guser.selectGUser({ code, password, role })
    if (user.error) {
      const insertUser = await guser.insertGUser({ code, password, role, tel })
      return insertUser
    }
    return user
  }
  async login ({ code, password, role }) {
    const user = await guser.selectGUser({ code, password, role })
    return user
  }
}
module.exports = GUserService
