// 1.配置打包入口
// 2.配置打包出口
// 这个文件，用的是nodejs的语法。
// 需要使用nodejs提供的方法，来读取当前目录的绝对路径
const path = require('path');

//引入vue-loader15所依赖的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: { //专门用于配置所有的第三方模块的 loader 加载器
        rules: [ //这里是设置第三方加载器的匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(jpg|jpeg|gif|png|bmp)$/, use: 'url-loader'},
            {test: /\.(otf|eot|svg|ttf|woff|woff2)$/, use: 'url-loader'},
            // 必须除去这个文件
            {test: /\.js$/, use: 'babel-loader',exclude:/node_modules/},
            // 处理以vue结尾的loader
            {test: /\.vue$/, use: 'vue-loader'},
        ]
    },
    resolve: {
        alias: {
            // "vue$": 'vue/dist/vue.js'
        }
    },
    plugins: [
        new VueLoaderPlugin() //配置插件节点
    ]
}