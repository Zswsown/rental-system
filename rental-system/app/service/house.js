'use strict'
const Service = require('egg').Service
const house = require('../db/house')
class HouseService extends Service {
  async insertHouse (form) {
    const { province_id, city_id, country_id, area_id, type, num, desc, address, userInfo, rentalHouse } = form
    const ihouse = await house.insertHouse({ province_id, city_id, country_id, area_id, type, num, desc, address, userInfo })
    let house_id = ihouse.data.insertId
    const rhouse = await house.insertRentalHouse({ house_id, type, userInfo, rentalHouse })
    return rhouse

  }
}
module.exports = HouseService