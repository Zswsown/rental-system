/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = function (appInfo) {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1617716464823_6406'

  // add your middleware config here
  config.middleware = []

  // jwt登录鉴权配置
  config.jwt = {
    secret: 'Zswsown'//自定义token加密字符串
  }

  // 跨域配置
  // 安全配置
  config.security = {
    // 跨站请求伪造
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://localhost:8080'],//允许访问接口的白名单
  }
  // 跨域详细配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',//允许的请求方法
  }

  // add your user config here
  const userConfig = {

  }

  return {
    ...config,
    ...userConfig,
  }
}
