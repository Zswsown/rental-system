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
    let sql = 'SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id UNION SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, area, price, direct, tag, `desc`, s.id, s.buser_id, house_id FROM rent_house as r RIGHT JOIN rent_share_house as s ON r.id = s.house_id'
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

// 获取全部整租出租房源
async function selectAllEntireHouse () {
  try {
    let sql = 'SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id'
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
    let sql = 'SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,s.id,s.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_share_house as s ON r.id = s.house_id'
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

// 获取出租房源信息
async function selectRentalHouse ({ id, type }) {
  try {
    let table = type === 'entire' ? 'rent_entire_house' : 'rent_share_house'
    let sql = 'SELECT * FROM ( SELECT * FROM ( SELECT  type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, area, price, direct, tag, `desc`, e.id, e.buser_id, house_id  FROM ' + table + ' as e LEFT JOIN rent_house as r ON r.id = e.house_id) as new WHERE new.id = ' + id + ') AS a LEFT JOIN buser ON buser.id = a.buser_id'
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

// 根据筛选条件获取出租房源信息
async function selectRentalHouseByFilterOptions (data) {
  try {
    let { directions, nums, prices, types } = data
    let direct = ''
    let num = ''
    let price = ''
    let priceOption = ''
    let params = 'WHERE '
    let sql = ''
    if (directions.length != 0) {
      direct = 'direct IN ("' + directions.join('","') + '")'
    }
    if (nums.length != 0) {
      num = 'num IN (' + nums.join(',') + ')'
    }
    if (prices.length != 0) {
      // price = Array.from(new Set(prices.map(item => item.split('-')).flat()))
      price = Array.from(prices.map(item => item.split('-')).flat())
      if (price.find(item => item === "?") != undefined) {
        for (let i = 0; i < price.length / 2; i++) {
          priceOption = priceOption + ' ( price > ' + price[i * 2] + ' AND price < ' + price[i * 2 + 1] + ' ) OR ';
        }
        priceOption = priceOption.split(' AND price < ? ) OR')[0] + " )"
      }
      else {
        for (let i = 0; i < price.length / 2; i++) {
          priceOption = priceOption + ' ( price > ' + price[i * 2] + ' AND price < ' + price[i * 2 + 1] + ' ) OR ';
        }
        priceOption = priceOption.slice(0, -3)
      }
      priceOption = "(" + priceOption + ")"
    }
    if (direct != '') {
      params = params + direct + ' AND '
    }
    if (num != '') {
      params = params + num + ' AND '
    }
    if (price != '') {
      params = params + priceOption + ' AND';
    }
    params = params.slice(0, -4)
    if (types == "null") {
      sql = 'SELECT * FROM ( SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id UNION SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address, area, price, direct, tag, `desc`, s.id, s.buser_id, house_id FROM rent_house as r RIGHT JOIN rent_share_house as s ON r.id = s.house_id ) AS new ' + params
    }
    else {
      if (types == "entire") {
        sql = 'SELECT * FROM ( SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id ) AS new ' + params
      }
      else {
        sql = 'SELECT * FROM ( SELECT type, num, province_id, city_id, country_id, area_id, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_share_house as e ON r.id = e.house_id ) AS new ' + params
      }
    }
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取符合筛选条件的出租房源信息成功',
        code: 500,
        data: rows
      }
    } else {
      return {
        msg: '无符合筛选条件的房源，可减少筛选条件哦',
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

// 根据房源管家id获取其发布的全部出租房源
async function selectAllRentalHouseByBuserId ({ id }) {
  try {
    let sql = 'SELECT * FROM ( SELECT type, num,status, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id UNION SELECT type, num,status, province_name, city_name, country_name, area_name, address, area, price, direct, tag, `desc`, s.id, s.buser_id, house_id FROM rent_house as r RIGHT JOIN rent_share_house as s ON r.id = s.house_id ) AS new WHERE new.buser_id = ' + id
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

// 根据房源管家id获取其全部整租出租房源
async function selectAllEntireHouseByBuserId ({ id }) {
  try {
    let sql = 'SELECT * FROM ( SELECT type, num,status, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_entire_house as e ON r.id = e.house_id ) AS new WHERE new.buser_id = ' + id
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

// 根据房源管家id获取其全部分租出租房源
async function selectAllShareHouseByBuserId ({ id }) {
  try {
    let sql = 'SELECT * FROM ( SELECT type, num,status, province_name, city_name, country_name, area_name, address,area, price, direct, tag, `desc`,e.id,e.buser_id,house_id FROM rent_house as r RIGHT JOIN rent_share_house as e ON r.id = e.house_id ) AS new WHERE new.buser_id = ' + id
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

// 根据出租房id更新整租房屋状态
async function updateEntireHouseById (data) {
  try {
    let { id } = data
    let columnKeys = (Object.keys(data)).filter(item => item !== 'id')
    let params = ''
    for (let i = 0; i < columnKeys.length; i++) {
      params = "`" + columnKeys[i] + "` = '" + data[columnKeys[i]] + "'," + params
    }
    let sql = 'UPDATE rent_entire_house SET ' + params.slice(0, -1) + ' WHERE id = ' + id;
    // return { sql, columnKeys }
    const [rows, fields] = await pool.query(sql)
    if (rows.affectedRows > 0) {
      return {
        msg: '更新整租房屋信息成功',
        data: rows,
        code: 200
      }
    } else {
      return {
        msg: '更新整租房屋信息失败',
        data: null,
        code: 5003
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

// 根据出租房id更新分租房屋状态
async function updateShareHouseById (data) {
  try {
    let { id } = data
    let columnKeys = (Object.keys(data)).filter(item => item !== 'id')
    let params = ''
    for (let i = 0; i < columnKeys.length; i++) {
      params = "`" + columnKeys[i] + "` = '" + data[columnKeys[i]] + "'," + params
    }
    let sql = 'UPDATE rent_share_house SET ' + params.slice(0, -1) + ' WHERE id = ' + id;
    const [rows, fields] = await pool.query(sql)
    if (rows.affectedRows > 0) {
      return {
        msg: '更新分租房屋信息成功',
        data: rows,
        code: 200
      }
    } else {
      return {
        msg: '更新分租房屋信息失败',
        data: null,
        code: 5003
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
  selectRentalHouseByFilterOptions,
  selectRentalHouse,
  selectAllRentalHouseByBuserId,
  selectAllEntireHouseByBuserId,
  selectAllShareHouseByBuserId,
  updateEntireHouseById,
  updateShareHouseById
}