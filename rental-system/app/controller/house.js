'use strict'

const Controller = require('../core/base_controller')

class HouseController extends Controller {
  async insertHouse () {
    const { ctx } = this
    const house = await ctx.service.house.insertHouse(ctx.request.body)
    ctx.body = house
  }
  async insertEntireHouse () {
    const { ctx } = this
    const house = await ctx.service.house.insertEntireHouse(ctx.request.body)
    ctx.body = house
  }
  async insertShareHouse () {
    const { ctx } = this
    const house = await ctx.service.house.insertShareHouse(ctx.request.body)
    ctx.body = house
  }
  async selectAllRentalHouse () {
    const { ctx } = this
    const data = await ctx.service.house.selectAllRentalHouse()
    ctx.body = data
  }
  async selectRentalHouse () {
    const { ctx } = this
    const { id, type } = ctx.request.body
    const house = await ctx.service.house.selectRentalHouse({ id, type })
    ctx.body = house
  }
}

module.exports = HouseController