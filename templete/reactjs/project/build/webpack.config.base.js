var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    path = require("path");

var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var definePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
var uglifyPlugin = new UglifyJsPlugin();
var cleanWebpackPlugin = new CleanWebpackPlugin(
    ['dist','dist_prod'],{
        root:__dirname,
        verbose:  true,
        dry:false
    }
);
var config = {
    entry:{},
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"[name].js",
        publicPath:"/",
    },
    devtool: 'inline-source-map',
    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader:"babel-loader",
                        options:{
                            presets:['es2015', 'stage-0', 'react'],
                            plugins: ['babel-plugin-transform-runtime']
                        }
                    },
                    {
                        loader:"webpack-px-to-rem",
                        options:{
                            // 这个配置是可选的 
                            query:{
                                // 1rem=npx 默认为 10 
                                basePx:10,
                                // 只会转换大于min的px 默认为0 
                                // 因为很小的px（比如border的1px）转换为rem后在很小的设备上结果会小于1px，有的设备就会不显示 
                                min:1,
                                // 转换后的rem值保留的小数点后位数 默认为3 
                                floatWidth:3
                            }
                        }
                    }
                ]
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
        cleanWebpackPlugin,
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports=config;