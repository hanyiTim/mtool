#!/usr/bin/env node

const program = require('commander'),
      path = require('path');

let comp = require(path.join(__dirname,'../component/mt-plugins-${name}'));

if(comp){
    addOption(comp.options)
}
function addOption(obj){
    let keys = Object.keys(obj);
    if(Array.isArray(obj)){
        keys.forEach((key)=>{
            program.option(key,obj[key]);
        })
        program.parse(process.argv);
        comp.run && comp.run.call && comp.run(program);
    }
}






