const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const fs = require('fs')
const path = require('path')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

// app.use(logger())
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
app.use(logger('combined', {
  stream: accessLogStream
}))

// eslint-disable-next-line no-path-concat
app.use(require('koa-static')(__dirname + '/public'))

// eslint-disable-next-line no-path-concat
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 记录日志
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
