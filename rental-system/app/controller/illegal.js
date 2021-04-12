'use strict'
const Controller = require('../core/base_controller')
class IllegalController extends Controller {
  async insertReportFakeHouse () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.illegal.insertReportFakeHouse(data)
    ctx.body = ndata
  }
}
module.exports = IllegalController

