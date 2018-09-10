#!/usr/bin/env node

const program = require('commander'),
      path = require('path'),
      util = require('../util/util.js');

let comp = require(path.join(util.getCwd(),'/component/mt-plugins-init'));

if(comp){
    addOption(comp.options)
}
function addOption(obj){
    let keys = Object.keys(obj);
    if(Array.isArray(keys)){
        keys.forEach((key)=>{
            program.option(`${key}`,`${obj[key]}`);
        })
        program.parse(process.argv);
        comp.run(program);
    }
}






