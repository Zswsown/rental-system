'use strict'
const Controller = require('../core/base_controller')
class UserController extends Controller {
  // 注册
  async register () {
    const { ctx } = this
    const { code, password, role, tel } = ctx.request.body
    if (role === "guser") {
      ctx.body = await ctx.service.guser.register({ code, password, role, tel })
    }
    else if (role === "buser") {
      ctx.body = await ctx.service.buser.register({ code, password, role, tel })
    }
  }
  // 登录
  async login () {
    const { ctx } = this
    const { code, password, role } = ctx.request.body
    if (role === "guser") {
      const data = await ctx.service.guser.login({ code, password, role })
      if (data.token != null) {
        ctx.body = data.user
        ctx.cookies.set('rental_system_token', data.token, { maxAge: 1000 * 3600 * 24 * 7 })//默认token有效时长为7天,7*24*60*60
      }
      else {
        ctx.body = data.user
      }
    }
    else if (role === "buser") {
      ctx.body = await ctx.service.buser.login({ code, password, role })
    }
  }
}
module.exports = UserController

