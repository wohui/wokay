const config = require('../../config/config')
const moment = require('moment');
const {Pool} = require('pg')
const pool = new Pool(config)

//导入数据模型
//const WorkOrder = require('../../models/workOrder')
//
const sequelize = require('../../sequelize')
const WorkOrder = sequelize.import('../../models/workOrder');
var data = {};


/**
 * 异步请求函数,查询数据库
 * @returns {Promise<any>}
 */
const doQueryAllWorkOrder = function () {
    var p = new Promise(function (resolve, reject) {
        // //做一些异步操作
        // pool.connect().then(client => {
        //     // insert 数据
        //     client.query("Select * FROM t_work_order_info").then(res => {
        //         var value = res.rows
        //         resolve(value)
        //         return res
        //     })
        // })
        // WorkOrder.sync({force: false}).then(() => {
        //     // 表已创建
        //     return WorkOrder.create({
        //         title: 'John',
        //         is_fcar_bug: 1,
        //     });
        // });
        WorkOrder.findAll(
            {
                limit: 10
            }
        ).then(workOrder => {
            console.log("sequelize:" + workOrder)
            resolve(workOrder)
        })


    });
    return p;


};

const getAllWorkOrder = async function () {
    try {
        data = await doQueryAllWorkOrder(); //设置字段值
        //如果返回 为何拿不到返回值
        //return value
    } catch (err) {
        console.log("getAllWorkOrderInfo出错了:" + err)
    }
}

const doAddWorkOrder = function (data) {
    var p = new Promise(function (resolve, reject) {
        WorkOrder.create(data).then(() =>{
           console.log('doAddWorkOrder完成');
        }).catch(err =>{
            console.log('doAddWorkOrder错误：'+err);
        })
    });
    return p;
}
const addWorkOrder = async function (data) {

    try {
        data = await doAddWorkOrder(data); //设置字段
        //如果返回 为何拿不到返回值
        //return value
        console.log("addWorkOrder完成")
    } catch (err) {
        console.log("addWorkOrder出错了:" + err)
    }
}
/**
 *
 * @param req_data
 * @returns {Promise<any>}
 */
const doDeleteWorkOrderById = function (data) {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        pool.connect().then(client => {
            // insert 数据
            client.query("delete  FROM t_work_order_info where id = $1", [data.id]).then(res => {
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
const deleteWorkOrderById = async function (req_data) {
    try {
        data = await doDeleteWorkOrderById(req_data); //设置字段值
        //如果返回 为何拿不到返回值
        //return value
    } catch (err) {
        console.log("deleteWorkOrderById:" + err)
    }
}
/**
 * 更新issue
 * @param data
 * @returns {Promise<any>}
 */

const doUpdateWorkOrderById = function (data) {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        pool.connect().then(client => {
            //获取当前时间
            const modify_time = moment().format('YYYY-MM-DD HH:mm:ss');
            // insert 数据
            client.query("update  t_work_order_info set title=$1,category=$2,content=$3,create_user=$4,modify_time=$5 where id=$6", [data.title, data.category, data.content, data.create_user, modify_time, data.id]).then(res => {
                var value = res
                resolve(value)
                return res
            })
        })
    });
    return p;
}
/**
 *
 * @param data
 * @returns {Promise<void>}
 */
const updateWorkOrderById = async function (data) {
    try {
        data = await doUpdateWorkOrderById(data); //设置字段
        //如果返回 为何拿不到返回值
        //return value
    } catch (err) {
        console.log("出错了啊:" + err)
    }
}
const doQueryWorkOrder = function (data) {
    var p = new Promise(function (resolve, reject) {
        console.log("--------data"+data)
        WorkOrder.findAll(
            {
                where: data,
                limit: 10
            }
        ).then(workOrder => {
            console.log("sequelize:" + workOrder)
            resolve(workOrder)
        })


    });
    return p;


}

const queryWorkOrder = async function (data) {
    try {
        return await doQueryWorkOrder(data)
    } catch (err) {
        console.log("queryWorkOrder出错:" + err)
    }

}


/**
 *
 * @type {{queryAllWorkOrder: (function(*): Promise), addWorkOrder: (function(*): Promise), deleteWorkOrder: (function(*): Promise.<void>), updateWorkOrderById: (function(*): Promise.<void>)}}
 */
module.exports = {
    async queryAllWorkOrder(ctx) {
        await getAllWorkOrder();
        ctx.body = {
            success: true,
            data: data
        }

    },
    async addWorkOrder(ctx) {
        let req_data = ctx.request.body.data;
        console.log(req_data.title)
        await addWorkOrder(req_data);

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
    async deleteWorkOrder(ctx) {
        let req_data = ctx.request.query;
        await deleteWorkOrderById(req_data);

        ctx.body = {
            success: true,
            data: data
        }

    },
    /**
     * 更新数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async updateWorkOrderById(ctx) {
        let req_data = ctx.request.body.data;
        await updateWorkOrderById(req_data);

        ctx.body = {
            success: true,
            data: data
        }
    },

    /**
     * 根据查询条件查询工单数据
     */
    async queryWorkOrder(ctx) {
        let data = ctx.request.body.data;
        let res = await queryWorkOrder(data);

        ctx.body = {
            success: true,
            data: res
        }
    }
}