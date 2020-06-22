const Router = require('koa-better-router')
const router = Router().loadMethods()
const fs = require('fs')
const awsTranscoder = require('./modules/aws-transcoder.js')
const Koa = require('koa')
const app = new Koa()

function splitHandler (handler) {
  const r = handler.split('.')
  return [r.pop(), r.join('.') + '.js']
}

let config = JSON.parse(fs.readFileSync(`serverless.json`, 'utf-8'))
for (func in config.functions) {
  const path = config.functions[func].replace('${file(', '').replace(')}', '')
  let fconf = JSON.parse(fs.readFileSync(path, 'utf-8'))
  console.log(func)
  const ret = splitHandler(fconf.handler)
  const handler = require('../../' + ret[1])[ret[0]]
  fconf.events.forEach(evt => {
    router.addRoute(evt.http.method.toUpperCase(), `${evt.http.path}`, async (ctx, next) => {
      ctx.body = await handler(ctx)
      await next()
    })
  })
}

app.use(awsTranscoder.request)
app.use(router.middleware())
app.use(awsTranscoder.response)

app.listen(3322)
