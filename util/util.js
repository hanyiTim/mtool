/**
 * create 2017/11/22  by yogo
 */
var fs =require('fs')
function factory(type){
    return function(arg){
        return Object.prototype.toString.call(arg) == `[object ${type}]`;
    }
}
var isObject = factory('Object');
var isArray = factory('Array');
var isFunction = factory('Function');
function isFile(path){
    return fs.existsSync(path) && fs.statSync(path).isFile();
}
function isDir(path){
    return fs.exists(path) && fs.statSync(path).isDirectory();
}
function objectEmpty(arg){
    if(isObject(arg) && isArray(Object.keys(arg))){
        return Object.keys(arg).length > 0  ? false : true
    }else{
        return true
    }
}

module.exports={
    isObject:isObject,
    isArray:isArray,
    isFunction:isFunction,
    objectEmpty:objectEmpty,
    isFile:isFile,
    isDir:isDir
}