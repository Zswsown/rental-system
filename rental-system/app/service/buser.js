'use strict'
const Service = require('egg').Service
const buser = require("../db/buser")
const jwt = require('jsonwebtoken') //引入jsonwebtoken
const { JWT_CONFIG } = require('../public/jwt') // jwt加密秘钥
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
    const user = await buser.selectBUser({ code, password, role })
    if (user.code === 200) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + JWT_CONFIG.EXP,
        buserId: user.data.id,
        role: 'buser'
      }, JWT_CONFIG.SECRET_KEY)
      return {
        token: token,
        user: user
      }
    }
    return { user }
  }
  async getBuserInfo (id) {
    const user = await buser.selectBUserById(id)
    return { user }
  }
  async updateBUser ({ id, nickname, tel, email, sex }) {
    const user = await buser.updateBUser({ id, nickname, tel, email, sex })
    return user
  }
}

module.exports = BUserService
