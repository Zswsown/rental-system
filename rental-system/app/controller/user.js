'use strict';
const Controller = require('../core/base_controller');
class UserController extends Controller {
  // 注册
  async register () {
    const { ctx } = this;
    const { code, password, role, tel } = ctx.request.body;
    if (role === "guser") {
      ctx.body = await ctx.service.guser.register({ code, password, role, tel });
    }
    else if (role === "buser") {
      ctx.body = await ctx.service.buser.register({ code, password, role, tel });
    }
  }
  // 登录
  async login () {
    const { ctx } = this;
    const { code, password, role } = ctx.request.body;
    if (role === "guser") {
      ctx.body = await ctx.service.guser.login({ code, password, role });
    }
    else if (role === "buser") {
      ctx.body = await ctx.service.buser.login({ code, password, role });
    }
  }
}
module.exports = UserController;

