'use strict'
const Service = require('egg').Service
const guser = require("../db/guser")
const { JWT_SECRET_KEY } = require('../public/jwt') // jwt加密秘钥
class GUserService extends Service {
  async register ({ code, password, role, tel }) {
    const user = await guser.selectGUser({ code, password, role })
    if (user.code === 5003) {
      const insertUser = await guser.insertGUser({ code, password, role, tel })
      return insertUser
    }
    return user
  }
  async login ({ code, password, role }) {
    const { app } = this
    const user = await guser.selectGUser({ code, password, role })
    if (user.code === 200) {
      const token = app.jwt.sign({
        guserId: user.data.id
      }, JWT_SECRET_KEY)
      return {
        token: token,
        user: user
      }
    }
    return { user }
  }
}
module.exports = GUserService
