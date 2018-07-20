/**
 * Sequelize实例化
 * @type {Sequelize}
 */
const config = require('./config/config')
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
    timezone: '+08:00'
});
module.exports = sequelize;