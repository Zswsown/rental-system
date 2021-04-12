'use strict'
const Controller = require('../core/base_controller')
class AdviceController extends Controller {
  async insertAdvice () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.advice.insertAdvice(data)
    ctx.body = ndata
  }
}
module.exports = AdviceController

