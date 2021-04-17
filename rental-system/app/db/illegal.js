'use strict'
const pool = require('./pool')

// 新增举报虚假房源信息
async function insertReportFakeHouse (data) {
  try {
    const { type, buser_id, house_id, illegal_reason } = data
    const sql = 'INSERT INTO illegal (type,buser_id,house_id,illegal_reason,status) values(?,?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [type, buser_id, house_id, illegal_reason, 'unreplied'])
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

// 回复 举报虚假房源消息
async function updateReportFakeHouse (data) {
  try {
    const { id, reply_report } = data
    const sql = 'UPDATE illegal SET `reply_report` = ? , `status` = ? WHERE id = ?';
    // return sql
    const [rows, fields] = await pool.query(sql, [reply_report, "replied", id])
    if (rows.affectedRows > 0) {
      return {
        msg: '回复举报虚假房源信息成功',
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

// 获取全部举报虚假房源信息
async function selectReportFakeHouse () {
  try {
    const sql = 'SELECT * FROM illegal '
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取举报虚假房源信息成功',
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
  insertReportFakeHouse,
  updateReportFakeHouse,
  selectReportFakeHouse
}
