'use strict'
const pool = require("./pool")
// 新增房源信息
async function insertHouse ({ province_id, city_id, country_id, area_id, type, num, desc, address, userInfo }) {
  try {
    const sql = 'INSERT INTO house (`province_id`, `city_id`, `country_id`, `area_id`, `type`, `num`, `desc`, `address`, `buser_id`,`is_del`) values(?,?,?,?,?,?,?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [province_id, city_id, country_id, area_id, type, num, desc, address, userInfo.id, 0])
    if (rows.affectedRows > 0) {
      return {
        message: '发布房源成功',
        error: 0,
        data: rows
      }
    } else {
      return {
        message: '服务器繁忙',
        error: -2
      }
    }
  }
  catch (err) {
    return {
      message: err,
      error: -2
    }
  }
}
// 新增出租房间信息
async function insertRentalHouse ({ house_id, type, userInfo, rentalHouse }) {
  try {
    const sql = 'INSERT INTO rent_house (`house_id`,`buser_id`,`type`,`desc`,`area`,`tag`,`direct`,`price`,`is_del`,`status`) values ?'
    let buser_id = userInfo.id
    const params = rentalHouse.map((house) => { return [house_id, buser_id, type, house.desc, house.area, house.tag.toString(), house.direct, house.price, 0, `disRented`] })
    // return params
    const [rows, fields] = await pool.query(sql, [params])
    if (rows.affectedRows > 0) {
      return {
        message: '发布出租房成功',
        error: 0,
        data: rows
      }
    } else {
      return {
        message: '服务器繁忙',
        error: -2
      }
    }
  }
  catch (err) {
    return {
      message: err,
      error: -2
    }
  }
}
module.exports = {
  insertHouse,
  insertRentalHouse
}