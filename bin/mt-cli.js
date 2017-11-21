#!/usr/bin/env node

var program = require('commander'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),
    path = require('path'),
    log = require(path.join(__dirname,'../util/log.js')),
    fs = require('fs');

var templeteInfoJsonPath = path.join(__dirname,'../conf/conf-temp-info.json');

var templeteInfoJson = fs.readFileSync(templeteInfoJsonPath,'utf8'),
    templeteInfoObject = templeteInfoJson ? JSON.parse(templeteInfoJson):{};
const templeteInfo = [
    {
        type:'input',
        name:'name',
        message:'templeteName'
    },
    {
        type:'input',
        name:'info.projectPath',
        message:'projectInitPath'
    },
    {
        type:'input',
        name:'info.widgetPath',
        message:'widgetInitPath'
    }
]

program
    .option("-i,--init [projectName]","初始化项目，如果projectName为null，在当前目录初始化，否则，初始化projectName项目")
    .option("-w,--widget <widgetName>","初始化组件")
    .option("--set <templeteName>","设置当前模板")
    .option("--get","获取当前模板已经模板类表")
    .option("--add",'添加模板信息,project,widget模板路径')
    .option("--delete","删除模板信息")
    .parse(process.argv);


if(program.add){
    inquirer.prompt(templeteInfo).then(function(answers){
        if(answers.name && answers.name !== 'default'){
            templeteInfoObject[answers.name]=answers.info;
            fs.writeFileSync(templeteInfoJsonPath,JSON.stringify(templeteInfoObject),'utf8');
        }else{
            log.error('templeteName is null or templeteName is default');
        }
    })
}
if(program.get){
    if(Object.keys(templeteInfoObject).length > 0){
        log.success('default:',templeteInfoObject["default"],'\nlist:\n',templeteInfoObject);
    }else{
        log.success('木有配置');
    }
}
if(program.set){
    if(program.set && program.set !== true && templeteInfoObject[program.set]){
        templeteInfoObject["default"] = program.set;
    }
}