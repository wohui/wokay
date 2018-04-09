const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const app = new Koa()

//const routers = require('./routers/index')

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './../static')
))



// 初始化路由中间件
//app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(3001)
console.log(`the server is start at port 3001`)