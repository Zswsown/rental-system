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
  async selectRentalHouseByFilterOptions () {
    const { ctx } = this
    const data = await ctx.service.house.selectRentalHouseByFilterOptions(ctx.request.body)
    ctx.body = data
  }
  async selectRentalHouse () {
    const { ctx } = this
    const { id, type } = ctx.request.body
    const house = await ctx.service.house.selectRentalHouse({ id, type })
    ctx.body = house
  }
  async selectAllEntireHouse () {
    const { ctx } = this
    const data = await ctx.service.house.selectAllEntireHouse()
    ctx.body = data
  }
  async selectAllShareHouse () {
    const { ctx } = this
    const data = await ctx.service.house.selectAllShareHouse()
    ctx.body = data
  }
  async selectAllRentalHouseByBuserId () {
    const { ctx } = this
    const { id } = ctx.request.body
    const data = await ctx.service.house.selectAllRentalHouseByBuserId({ id })
    ctx.body = data
  }
  async selectAllEntireHouseByBuserId () {
    const { ctx } = this
    const { id } = ctx.request.body
    const data = await ctx.service.house.selectAllEntireHouseByBuserId({ id })
    ctx.body = data
  }
  async selectAllShareHouseByBuserId () {
    const { ctx } = this
    const { id } = ctx.request.body
    const data = await ctx.service.house.selectAllShareHouseByBuserId({ id })
    ctx.body = data
  }
  async updateEntireHouseById () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.house.updateEntireHouseById(data)
    ctx.body = ndata
  }
  async updateShareHouseById () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.house.updateShareHouseById(data)
    ctx.body = ndata
  }
}

module.exports = HouseController