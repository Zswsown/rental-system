'use strict'
const Service = require('egg').Service
const house = require('../db/house')
class HouseService extends Service {
  // 新增房源信息
  async insertHouse (form) {
    const { province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, type, num, desc, address, userInfo, rentalHouse } = form
    const ihouse = await house.insertHouse({ province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, type, num, desc, address, userInfo })
    let house_id = ihouse.data.insertId
    const rhouse = await house.insertRentalHouse({ house_id, type, userInfo, rentalHouse })
    return rhouse
  }
  // 新增整租房源
  async insertEntireHouse (form) {
    const { type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, area, price, direct, tag, desc, userInfo } = form
    const ihouse = await house.insertHouse({ type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, userInfo })
    let house_id = ihouse.data.insertId
    const ehouse = await house.insertEntireHouse({ house_id, area, price, direct, tag, desc, userInfo })
    return ehouse
  }
  // 新增合租房源
  async insertShareHouse (form) {
    const { type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, userInfo, rentalHouse } = form
    const ihouse = await house.insertHouse({ type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, userInfo, rentalHouse })
    let house_id = ihouse.data.insertId
    const shouse = await house.insertShareHouse({ house_id, rentalHouse, userInfo })
    return shouse
  }
  // 获取全部出租房源
  async selectAllRentalHouse () {
    const data = await house.selectAllRentalHouse();
    return data
  }
  // 获取出租房源 信息
  async selectHouse ({ id, type }) {
    const house = await house.selectHouse({ id, type });
    return house
  }
}
module.exports = HouseService