const config = require('../../config/config')
const moment = require('moment');
const  {Pool} = require('pg')
const pool = new Pool(config)

var data= {};


/**
 * 异步请求函数,查询数据库
 * @returns {Promise<any>}
 */
const doQueryCategoryInfo = function (){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        pool.connect().then(client=>{
            // insert 数据
            client.query("Select * FROM t_category_info").then(res=>{
                var value = res.rows
                resolve(value)
                return res
            })
        })
    });
    return p;
}

const getCategoryInfo = async function(){
    try {
        data = await doQueryCategoryInfo(); //设置字段值
        //如果返回 为何拿不到返回值
        //return value
    }catch (err) {
        console.log("出错了啊:"+err)
    }
}

const doAddCategoryInfo = function (category_name,create_user){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        pool.connect().then(client=>{
            //获取当前时间
            const currentTime = moment().format('YYYY-DD-MM HH:mm:ss');
            console.log(currentTime)
            // insert 数据
            client.query("insert into t_category_info (name,create_user,create_time) VALUES($1,$2,$3)",[category_name,create_user,currentTime]).then(res=>{
                var value = res
                resolve(value)
                return res
            })
        })
    });
    return p;
}
const addCategoryInfo = async function(category_name,create_user){
    try {
        data = await doAddCategoryInfo(category_name,create_user); //设置字段
        //如果返回 为何拿不到返回值
        //return value
    }catch (err) {
        console.log("出错了啊:"+err)
    }
}

module.exports = {
    async getCategoryInfo( ctx ) {
        await getCategoryInfo();

        ctx.body = {
            success: true,
            data: data
        }

    },
    async addCategoryInfo(ctx ) {
        let category_name = ctx.request.body.data.category_name
        let create_user =  ctx.request.body.data.create_user
        await addCategoryInfo(category_name,create_user);

        ctx.body = {
            success: true,
            data: data
        }

    }

}