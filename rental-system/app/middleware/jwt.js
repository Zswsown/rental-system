'use strict'
// jwt登录鉴权
const jwt = require('jsonwebtoken') //引入jsonwebtoken
const { JWT_CONFIG } = require('../public/jwt') // jwt加密秘钥

module.exports = (options, app) => {
  // 用户登录拦截器
  return async function userInterceptor (ctx, next) {
    let authToken = ctx.header.authorization // 获取header里的Authorization
    if (authToken) {
      authToken = authToken.substring(7) // 取Authorization中的`Bearer `后的token
      const res = verifyToken(authToken) // 解密前端发送过来的Token
      if (res.buserId || res.guserId) {
        await next()
      } else {
        ctx.body = { code: 5001, msg: '登录状态已过期' }
      }
    } else {
      ctx.body = { code: 5002, msg: '请登陆后再进行操作' }
    }
  }
}

// 解密token
function verifyToken (token) {
  let res = ''
  try {
    const result = jwt.verify(token, JWT_CONFIG.SECRET_KEY, { algorithms: ['HS256'] })
    res = result.data
  } catch (e) {
    console.log(e)
  }
  return res
}

// module.exports = (options, app) => {
//   return async function userInterceptor(ctx, next) {
//     let authToken = ctx.header.authorization // 获取header里的authorization
//     if (authToken) {
//       authToken = authToken.substring(7)
//       const res = verifyToken(authToken) // 解密获取的Token
//       if (res.corpid && res.userid) {
//         // 如果需要限制单端登陆或者使用过程中废止某个token，或者更改token的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效
//         // 此处使用redis进行保存
//         const redis_token = await app.redis.get('loginToken').get(res.corpid + res.userid) // 获取保存的token
//         if (authToken === redis_token) {
//           ctx.locals.corpid = res.corpid
//           ctx.locals.userid = res.userid
//           await next()
//         } else {
//           ctx.body = { code: 50012, msg: '您的账号已在其他地方登录' }
//         }
//       } else {
//         ctx.body = { code: 50012, msg: '登录状态已过期' }
//       }
//     } else {
//       ctx.body = { code: 50008, msg: '请登陆后再进行操作' }
//     }
//   }
// }