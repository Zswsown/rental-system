'use strict'
const pool = require('./pool')

// 新增收藏房源
async function insertCollection (data) {
  try {
    const { role, user_id, type, rental_house_id } = data
    const sql = 'INSERT INTO collection (role, user_id, type,rental_house_id) values(?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [role, user_id, type, rental_house_id])
    if (rows.affectedRows > 0) {
      return {
        msg: '收藏房源成功',
        data: rows,
        code: 200
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

// 删除收藏房源
async function deleteCollection (data) {
  try {
    const { id } = data
    const sql = 'DELETE FROM collection WHERE id = ?'
    const [rows, fields] = await pool.query(sql, [id])
    if (rows.affectedRows > 0) {
      return {
        msg: '取消收藏房源成功',
        data: rows,
        code: 200
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

// 根据用户id和房屋id 获取收藏房源
async function getCollectionById (data) {
  try {
    const { role, user_id, type, rental_house_id } = data
    const sql = 'SELECT *  FROM collection WHERE user_id = ? AND role = ? AND rental_house_id = ?  AND type = ?'
    const [rows, fields] = await pool.query(sql, [user_id, role, rental_house_id, type])
    if (rows.length > 0) {
      return {
        msg: '获取收藏房源成功',
        data: rows,
        code: 200
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

// 根据用户id 获取收藏房源
async function getCollectionByUserId (data) {
  try {
    const { role, user_id } = data
    const sql = 'SELECT *  FROM collection WHERE user_id = ? AND role = ?'
    const [rows, fields] = await pool.query(sql, [user_id, role])
    if (rows.length > 0) {
      return {
        msg: '获取全部收藏房源成功',
        data: rows,
        code: 200
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

module.exports = {
  insertCollection,
  deleteCollection,
  getCollectionById,
  getCollectionByUserId
}
