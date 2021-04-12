'use strict'
const pool = require('./pool')

// 新增举报虚假房源信息
async function insertReportFakeHouse (data) {
  try {
    const { type, buser_id, house_id, illegal_reason } = data
    const sql = 'INSERT INTO illegal (type,buser_id,house_id,illegal_reason) values(?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [type, buser_id, house_id, illegal_reason])
    if (rows.affectedRows > 0) {
      return {
        msg: '新增举报虚假房源信息成功',
        data: rows,
        code: 500
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
  insertReportFakeHouse
}
