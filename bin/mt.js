#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');

const util = require('../util/util.js');


let componentDir = util.resolvePath(util.getCwd(),'/component/')
fs.readdir(componentDir,(err,files)=>{
    if(!err){
        files.forEach((item) => {
            if(/^mt-plugins/.test(item)){
                let path = util.resolvePath(util.getCwd(),`/component/${item}/index.js`);
                try{
                    let pluginsInfo = require(path);
                    setProgram(pluginsInfo);
                }catch(e){
                    console.log(`${path} not found`);
                }
            }
        });
        program.parse(process.argv);
    }
});

function setProgram(pluginsInfo){
    let {name,desc} = pluginsInfo || {}
    program.command(`${name}`,`${desc}`);
}
function relactivePath(dir){
    let result = "";
    if(dir){
        result = path.join(__dirname,dir);
    }
    return result;
}




