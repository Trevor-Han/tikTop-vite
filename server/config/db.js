let MYSQL_CONFIG
let REDIS_CONFIG

if (process.env.NODE_ENV === 'dev') {
  MYSQL_CONFIG = {
    databaseName: 'demo',
    databaseUserName: 'root',
    databasePassword: 'root',
    conf: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
      }
    }
  }
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: '6379'
  }
} else if (process.env.NODE_ENV === 'pro') {
  MYSQL_CONFIG = {
    databaseName: 'demo',
    databaseUserName: 'root',
    databasePassword: 'root',
    conf: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
      }
    }
  }
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: '6379'
  }
}
module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}
