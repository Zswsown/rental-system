'use strict'
const Controller = require('../core/base_controller')
class BUserController extends Controller {
  async updateBUser () {
    const { ctx } = this
    const { id, nickname, tel, email, sex } = ctx.request.body
    const user = await ctx.service.buser.updateBUser({ id, nickname, tel, email, sex })
    ctx.body = user
  }
  async selectAllBUser () {
    const { ctx } = this
    const user = await ctx.service.buser.selectAllBUser()
    ctx.body = user
  }
  async updateBUserById () {
    const { ctx } = this
    const data = ctx.request.body
    const user = await ctx.service.buser.updateBUserById(data)
    ctx.body = user
  }
}
module.exports = BUserController

