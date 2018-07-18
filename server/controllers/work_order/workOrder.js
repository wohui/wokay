const config = require('../../config/config')
const moment = require('moment');
const {Pool} = require('pg')
const pool = new Pool(config)

var data = {};


//Sequelize
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

//WorkOrder模型
const WorkOrder = sequelize.define('workOrder', {
        title: {
            type: Sequelize.STRING
        },
        start_by:{
            type: Sequelize.STRING
        },
    },

    {
        tableName: 't_work_order_info',
        freezeTableName: true
    }
);

const workOrder = WorkOrder.sync({ force: false });
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
        WorkOrder.findAll(
            {
                limit: 2
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
        //做一些异步操作
        pool.connect().then(client => {
            //获取当前时间
            const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            // insert 数据
            client.query("insert into t_work_order_info (title,start_by,fcar_module,is_assigned,assigned_time,is_fcar_bug,solve_name,solve_time,tester,solved_result,note,create_user,create_time,modify_time) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)", [data.title, data.start_by, data.fcar_module, data.is_assigned, data.assigned_time, data.is_fcar_bug, data.solve_name, data.solve_time, data.tester, data.solved_result, data.note, data.create_user, currentTime, null]).then(res => {
                var value = res
                resolve(value)
                return res
            })
        })
    });
    return p;
}
const addWorkOrder = async function (data) {

    try {
        data = await doAddWorkOrder(data); //设置字段
        //如果返回 为何拿不到返回值
        //return value
    } catch (err) {
        console.log("出错了啊:" + err)
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
        //做一些异步操作
        pool.connect().then(client => {
            //获取当前时间
            const modify_time = moment().format('YYYY-MM-DD HH:mm:ss');

            // 组装query
            let query = ' where '
            if (data.title !== undefined && data.title !== '') {
                console.log(data.title)
                query += "title = '" + data.title + "' AND ";
            }
            if (data.solve_name !== undefined && data.solve_name !== '') {
                query += "solve_name = '" + data.solve_name + "' AND ";
            }
            if (data.start_by !== undefined && data.start_by !== '') {
                query += "start_by = '" + data.start_by + "' AND ";
            }
            if (data.tester !== undefined && data.tester !== '') {
                query += "tester = '" + data.tester + "' AND ";
            }
            query = query + "1=1";

            console.log("query" + query);

            client.query("select * from t_work_order_info" + query).then(res => {
                let value = res.rows
                resolve(value)
            }).catch((err) => {
                console.log("doQueryWorkOrder出错:" + err)
                reject(err)
            })
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