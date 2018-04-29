//
// module.exports =async ( ctx ) => {
//     await ctx.render('index')
// }

module.exports = {
    async getPage( ctx ) {
        await ctx.render('index')

    }}