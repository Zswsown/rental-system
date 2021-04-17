'use strict'
const Service = require('egg').Service
const advice = require('../db/advice')
class AdviceService extends Service {
  // 新增反馈意见
  async insertAdvice (data) {
    const ndata = await advice.insertAdvice(data)
    return ndata
  }
  // 回复反馈意见
  async updateAdvice (data) {
    const ndata = await advice.updateAdvice(data)
    return ndata
  }
  // 获取全部反馈意见消息
  async selectAllAdvice (data) {
    const ndata = await advice.selectAllAdvice(data)
    return ndata
  }
}
module.exports = AdviceService