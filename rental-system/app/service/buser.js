'use strict'
const Service = require('egg').Service
const buser = require("../db/buser")
const { JWT_SECRET_KEY } = require('../public/jwt') // jwt加密秘钥
class BUserService extends Service {
  async register ({ code, password, role, tel }) {
    const user = await buser.selectBUser({ code, password, role })
    if (user.code === 5003) {
      const insertUser = await buser.insertBUser({ code, password, role, tel })
      return insertUser
    }
    return user
  }
  async login ({ code, password, role }) {
    const { app } = this
    const user = await buser.selectBUser({ code, password, role })
    if (user.code === 200) {
      const token = app.jwt.sign({
        buserId: user.data.id
      }, JWT_SECRET_KEY)
      return {
        token: token,
        user: user
      }
    }
    return { user }
  }
}



module.exports = BUserService
