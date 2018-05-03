const config = require('../config/config')

const  {Pool} = require('pg')
const pool = new Pool(config)

var data= {};

/**
 * 异步请求函数,查询数据库
 * @returns {Promise<any>}
 */
const doGetUserInfo = function (){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        pool.connect().then(client=>{
            // insert 数据
            client.query("Select * FROM t_user_info").then(res=>{
                var value = res.rows
                resolve(value)
                return res
            })
        })
    });
    return p;
}

/**
 * 等待异步执行完成更新值函数
 * @returns {Promise<void>}
 */
const getUserInfo = async function(){
        try {
            data = await doGetUserInfo(); //设置字段值
            //如果返回 为何拿不到返回值
            //return value
        }catch (err) {
            console.log("出错了啊:"+err)
        }
}

module.exports = {
    async getUserInfo( ctx ) {
        await getUserInfo();

    ctx.body = {
        success: true,
        data: data
    }

}}