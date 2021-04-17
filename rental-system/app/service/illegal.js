'use strict'
const Service = require('egg').Service
const illegal = require('../db/illegal')
class IllegalService extends Service {
  // 新增举报虚假房源信息
  async insertReportFakeHouse (data) {
    const ndata = await illegal.insertReportFakeHouse(data)
    return ndata
  }
  // 回复 举报虚假房源消息
  async updateReportFakeHouse (data) {
    const ndata = await illegal.updateReportFakeHouse(data)
    return ndata
  }
  // 获取全部举报虚假房源信息
  async selectReportFakeHouse () {
    const ndata = await illegal.selectReportFakeHouse()
    return ndata
  }
}
module.exports = IllegalService