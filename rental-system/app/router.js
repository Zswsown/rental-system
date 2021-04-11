'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  router.get('/api/getUserInfo', controller.user.getUserInfo)
  router.post('/api/register', controller.user.register)
  router.post('/api/login', controller.user.login)
  router.get('/api/house/getAllRentalHouse', controller.house.selectAllRentalHouse)
  router.post('/api/house/getHouseDetail', controller.house.selectHouse)
  router.post('/api/house/publishHouse', middleware.jwt(), controller.house.insertHouse)
  router.post('/api/house/publishEntireHouse', middleware.jwt(), controller.house.insertEntireHouse)
  router.post('/api/house/publishShareHouse', middleware.jwt(), controller.house.insertShareHouse)
}
