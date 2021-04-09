'use strict'
const Service = require('egg').Service
const guser = require("../db/guser")
const jwt = require('jsonwebtoken') //引入jsonwebtoken
const { JWT_CONFIG } = require('../public/jwt') // jwt加密秘钥
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
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + JWT_CONFIG.EXP,
        guserId: user.data.id,
        role: 'guser'
      }, JWT_CONFIG.SECRET_KEY)
      return {
        token: token,
        user: user
      }
    }
    return { user }
  }
  async getGuserInfo (id) {
    const user = await guser.selectGUserById(id)
    return { user }
  }
}
module.exports = GUserService
