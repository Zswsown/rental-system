'use strict'
const Controller = require('../core/base_controller')
class CollectionController extends Controller {
  async insertCollection () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.collection.insertCollection(data)
    ctx.body = ndata
  }
  async deleteCollection () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.collection.deleteCollection(data)
    ctx.body = ndata
  }
  async getCollectionById () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.collection.getCollectionById(data);
    ctx.body = ndata
  }
  async getCollectionByUserId () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.collection.getCollectionByUserId(data);
    ctx.body = ndata
  }
}
module.exports = CollectionController

