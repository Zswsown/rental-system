'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  router.get('/api/getUserInfo', controller.user.getUserInfo)
  router.post('/api/register', controller.user.register)
  router.post('/api/login', controller.user.login)
  router.post('/api/guser/updateGUser', controller.guser.updateGUser)
  router.post('/api/buser/updateBUser', controller.buser.updateBUser)

  router.get('/api/house/getAllRentalHouse', controller.house.selectAllRentalHouse)
  router.post('/api/house/getRentalHouse', controller.house.selectRentalHouse)
  router.get('/api/house/getAllEntireHouse', controller.house.selectAllEntireHouse)
  router.get('/api/house/getAllShareHouse', controller.house.selectAllShareHouse)

  router.post('/api/house/getAllRentalHouseByBuserId', controller.house.selectAllRentalHouseByBuserId)
  router.post('/api/house/getAllEntireHouseByBuserId', controller.house.selectAllEntireHouseByBuserId)
  router.post('/api/house/getAllShareHouseByBuserId', controller.house.selectAllShareHouseByBuserId)

  router.post('/api/house/publishHouse', middleware.jwt(), controller.house.insertHouse)
  router.post('/api/house/publishEntireHouse', middleware.jwt(), controller.house.insertEntireHouse)
  router.post('/api/house/publishShareHouse', middleware.jwt(), controller.house.insertShareHouse)
}
