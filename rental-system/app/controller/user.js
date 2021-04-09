'use strict'
const Controller = require('../core/base_controller')
const { TOKEN_CONFIG } = require('../public/jwt')
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
    let data = {}
    if (role === "guser") {
      data = await ctx.service.guser.login({ code, password, role })
    }
    else if (role === "buser") {
      data = await ctx.service.buser.login({ code, password, role })
    }
    // 若登录成功，则将token注入cookie中返回给前端
    if (data.token != null) {
      // 设置cookie
      ctx.cookies.set('rental_system_token', data.token, {
        httpOnly: TOKEN_CONFIG.HTTP_ONLY,
        secure: TOKEN_CONFIG.SECURE,
        expires: new Date(new Date().getTime() + 8 * 60 * 60 * 1000 + TOKEN_CONFIG.EXPIRES),
        // SameSite: TOKEN_CONFIG.SAMESITE
      })
      // 设置请求头 跨域
      ctx.set("Access-Control-Allow-Origin", ctx.header.origin)
      ctx.set("Access-Control-Allow-Credentials", true)
      ctx.body = data.user
    }
    else {
      ctx.body = data.user
    }
  }
  // 获取用户信息
  async getUserInfo () {
    const { ctx } = this
    const res = ctx.helper.getUserInfo()
    if (res.data != null) {
      if (res.data.role == 'guser') {
        ctx.body = await ctx.service.guser.getGuserInfo(res.data.guserId)
      }
      else if (res.data.role == 'buser') {
        ctx.body = await ctx.service.buser.getBuserInfo(res.data.buserId)
      }
    }
    else {
      ctx.body = { msg: '用户未登录', code: 50011, data: null }
    }
  }


}
module.exports = UserController

