var path = require('path')
const webpack = require("webpack")

//配置文件是放在config的目录下的，所有这里定义了一个项目的根目录变量
var projectRootPath = path.resolve(__dirname,'..')

var config = {
    mode:"development",
    entry: {'index':'./client/app.js'},
    //生成文件路径
    output:{
        path: path.resolve(projectRootPath,'static','build'),
        filename: 'bundle.js',
        publicPath: '/static/build'
    },
    plugins: [
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react'],
                            cacheDirectory: true
                        }
                    }
                    ]
            },
        ]
    },
    //设置devServer转发
    devServer: {
        host: '0.0.0.0',
        port: 3002,
        hot: true,
        inline: true,
        contentBase: path.resolve(projectRootPath,'static'),//单页html位置
        historyApiFallback: true,
        disableHostCheck: true,
    },

};
module.exports = config;
