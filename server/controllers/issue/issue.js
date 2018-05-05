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
/**
 *
 * @param req_data
 * @returns {Promise<any>}
 */
const doDeleteIssueById = function (req_data){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        pool.connect().then(client=>{
            // insert 数据
            client.query("delete  FROM t_issues_info where id = $1",[req_data.id]).then(res=>{
                var value = res.rows
                resolve(value)
                return res
            })
        })
    });
    return p;
}
/**
 *
 * @param req_data
 * @returns {Promise<void>}
 */
const deleteIssueById = async function(req_data){
    try {
        data = await doDeleteIssueById(req_data); //设置字段值
        //如果返回 为何拿不到返回值
        //return value
    }catch (err) {
        console.log("deleteIssueById出错了啊:"+err)
    }
}

/**
 *
 * @type {{getIssueInfo(*): Promise<void>, addIssue(*): Promise<void>, deleteIssue(*): Promise<void>}}
 */
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

    },
    /**
     * 删除
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteIssue( ctx ) {
        let req_data=  ctx.request.query;
        await deleteIssueById(req_data);

        ctx.body = {
            success: true,
            data: data
        }

    }

}