'use strict'
const pool = require("./pool")

// 新增房源信息
async function insertHouse ({ type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, userInfo }) {
  try {
    const sql = 'INSERT INTO rent_house (`type`, `num`, `province_id`, `city_id`, `country_id`, `area_id`, `province_name`, `city_name`, `country_name`, `area_name`, `address`, `buser_id`,`is_del`) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, userInfo.id, 0])
    if (rows.affectedRows > 0) {
      return {
        msg: '发布房源成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: null,
        code: 5005
      }
    }
  }
  catch (err) {
    return {
      msg: '服务器报错了',
      data: err,
      code: 5004
    }
  }
}

// 新增整租房源信息
async function insertEntireHouse ({ house_id, area, price, direct, tag, desc, userInfo }) {
  try {
    const sql = 'INSERT INTO `rent_entire_house` (`house_id`, `area`, `price`, `direct`, `tag`, `desc`, `buser_id`, `is_del`, `status`) values (?,?,?,?,?,?,?,?,?)'
    let buser_id = userInfo.id
    const [rows, fields] = await pool.query(sql, [house_id, area, price, direct, tag.toString(), desc, buser_id, 0, `disRented`])
    if (rows.affectedRows > 0) {
      return {
        msg: '发布整租房源成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: null,
        code: 5005
      }
    }
  }
  catch (err) {
    return {
      msg: '服务器报错了',
      data: null,
      code: 5004
    }
  }
}

// 新增分租房源信息
async function insertShareHouse ({ house_id, rentalHouse, userInfo }) {
  try {
    const sql = 'INSERT INTO rent_share_house (`house_id`, `area`, `price`, `direct`, `tag`, `desc`, `buser_id`, `is_del`, `status`) values ?'
    let buser_id = userInfo.id
    const params = rentalHouse.map((house) => { return [house_id, house.area, house.price, house.direct, house.tag.toString(), house.desc, buser_id, 0, `disRented`] })
    // return params
    const [rows, fields] = await pool.query(sql, [params])
    if (rows.affectedRows > 0) {
      return {
        msg: '发布分租房源成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: null,
        code: 5005
      }
    }
  }
  catch (err) {
    return {
      msg: '服务器报错了',
      data: null,
      code: 5004
    }
  }
}

//获取全部出租房源信息
async function selectAllRentalHouse () {
  try {
    let sql = 'SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id UNION SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, area, price, direct, tag, `desc`, s.id, s.buser_id, house_id FROM rent_house as r RIGHT JOIN rent_share_house as s ON r.id = s.house_id';
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取全部出租房源信息成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: null,
        code: 5005
      }
    }
  } catch (error) {
    return {
      msg: '服务器报错了',
      data: null,
      code: 5004
    }
  }
}

// 获取出租房源信息
async function selectRentalHouse ({ id, type }) {
  try {
    let table = type === 'entire' ? 'rent_entire_house' : 'rent_share_house'
    let sql = 'SELECT * FROM ( SELECT * FROM ( SELECT  type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, area, price, direct, tag, `desc`, e.id, e.buser_id, house_id  FROM ' + table + ' as e LEFT JOIN rent_house as r ON r.id = e.house_id) as new WHERE new.id = ' + id + ') AS a LEFT JOIN buser ON buser.id = a.buser_id';
    // let sql = 'SELECT * FROM  (SELECT  type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, area, price, direct, tag, `desc`, e.id, e.buser_id, house_id  FROM ' + table + ' as e LEFT JOIN rent_house as r ON r.id = e.house_id) as new WHERE new.id = ' + id;
    // let sql = `SELECT * FROM ${table} where id = ${id}`
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取出租房源信息成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: null,
        code: 5005
      }
    }
  } catch (error) {
    return {
      msg: '服务器报错了',
      data: null,
      code: 5004
    }
  }
}
// 获取全部整租出租房源
async function selectAllEntireHouse () {
  try {
    let sql = 'SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id';
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取全部整租出租房源信息成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: null,
        code: 5005
      }
    }
  } catch (error) {
    return {
      msg: '服务器报错了',
      data: null,
      code: 5004
    }
  }
}
// 获取全部分租出租房源
async function selectAllShareHouse () {
  try {
    let sql = 'SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,s.id,s.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_share_house as s ON r.id = s.house_id';
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取全部分租出租房源信息成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: null,
        code: 5005
      }
    }
  } catch (error) {
    return {
      msg: '服务器报错了',
      data: null,
      code: 5004
    }
  }
}

module.exports = {
  insertHouse,
  insertEntireHouse,
  insertShareHouse,
  selectAllRentalHouse,
  selectAllEntireHouse,
  selectAllShareHouse,
  selectRentalHouse
  // insertRentalHouse
}