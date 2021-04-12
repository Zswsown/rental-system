'use strict'
const Controller = require('../core/base_controller')
class CollectionController extends Controller {
  async insertCollection () {
    const { ctx } = this
    const data = ctx.request.body
    const ndata = await ctx.service.collection.insertCollection(data)
    ctx.body = ndata
  }
}
module.exports = CollectionController

