'use strict'
const Service = require('egg').Service
const advice = require('../db/advice')
class AdviceService extends Service {
  // 新增反馈意见
  async insertAdvice (data) {
    const ndata = await advice.insertAdvice(data)
    return ndata
  }
}
module.exports = AdviceService