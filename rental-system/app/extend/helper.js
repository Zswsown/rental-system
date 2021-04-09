const jwt = require('jsonwebtoken') //引入jsonwebtoken
const { JWT_CONFIG } = require('../public/jwt') // jwt加密秘钥
module.exports = {
  // 解析token
  getUserInfo (token) {
    const { ctx, app } = this
    let authToken = ctx.header.authorization // 获取header里的Authorization
    if (authToken) {
      authToken = authToken.substring(7) // 取Authorization中的`Bearer `后的token
      const res = jwt.verify(authToken, JWT_CONFIG[`SECRET_KEY`], { algorithms: ['HS256'] })// 解密前端发送过来的Token
      const { exp } = res // token结束时间
      const current = Math.floor(Date.now() / 1000) //当前时间
      if (current <= exp) { // 验证 token 是否失效
        return {
          data: res
        }
      }
      else {
        return { data: null }
      }
    }
    else {
      return { data: null }
    }
  }
}