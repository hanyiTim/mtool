const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const app = express();
const baseConfig = require('./webpack.config.base.js');
const utils = require('./utils.js');

var config = {...baseConfig};

Object.keys(utils.temp).map((item)=>{
  config.plugins.push(new HtmlWebpackPlugin(utils.temp[item]));
})

Object.keys(utils.entrys).map((item)=>{
  if(Object.prototype.toString.call(utils.entrys[item]) == "[object Array]"){
    utils.entrys[item].push(hotMiddlewareScript);
  }
  else if(Object.prototype.toString.call(utils.entrys[item]) == "[object String]"){
    utils.entrys[item] = [utils.entrys[item],hotMiddlewareScript];
  }
  config.entry[item] = utils.entrys[item]
})
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
    noInfo: true, 
    publicPath: config.output.publicPath,
    stats: {colors: true},
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
}));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});