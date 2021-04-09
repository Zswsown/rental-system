'use strict';
// get the client
const mysql = require('mysql2/promise');
// get mysql database config
const dbConfig = require('./config');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: dbConfig.HOST,//主机
  port: dbConfig.PORT,//端口号
  user: dbConfig.USER,//用户
  password: dbConfig.PASSWORD,//密码
  database: dbConfig.DATABASE,//数据库
  connectionLimit: dbConfig.CONNECTION_LIMIT,//限制连接的最大数量
  multipleStatements: true,//多语句查询
});

module.exports = pool;
