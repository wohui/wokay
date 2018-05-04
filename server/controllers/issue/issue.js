const config = require('../../config/config')
const moment = require('moment');
const  {Pool} = require('pg')
const pool = new Pool(config)

var data= {};


/**
 * 异步请求函数,查询数据库
 * @returns {Promise<any>}
 */
const doQueryIssueInfo = function (){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        pool.connect().then(client=>{
            // insert 数据
            client.query("Select * FROM t_issues_info").then(res=>{
                var value = res.rows
                resolve(value)
                return res
            })
        })
    });
    return p;
}

const getIssueInfo = async function(){
    try {
        data = await doQueryIssueInfo(); //设置字段值
        //如果返回 为何拿不到返回值
        //return value
    }catch (err) {
        console.log("getIssueInfo出错了啊:"+err)
    }
}

const doAddIssue = function (data){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        pool.connect().then(client=>{
            //获取当前时间
            const currentTime = moment().format('YYYY-DD-MM HH:mm:ss');
            // insert 数据
            client.query("insert into t_issues_info (title,category,content,create_user,create_time) VALUES($1,$2,$3,$4,$5)",[data.title,data.category,data.content,data.create_user,currentTime]).then(res=>{
                var value = res
                resolve(value)
                return res
            })
        })
    });
    return p;
}
const addIssue = async function(data){
    try {
        data = await doAddIssue(data); //设置字段
        //如果返回 为何拿不到返回值
        //return value
    }catch (err) {
        console.log("出错了啊:"+err)
    }
}

module.exports = {
    async getIssueInfo( ctx ) {
        await getIssueInfo();
        ctx.body = {
            success: true,
            data: data
        }

    },
    async addIssue( ctx ) {
        let issueInfo =  ctx.request.body.data;
        await addIssue(issueInfo);

        ctx.body = {
            success: true,
            data: data
        }

    }

}