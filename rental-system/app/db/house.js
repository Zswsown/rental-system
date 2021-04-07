'use strict'
const pool = require("./pool")
async function insertHouse ({ address, desc, num, type, userInfo, rentalHouse }) {
  try {
    const sql = 'INSERT INTO house (address, desc, num, type，`buser_id`) values(?,?,?,?,?)'
    const [rows, fields] = await pool.query(sql, [address, desc, num, type, userInfo.id])
    if (rows.affectedRows > 0) {
      return {
        message: '发布房源成功',
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
          message: '房源已存在',
          error: -2
        }
      }
    }
    return err
  }
}
module.exports = {
  insertHouse
}