'use strict'
const pool = require('./pool')

// 新增收藏房源
async function insertCollection (data) {
  try {
    const { role, user_id, type, house_id } = data
    const sql = 'INSERT INTO collection (role, user_id, type,house_id) values(?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [role, user_id, type, house_id])
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

module.exports = {
  insertCollection
}
