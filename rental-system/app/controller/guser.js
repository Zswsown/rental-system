'use strict';
const Controller = require('../core/base_controller');
class GUserController extends Controller {
  async publishHouse () {
    const { ctx } = this
    const house = await ctx.service.house.publishHouse()
  }
}
module.exports = GUserController;

