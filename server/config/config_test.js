var  config ={
// 数据库配置
        user:"wokay",
        database:"wokay",
        password:"h*****1**",
        host: '10.**.*.*8',
        port:5432,
        // 扩展属性
        max:20, // 连接池最大连接数
        idleTimeoutMillis:3000, // 连接最大空闲时间 3s

}

module.exports = config
