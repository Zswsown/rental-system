'use strict'
const Controller = require('../core/base_controller')
class IllegalController extends Controller {
  async insertReportFakeHouse () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.illegal.insertReportFakeHouse(data)
    ctx.body = ndata
  }
  async updateReportFakeHouse () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.illegal.updateReportFakeHouse(data)
    ctx.body = ndata
  }
  async selectReportFakeHouse () {
    const { ctx } = this
    const ndata = await ctx.service.illegal.selectReportFakeHouse()
    ctx.body = ndata
  }
}
module.exports = IllegalController

