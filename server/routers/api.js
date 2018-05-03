/**
 * restful api getUser子路由
 */

const router = require('koa-router')()
const userInfoController = require('../controllers/api');
const categoryInfoController = require('../controllers/category/category')
const issueController = require('../controllers/issue/issue') //
const routers = router
    .get('/getCategoryInfo',categoryInfoController.getCategoryInfo)
    .get('/getUserInfo',userInfoController.getUserInfo) //查询类别信息
    .post('/addCategoryInfo',categoryInfoController.addCategoryInfo)
    .post('/addIssue',issueController.addIssue)
    .get('/getIssueInfo',issueController.getIssueInfo)
module.exports = routers;
