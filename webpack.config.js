var webpack = require('webpack')
var path = require('path')
var config = require('./package.json')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry: {
        index: path.resolve(ROOT_PATH, 'index.js')
    },
    output: {
        path: __dirname + '/dist',
        filename: config.project + '.js'
    },
    // 'source-map' or 'inline-source-map'
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!' +
                    'sass?sourceMap'
                )
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url?limit=10000name=[path][name].[ext]?[hash:8]&context=font'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(config.project + '.css')
    ]
}
if (process.env.NODE_ENV !== 'production') {
    module.exports.output.publicPath = '/dist/'
}
