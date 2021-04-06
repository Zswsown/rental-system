'use strict';
const Controller = require('../core/base_controller');
class GUserController extends Controller {
  async register () {
    const { ctx } = this;
    const { code, password, role, tel } = ctx.request.body;
    const user = await ctx.service.guser.register({ code, password, role, tel });
    ctx.body = user;
  }
  async login () {
    const { ctx } = this;
    const { code, password, role } = ctx.request.body;
    const user = await ctx.service.guser.login({ code, password, role });
    ctx.body = user;
  }
}
module.exports = GUserController;

