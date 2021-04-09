// jwt加密秘钥
const JWT_CONFIG = {
  SECRET_KEY: 'dasd23das$%232fsw1213123sd%*12cd',
  EXP: 7 * 24 * 60 * 60,// 默认token有效时长为7天,7*24*60*60
}
// token配置
const TOKEN_CONFIG = {
  EXPIRES: 7 * 24 * 60 * 60 * 1000,// 默认token有效时长为7天,7*24*60*60
  SECURE: false,// https协议设置
  HTTP_ONLY: false,// 防止xss攻击
}
module.exports = {
  JWT_CONFIG,
  TOKEN_CONFIG
}
