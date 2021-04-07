'use strict'
const Controller = require('../core/base_controller')
class BUserController extends Controller {
  async register () {
    const { ctx } = this
    const { code, password, role, tel } = ctx.request.body
    const user = await ctx.service.buser.register({ code, password, role, tel })
    ctx.body = user
  }
  async login () {
    const { ctx } = this
    const { code, password, role } = ctx.request.body
    const user = await ctx.service.buser.login({ code, password, role })
    ctx.body = user
  }
  async publishHouse () {
    const { ctx } = this
    ctx.body = ctx.request.body
  }
}
module.exports = BUserController

