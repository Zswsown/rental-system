'use strict'

const Controller = require('../core/base_controller')

class HouseController extends Controller {
  async insertHouse () {
    const { ctx } = this
    const house = await ctx.service.house.insertHouse(ctx.request.body)
    ctx.body = house
  }
}

module.exports = HouseController