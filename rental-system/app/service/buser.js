'use strict'
const Service = require('egg').Service
const buser = require("../db/buser")
class BUserService extends Service {
  async register ({ code, password, role, tel }) {
    const user = await buser.selectBUser({ code, password, role })
    if (user.error) {
      const insertUser = await buser.insertBUser({ code, password, role, tel })
      return insertUser
    }
    return user
  }
  async login ({ code, password, role }) {
    const user = await buser.selectBUser({ code, password, role })
    return user
  }
}
module.exports = BUserService
