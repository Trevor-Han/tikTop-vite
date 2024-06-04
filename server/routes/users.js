const router = require('koa-router')()

router.prefix('/users')

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!'
  next()
})

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response'
  next()
})

module.exports = router
