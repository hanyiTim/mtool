const inquirer = require('inquirer'),
      fisUtil = require('../util/fisutil.js'),
      path = require('path'),
      projectPath = path.join(__dirname,"../");
const Info = [
    {
        "type":"input",
        "name":"commandName",
        "message":"子命令名称(只能用字母组合，语义化)"
    },
    {
        "type":"input",
        "name":"description",
        "message":"功能描述"
    }
]

inquirer.prompt(Info).then(function(answers){
    if(answers.commandName){
        let compDir = path.join(projectPath,`/component/mt-plugins-${answers.commandName}`);
        let mainDir = path.join(projectPath,`/bin/mt-${answers.commandName}.js`);
        if(fisUtil.isDir(compDir) && fisUtil.isFile(mainDir)){
            console.log('该命令已存在');
            return false;
        }

        writeTemp(answers.commandName,compDir,mainDir);
    }
})

function writeTemp(name,compDir,mainDir){
    let commandMain = fisUtil.read(path.join(projectPath,'temp/temp-command.js')),
        commandIndex = fisUtil.read(path.join(projectPath,'temp/temp-command-index.js'));
    commandMain = commandMain.replace(/\${name}/gi,name);
    commandIndex = commandIndex.replace(/\${name}/gi,name);
    fisUtil.mkdir(compDir);
    fisUtil.write(`${mainDir}`,commandMain);
    fisUtil.write(`${compDir}/index.js`,commandIndex);
}