const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const app = new Koa()

//配置webpack
const webpack =  require('webpack')
const webpackMiddleware =  require('koa-webpack-middleware')
const devMiddleware = webpackMiddleware.devMiddleware
const hotMiddleware = webpackMiddleware.hotMiddleware
const webpackConf = require('../config/webpack.dev')
const compiler = webpack(webpackConf)



//const routers = require('./routers/index')

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './../static')
))

//webpack中间件
app.use(devMiddleware(compiler, {
    noInfo: true,		//是否打印 Hash Version等信息
    hot:true,
    filename:"bundle.js",
    stats: {
        colors: true
    },
    historyApiFallback: true,
    publicPath: webpackConf.output.publicPath
}))
app.use(hotMiddleware(compiler,{
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000
}))


// 初始化路由中间件
//app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(3001)
console.log(`the server is start at port 3001`)