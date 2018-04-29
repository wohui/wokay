const router = require('koa-router')()
const main = require('../controllers/main');

const routers = router
    .get('*',main.getPage)


module.exports = routers;
