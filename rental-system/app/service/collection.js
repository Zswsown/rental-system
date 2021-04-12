'use strict'
const Service = require('egg').Service
const collection = require('../db/collection')
class CollectionService extends Service {
  // 添加收藏房源
  async insertCollection (data) {
    const ndata = await collection.insertCollection(data)
    return ndata
  }
}
module.exports = CollectionService