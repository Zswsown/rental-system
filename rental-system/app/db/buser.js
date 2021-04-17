'use strict'
const pool = require('./pool')

// 查找注册的房源管家账号是否存在
async function selectBUser ({ code, password, role }) {
  try {
    const sql = 'SELECT * FROM buser WHERE `code` = ? AND `password` = ? AND role = ?'
    const [rows, fields] = await pool.query(sql, [code, password, role])
    if (rows.length === 0) {
      return {
        msg: '账号不存在',
        code: 5003,
        data: null
      }
    } else {
      if (rows[0].status === "reviewing") {
        return {
          msg: '账号审核中',
          code: 5007,
          data: null
        }
      }
      else if (rows[0].status === "refused") {
        return {
          msg: '注册账号被拒绝',
          code: 5008,
          data: null
        }
      }
      else if (rows[0].status === "success") {
        return {
          msg: '登录成功',
          code: 200,
          data: rows[0]
        }
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
async function insertBUser ({ code, password, role, tel }) {
  try {
    const sql = 'INSERT INTO buser (code,password,role,tel,status) values(?,?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [code, password, role, tel, 'reviewing'])
    if (rows.affectedRows > 0) {
      return {
        msg: '提交注册成功,等待管理员审核',
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
    if (err.code != null) {
      if (err.code === "ER_DUP_ENTRY") {
        return {
          msg: '账号已存在',
          data: null,
          code: 5006
        }
      }
    }
    return err
  }
}

// 根据用户id查询用户信息
async function selectBUserById (id) {
  try {
    const sql = 'SELECT * FROM buser WHERE `id` = ?'
    const [rows, fields] = await pool.query(sql, [id])
    if (rows.length === 0) {
      return {
        msg: '账号不存在',
        data: null,
        code: 5003
      }
    } else {
      return {
        msg: '获取用户信息成功',
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

// 更新房源管家信息
async function updateBUser ({ id, nickname, tel, email, sex }) {
  try {
    const sql = "UPDATE buser SET nickname =?, tel = ? ,email =?, sex =? WHERE id=?"
    const [rows, fields] = await pool.query(sql, [nickname, tel, email, sex, id])
    if (rows.affectedRows > 0) {
      return {
        msg: '更新用户信息成功',
        data: rows,
        code: 200
      }
    } else {
      return {
        msg: '更新用户信息失败',
        data: null,
        code: 5003
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

// 获取全部房源管家信息
async function selectAllBUser () {
  try {
    const sql = 'SELECT * FROM buser'
    const [rows, fields] = await pool.query(sql)
    if (rows.length > 0) {
      return {
        msg: '获取全部的房源管家账号成功',
        code: 500,
        data: rows
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
      data: err,
      code: 5004
    }
  }
}

async function updateBUserById (data) {
  try {
    const { status, id } = data
    const sql = "UPDATE buser SET `status` = ? WHERE id = ?"
    const [rows, fields] = await pool.query(sql, [status, id])
    if (rows.affectedRows > 0) {
      return {
        msg: '更新用户信息成功',
        data: rows,
        code: 200
      }
    } else {
      return {
        msg: '更新用户信息失败',
        data: null,
        code: 5003
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

module.exports = {
  selectBUser,
  insertBUser,
  updateBUser,
  selectBUserById,
  selectAllBUser,
  updateBUserById
}
