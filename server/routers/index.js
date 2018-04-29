/**
 * 所有子路由
 */
const router = require('koa-router')();
const main = require('./main');
const api = require('./api');

router.use('/api',api.routes(),api.allowedMethods());
router.use('*',main.routes(),main.allowedMethods());



module.exports = router;