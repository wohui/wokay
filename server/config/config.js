const  testConfig ='./config_test.js'

var config = null;

if (1==1){
    config = require(testConfig)
    console.log('load(testConfig)')
}

module.exports = config;