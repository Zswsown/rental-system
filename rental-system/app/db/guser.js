'use strict'
const pool = require('./pool')

// 查找注册的用户账号是否存在
async function selectGUser ({ code, password, role }) {
  try {
    const sql = 'SELECT * FROM guser WHERE `code` = ? AND `password` = ? AND role = ?'
    const [rows, fields] = await pool.query(sql, [code, password, role])
    if (rows.length === 0) {
      return {
        msg: '账号不存在',
        data: null,
        code: 5003
      }
    } else {
      return {
        msg: '登录成功',
        data: rows[0],
        code: 200
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

// 无该账号，则添加该注册的账号进数据库
async function insertGUser ({ code, password, role, tel }) {
  try {
    const sql = 'INSERT INTO guser (code,password,role,tel) values(?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [code, password, role, tel])
    if (rows.affectedRows > 0) {
      return {
        msg: '注册成功',
        data: rows[0],
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
    if (err.code != null) {
      if (err.code === "ER_DUP_ENTRY") {
        return {
          msg: '账号已存在',
          data: null,
          code: 5006
        }
      }
    }
    return {
      msg: '服务器报错了',
      data: null,
      code: 5004
    }
  }
}

module.exports = {
  selectGUser,
  insertGUser,
}
