const path = require('path'),
      fisUtil = require('./fisutil.js'),
      fs = require('fs'),
      program = require('commander'),
      inquirer = require('inquirer'),
      conf = require('../conf.js');

let cwd = process.cwd();


exports.resolvePath = function(){
    let p = '';
    if(arguments.length > 0){
        p = path.join.apply(null,arguments);
    }
    return p
}

exports.getCwd = function(){
    return cwd;
}

exports.prompt = function(opt){
    return inquirer.prompt(opt)
}

exports.copy = function(){
    return fisUtil.copy.apply(null,arguments);
}

exports.readJSON = function(){
    try{
        return fisUtil.readJSON.apply(null,arguments);
    }catch(e){
        console.log(e);
        return false;
    }
    
}

exports.write = function(){
    return fisUtil.write.apply(null,arguments);
}
