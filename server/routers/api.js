/**
 * restful api getUser子路由
 */

const router = require('koa-router')()
const userInfoController = require('../controllers/api');

const routers = router
    .get('/getUserInfo',userInfoController.getUserInfo)

module.exports = routers;
