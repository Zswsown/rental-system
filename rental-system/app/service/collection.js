'use strict'
const Service = require('egg').Service
const collection = require('../db/collection')
class CollectionService extends Service {
  // 添加收藏房源
  async insertCollection (data) {
    const ndata = await collection.insertCollection(data)
    return ndata
  }
  // 取消收藏房源
  async deleteCollection (data) {
    const ndata = await collection.deleteCollection(data)
    return ndata
  }
  // 根据用户id和房屋id 获取收藏房源
  async getCollectionById (data) {
    const ndata = await collection.getCollectionById(data);
    return ndata;
  }
  // 根据用户id 获取收藏房源
  async getCollectionByUserId (data) {
    const ndata = await collection.getCollectionByUserId(data);
    return ndata
  }
}
module.exports = CollectionService