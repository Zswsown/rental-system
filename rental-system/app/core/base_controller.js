'use strict';
// 对Controller基类进行二次封装
const { Controller } = require('egg');
class BaseController extends Controller {
  success (status, message, data) {
    if (data) {
      this.ctx.body = {
        status,
        message,
        data,
      };
    } else {
      this.ctx.body = {
        status,
        message,
      };
    }
  }
  notFound (msg = 'not found') {
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
