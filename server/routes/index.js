const router = require('koa-router')()

router.get('/', async(ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
  next()
})

router.get('/string', async(ctx, next) => {
  ctx.body = 'koa2 string'
  next()
})

router.get('/json', async(ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
  next()
})

module.exports = router
