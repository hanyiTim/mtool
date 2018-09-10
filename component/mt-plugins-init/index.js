const util = require('../../util/util.js');

exports.name = "init"
exports.desc = "init desc";
exports.options = {
    "-i,--initial":'初始化项目',
    "-p,--page":"新添加页面",
    "-c,--comp":"添加组件",
    "--pi,--pathInit":"设置项目模板路径",
    "--pc,--pathComp":"设置组件模板路径",
    "--pp,--pathPage":"设置页面模板路径"
}
exports.run = function(argv){
    let infoPath = util.resolvePath(__dirname,'/cache_info.json');
    let info = util.readJSON(infoPath);
    let processCwd = util.getCwd();
    let mtConf = util.readJSON(path.join(processCwd,'/mt-conf.json'));
    if(argv.initial){
        if(info.pathInit){
            util.copy(info.pathInit,processCwd,"",/(.git)/);
        }else{
            console.log('project temp path is not defined')
        }
        return false;
    }
    if(argv.pathInit){
        canchePath("pathInit",processCwd,info,infoPath)
    }
    if(argv.pathComp){
        canchePath("pathComp",processCwd,info,infoPath)
    }
    if(argv.pathPage){
        canchePath("pathPage",processCwd,info,infoPath)
    }
    if(!mtConf){
        console.log('mt-conf.json is not fount');
        return false;
    }else{
        if(argv.page && mtConf && mtConf.page && argv.args[0]){
            if(info.pathPage){
                try{
                    util.copy(info.pathPage,path.join(processCwd,mtConf.page,argv.args[0]));
                }catch(e){
                    console.log(e);
                }
            }else{
                console.log('page temp path is not defined');
            }
            return false;
        }
        if(argv.comp && mtConf && mtConf.page  && argv.args[0] ){
            if(info.pathComp){
                util.copy(info.pathComp,path.join(processCwd,mtConf.comp,argv.args[0]));
            }else{
                console.log('page temp path is not defined');
            }
            return false;
        }
    } 
}
function canchePath(key,value,info,path){
    if(!info || Object.prototype.toString.call(info) !== "[object Object]"){
        info = {};
    }
    info[key] = value;
    util.write(path,JSON.stringify(info));
}