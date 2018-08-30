#!/usr/bin/env node
//node 模块
var program = require('commander'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');
//js 模块
var fisUtil = require(path.join(__dirname,"../util/fis_util.js"));

//file
var Info = fisUtil.readJSON(path.join(__dirname,"../conf/conf-inquirer-info.json"));
var tempInfo = fisUtil.readJSON(path.join(__dirname,"../conf/conf-temp-path.json"));
program
    .option('--create','新建项目')
    .option('--init','初始化项目')
    .parse(process.argv);


if(program.create){
    inquirer.prompt(Info.create).then(function(answers){
        if(answers.projectName && answers.projectPath && answers.projectType){
            if(fisUtil.isDir(answers.projectPath)){
                console.log('该路径已存在');
                return false;
            }
            if(!answers.projectPath){
                console.log("projectPath is null")
                return;
            }
            fisUtil.mkdir(answers.projectPath);
            fisUtil.copy(path.join(__dirname,"../",tempInfo[answers.projectType]["project"]),answers.projectPath);
        }
    })
}
else if(program.init){
    inquirer.prompt(Info.init).then(function(answers){
        if(answers.projectType){
            fisUtil.copy(path.join(__dirname,"../",tempInfo[answers.projectType]["project"]),process.cwd());
        }
    })
}