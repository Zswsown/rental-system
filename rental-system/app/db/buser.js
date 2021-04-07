'use strict'
const pool = require('./pool')

// 查找注册的房源管家账号是否存在
async function selectBUser ({ code, password, role }) {
  try {
    const sql = 'SELECT * FROM buser WHERE `code` = ? AND `password` = ? AND role = ?'
    const [rows, fields] = await pool.query(sql, [code, password, role])
    if (rows.length === 0) {
      return {
        message: '账号为空',
        error: -2,
      }
    } else {
      if (rows[0].status === "reviewing") {
        return {
          message: '账号审核中',
          error: -1,
          data: rows[0]
        }
      }
      else if (rows[0].status === "refused") {
        return {
          message: '注册账号被拒绝',
          error: -2,
          data: rows[0]
        }
      }
      else if (rows[0].status === "success") {
        return {
          message: '登录成功',
          error: 0,
          data: rows[0]
        }
      }
    }
  }
  catch (err) {
    return err
  }
}

// 无该账号，则添加该注册的账号进数据库
async function insertBUser ({ code, password, role, tel }) {
  try {
    const sql = 'INSERT INTO buser (code,password,role,tel,status) values(?,?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [code, password, role, tel, 'reviewing'])
    if (rows.affectedRows > 0) {
      return {
        message: '提交注册成功,等待管理员审核',
        error: -1
      }
    } else {
      return {
        message: '服务器繁忙',
        error: -2
      }
    }
  }
  catch (err) {
    if (err.code != null) {
      if (err.code === "ER_DUP_ENTRY") {
        return {
          message: '账号已存在',
          error: -2
        }
      }
    }
    return err
  }
}

// 系统管理员审核房源管家账号，更新房源管家信息
async function updateBuser ({ code, password, role, tel, status }) {
  try {
    const isExist = selectBUser({ code, password, role }).error
    if (isExist) {
      const sql = 'INSERT INTO buser (code,password,role,tel,status) values(?,?,?,?,?)'
      const [rows, fields] = await pool.query(sql, [code, password, role, tel, status])
      if (rows.affectedRows > 0) {
        return {
          message: '更新成功',
          error: 0
        }
      } else {
        return {
          message: '服务器繁忙',
          error: -2
        }
      }
    }
    else {
      return {
        message: '更新失败',
        error: -2
      }
    }
  }
  catch (err) {
    if (err.code != null) {
      if (err.code === "ER_DUP_ENTRY") {
        return {
          message: '更新失败',
          error: -2
        }
      }
    }
    return err
  }
}

module.exports = {
  selectBUser,
  insertBUser,
  updateBuser
}
