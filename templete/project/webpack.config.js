var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        screw_ie8: false
    },
    mangle : {
        screw_ie8 : false
    }
})

var definePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})

var isProduction = (process.env.NODE_ENV === 'production')

console.log(isProduction);
var isDebug = (process.env.NODE_ENV === 'debug')

var config = {
    entry: {
        "index":'./page/index/index.jsx',
    },
    output: {
        path: isProduction ? "./dist_prod" :"./dist",
        filename: isProduction ? '[name].[hash:5].js' : '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: isProduction || isDebug ? '' : /node_modules/,
                query: {
                    cacheDirectory: !isProduction,
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=10000'
            },
            {
                test: /\.(swf|woff|woff2|eot|ttf|svg)$/,
                loader: 'file'
            },
            {
                test: /\.less$/,
                loader: 'style!css?modules&localIdentName=[hash:base64:5]!postcss?pack=currentAutoPrefixer!less?relativeUrls'
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules&localIdentName=[local]!postcss?pack=currentAutoPrefixer'
            }
        ]
    },
    postcss: function() {
        return {
            currentAutoPrefixer: [
                autoprefixer({
                    browsers: ['ie >= 8']
                })
            ]
        }
    },
    plugins: [
        definePlugin,
        new HtmlWebpackPlugin({
            title: '主页',
            path: 'dist',
            filename: 'index.html',
            chunks: [
                'index'
            ],
            template: './page/index/index.html'
        })
    ]
}

if(isProduction) {
    config.plugins.push(uglifyPlugin)
}

module.exports = config
