var products = [{
    name:"i5",
    price:1000
},{
    name:"ui",
    price:2000
}];

module.exports = {
    async getUserInfo( ctx ) {
    ctx.body = {
        success: true,
        data: {
            text: 'my name is koa.js!'
        }
    }

}}