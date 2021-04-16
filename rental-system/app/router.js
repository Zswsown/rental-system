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
  router.post('/api/house/updateEntireHouseById', controller.house.updateEntireHouseById)
  router.post('/api/house/updateShareHouseById', controller.house.updateShareHouseById)

  router.post('/api/house/publishHouse', middleware.jwt(), controller.house.insertHouse)
  router.post('/api/house/publishEntireHouse', middleware.jwt(), controller.house.insertEntireHouse)
  router.post('/api/house/publishShareHouse', middleware.jwt(), controller.house.insertShareHouse)

  router.post('/api/illegal/insertReportFakeHouse', controller.illegal.insertReportFakeHouse)
  router.post('/api/advice/insertAdvice', controller.advice.insertAdvice)

  // 收藏房源有关
  router.post('/api/collection/insertCollection', controller.collection.insertCollection)
  router.post('/api/collection/deleteCollection', controller.collection.deleteCollection)
  router.post('/api/collection/getCollectionById', controller.collection.getCollectionById)
  router.post('/api/collection/getCollectionByUserId', controller.collection.getCollectionByUserId)
}
