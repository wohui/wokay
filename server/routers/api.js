/**
 * restful api getUser子路由
 */

const router = require('koa-router')()
const categoryInfoController = require('../controllers/category/category')
const issueController = require('../controllers/issue/issue')
const workOrderController = require('../controllers/work_order/workOrder')
const routers = router
    .get('/getCategoryInfo',categoryInfoController.getCategoryInfo)
    .get('/getAllCategoryName',categoryInfoController.getAllCategoryName)
    .get('/deleteCategoryById',categoryInfoController.deleteCategoryById)
    .post('/addCategoryInfo',categoryInfoController.addCategoryInfo)
    .post('/addIssue',issueController.addIssue)
    .post('/updateIssue',issueController.updateIssueById)
    .get('/getIssueInfo',issueController.getIssueInfo)
    .get('/deleteIssue',issueController.deleteIssue)
    .get('/queryAllWorkOrder',workOrderController.queryAllWorkOrder)
    .post('/queryWorkOrder',workOrderController.queryWorkOrder)
    .post('/addWorkOrder',workOrderController.addWorkOrder)
module.exports = routers;
