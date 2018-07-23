const config = require('../../config/config')
const moment = require('moment');
const {Pool} = require('pg')
const pool = new Pool(config)

//导入数据模型
//const WorkOrder = require('../../models/workOrder')
//
const sequelize = require('../../sequelize')
const WorkOrder = sequelize.import('../../models/workOrder');


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
                limit:50
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
        return await doQueryAllWorkOrder(); //设置字段值
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
        WorkOrder.destroy({
            where:{
                id:data.id
            }}
        ).then(() =>{
            console.log('doDeleteWorkOrderById完成');
            resolve(true)
        }).catch(err =>{
            console.log('doDeleteWorkOrderById错误：'+err);
            reject(err)
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
    let res = {}
    try {
        res.status = await doDeleteWorkOrderById(req_data); //设置字段值
        res.msg = 'success';
        //如果返回 为何拿不到返回值
        //return value
    } catch (err) {
        console.log("deleteWorkOrderById出错:" + err)
        res.status = false
        res.msg = err;
    }
    return res;
}
/**
 * 更新issue
 * @param data
 * @returns {Promise<any>}
 */

const doUpdateWorkOrderById = function (data) {
    var p = new Promise(function (resolve, reject) {
        WorkOrder.update(data,{
         where:{
            id:data.id
         }}
        ).then(() =>{
            console.log('doUpdateWorkOrderById完成');
            resolve(true)
        }).catch(err =>{
            console.log('doUpdateWorkOrderById错误：'+err);
            reject(err)
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
    let res = {}
    try {
        res.status  = await doUpdateWorkOrderById(data); //设置字段
        res.msg = 'success';
        //如果返回 为何拿不到返回值
    } catch (err) {
        res.status = false
        res.msg = err;
        console.log("出错了:" + err)
    }
    return res
}
const doQueryWorkOrder = function (data) {
    var p = new Promise(function (resolve, reject) {
        /**
         *先同步创建表
         */
        sequelize.sync({force:false});

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
        let data = await getAllWorkOrder();
        ctx.body = {
            success: true,
            data: data
        }

    },
    async addWorkOrder(ctx) {
        let req_data = ctx.request.body.data;
        let data = await addWorkOrder(req_data);

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
        let data = await deleteWorkOrderById(req_data);

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
    async updateWorkOrder(ctx) {
        let req_data = ctx.request.body.data;
        let data = await updateWorkOrderById(req_data);
        ctx.body = {
            success: true,
            data:data
        }
    },

    /**
     * 根据查询条件查询工单数据
     */
    async queryWorkOrder(ctx) {
        let req_data = ctx.request.body.data;
        let data = await queryWorkOrder(req_data);

        ctx.body = {
            success: true,
            data: data
        }
    }
}