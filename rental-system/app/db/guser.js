'use strict';
const pool = require('./pool');

// 查找注册的用户账号是否存在
async function selectGUser ({ code, password, role }) {
  try {
    const sql = 'SELECT * FROM guser WHERE `code` = ? AND `password` = ? AND role = ?';
    const [rows, fields] = await pool.query(sql, [code, password, role]);
    if (rows.length === 0) {
      return {
        message: '账号为空',
        error: -2
      }
    } else {
      return {
        message: '登录成功',
        error: 0
      }
    }
  }
  catch (err) {
    return err
  }
}

// 无该账号，则添加该注册的账号进数据库
async function insertGuser ({ code, password, role, tel }) {
  try {
    const isExist = selectGUser({ code, password, role }).error
    if (isExist) {
      const sql = 'INSERT INTO guser (code,password,role,tel) values(?,?,?,?)';
      const [rows, fields] = await pool.query(sql, [code, password, role, tel]);
      if (rows.affectedRows > 0) {
        return {
          message: '注册成功',
          error: -1
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
        message: '账号已存在',
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

module.exports = {
  selectGUser,
  insertGuser,
};
