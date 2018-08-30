var path = require('path');
var baseConfig = require('./webpack.config.base');
var utils = require('./utils.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {...baseConfig};

config.output.path = path.join(__dirname,"dist/static");
config.output.publicPath = "./static";
Object.keys(utils.temp).map((item)=>{
    utils.temp[item].filename = "../"+utils.temp[item].filename;
    config.plugins.push(new HtmlWebpackPlugin(utils.temp[item]));
})

Object.keys(utils.entrys).map((item)=>{
    config.entry[item] = utils.entrys[item]
})

module.exports = config;