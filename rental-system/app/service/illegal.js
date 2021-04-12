'use strict'
const Service = require('egg').Service
const illegal = require('../db/illegal')
class IllegalService extends Service {
  // 新增举报虚假房源信息
  async insertReportFakeHouse (data) {
    const ndata = await illegal.insertReportFakeHouse(data)
    return ndata
  }
}
module.exports = IllegalService