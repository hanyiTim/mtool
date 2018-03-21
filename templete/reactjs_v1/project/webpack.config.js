var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    path = require("path");


var definePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
var uglifyPlugin = new UglifyJsPlugin();
var cleanWebpackPlugin = new CleanWebpackPlugin(
    ['dist_prod/static'],{
        root:__dirname,
        verbose:  true,
        dry:false
    }
);
var isProduction = (process.env.NODE_ENV === 'production');


var config = {
    entry:{
        "index":"./page/index/index.jsx"
    },
    output:{
        path:isProduction ? path.resolve(__dirname,"dist_prod/static") : path.resolve(__dirname,'dist/static'),
        filename:isProduction ? "[name].[hash:5].js":"[name].js"
    },
    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['es2015', 'stage-0', 'react'],
                        plugins: ['babel-plugin-transform-runtime']
                    }
                }
            },
            {
                test:/\.sass$/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    },
                    {
                        loader: 'postcss-loader', 
                        options: { 
                            config:{
                                path:path.join(__dirname,"/postcss.config.js")
                            }
                        }
                    },
                    {
                        loader:"sass-loader"
                    }
                ]
            },
            {
                test:/\.less$/,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    },
                    {
                        loader: 'postcss-loader', 
                        options: { 
                            config:{
                                path:path.join(__dirname,"/postcss.config.js")
                            }
                        }
                    },
                    {
                        loader:"less-loader"
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:"css-loader"
                    },
                    {
                        loader: 'postcss-loader', 
                        options: { 
                            config:{
                                path:path.join(__dirname,"/postcss.config.js")
                            }
                        }
                    }
                ]
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        limit:10000
                    }
                }
            },
            {
                test: /\.(swf|woff|woff2|eot|ttf|svg)$/,
                use:"file-loader"
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title:"首页",
            filename:"../index.html",
            template:"./page/index/index.html",
            chunks:[
                "index"
            ]
        })
    ]
}

if(isProduction){
    config.plugins.push(uglifyPlugin);
    config.plugins.push(cleanWebpackPlugin);
}
module.exports=config;