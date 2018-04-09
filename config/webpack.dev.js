var path = require('path')

//配置文件是放在config的目录下的，所有这里定义了一个项目的根目录变量
var projectRootPath = path.resolve(__dirname,'..')

var config = {
    entry: path.resolve(projectRootPath,'client/app.js'),
    output:{
        path: path.resolve(projectRootPath,'static','build'),
        filename: 'bundle.js',
        publicPath: '/static/build'
    },
    module: {

        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            // presets: ['es2015', 'react'],
                            cacheDirectory: true
                        }
                    }
                ]
            },
        ]
    },
};

module.exports=config;

