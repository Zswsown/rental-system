'use strict'
const pool = require('./pool')

// 新增反馈意见
async function insertAdvice (data) {
  try {
    const { role, user_id, advice } = data
    const sql = 'INSERT INTO advice (role,user_id,advice) values(?,?,?)'
    const [rows, fields] = await pool.query(sql, [role, user_id, advice])
    if (rows.affectedRows > 0) {
      return {
        msg: '提交反馈意见成功',
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
  insertAdvice
}
