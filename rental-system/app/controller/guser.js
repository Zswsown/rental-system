'use strict'
const Controller = require('../core/base_controller')
class GUserController extends Controller {
  async updateGUser () {
    const { ctx } = this
    const { id, nickname, tel, email, sex } = ctx.request.body
    const user = await ctx.service.guser.updateGUser({ id, nickname, tel, email, sex })
    ctx.body = user
  }
}
module.exports = GUserController

