'use strict'
const pool = require('./pool')

// 新增反馈意见
async function insertAdvice (data) {
  try {
    const { role, user_id, advice } = data
    const sql = 'INSERT INTO advice (role,user_id,advice,status) values(?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [role, user_id, advice, 'unreplied'])
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

// 回复 反馈意见
async function updateAdvice (data) {
  try {
    const { id, reply_advice } = data
    const sql = 'UPDATE advice SET `reply_advice` = ? , `status` = ? WHERE id = ?';
    const [rows, fields] = await pool.query(sql, [reply_advice, "replied", id])
    if (rows.affectedRows > 0) {
      return {
        msg: '回复反馈意见成功',
        data: rows,
        code: 500
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: rows,
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

// 获取全部反馈意见消息
async function selectAllAdvice () {
  try {
    const sql = 'SELECT * FROM advice '
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取全部反馈意见成功',
        data: rows,
        code: 500
      }
    } else {
      return {
        msg: '服务器繁忙',
        data: rows,
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
  insertAdvice,
  updateAdvice,
  selectAllAdvice
}
