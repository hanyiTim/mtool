#!/usr/bin/env node

var program = require('commander'),
    inquirer = require('inquirer'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');


var log = require(path.join(__dirname,'../util/log.js')),
    util = require(path.join(__dirname,'../util/util.js'));



var templeteInfoJsonPath = path.join(__dirname,'../conf/conf-temp-info.json'),
    templeteInfoJson = fs.readFileSync(templeteInfoJsonPath,'utf8'),
    templeteInfoObject = templeteInfoJson ? JSON.parse(templeteInfoJson):{},
    cc_process_cwd=process.cwd();
    


templeteInfoObject = getTempleteOpt(templeteInfoObject);

var tempInfo = templeteInfoObject[templeteInfoObject.checked];

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
        name:'info.pagePath',
        message:'pageInitPath'
    },
    {
        type:'input',
        name:'info.pageRelativePath',
        message:'pageRelativePath'
    },
    {
        type:'input',
        name:'info.widgetPath',
        message:'widgetInitPath'
    },
    {
        type:'input',
        name:'info.widgetRelativePath',
        message:'widgetRelativePath'
    }
];
program
    .option("-i,--init","新建项目，在当前目录初始化")
    .option("-w,--widget <widgetName>","新建组件")
    .option("-p,--page <pageName>","新建页面")
    .option("--set <templeteName>","设置当前模板")
    .option("--get","获取当前模板已经模板类表")
    .option("--add",'添加模板信息,project,widget模板路径')
    .option("--delete","删除模板信息")
    .parse(process.argv);


if(program.add){
    inquirer.prompt(templeteInfo).then(function(answers){
        if(answers.name && answers.name !== 'default'){
            templeteInfoObject[answers.name]=answers.info;
            fs.writeFileSync(templeteInfoJsonPath,JSON.stringify(templeteInfoObject,null,4),'utf8');
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
if(program.page){
    let compare;
    //add a wap_page
    if(argv.type!=="wap"){
        compare=function(match){
            if(/wap/gi.test(match[0])){
                return false;
            }else{
                return true;
            }
        }
    }
    let tempdir_obj=fn_getTemps(path.join(ab_temp_dir,"/page/"),compare);
    console.log(tempdir_obj);
    var create_page=argv.p || argv.wap;
    var temps;
    fn_exists(ab_page_dir,ab_page_dir+" is not a dir╮(╯Д╰)╭",true);
    //get page temp comment
    temps=fn_read({
        path:path.join(ab_temp_dir,"/page/"),
        tname:tempdir_obj
    });

    //log
    fn_exists(path.join(ab_page_dir,argv.p),"page '" + create_page + "' has existed╮(╯Д╰)╭");
    //if page has existed,return false
    fn_create({
        name:create_page,
        path:path.join(ab_page_dir,"/"+create_page+"/"),
        file:temps
    });

}
if(program.widget){
    var create_widget=program.widget;
    var temps={};
    let tempdir_obj=fn_getTemps(path.join(ab_temp_dir,"/widget/"));

    fn_exists(ab_widget_dir,ab_widget_dir+" is not a dir╮(╯Д╰)╭",true);

    //get widget temp comment
    temps=fn_read({
        path:tempInfo.widgetPath,
        tname:tempdir_obj
    });

    //fn_exists(path.join(ab_widget_dir,argv.w),"widget '" + create_widget + "' has existed╮(╯Д╰)╭");

    //fi widget has existed,return false
    fn_create({
        name:create_widget,
        path:path.join(ab_widget_dir,"/"+create_widget+"/"),
        file:temps
    });
}
if(program.init){
    //cope template project
    fn_travel(tempInfo.projectPath,cc_process_cwd,function(pathname,despath){
        fs.exists(despath,function(exists){
            console.log(despath,exists);
            if(!exists){
                fs.createReadStream(pathname).pipe(fs.createWriteStream(despath));
            }
        });
    });
}





/**
 * 
 * @param {*} opt 
 */
function getTempleteOpt(opt){
    if(!opt || !util.isObject(opt)){
        opt = {}
    }
    opt.checked = opt.checked ? opt.checked : "default";
    if(!opt.default || !util.isObject(opt.default)){
        opt.default = {
            projectPath:path.join(__dirname,"../templete/project"),
            widgetPath:path.join(__dirname,"../templete/widget"),
            widgetRelativePath:"./widget/",
            pagePath:path.join(__dirname,"../templete/page"),
            pageRelativePath:"./page/"
        }
    }
    return opt;
}


//新建 page  或者 widget
function fn_create(opt){
    fis.util.mkdir(opt.path);
    var files=opt.file || {};
    for(key in files){
        fs.writeFile(opt.path+opt.name+"."+key,files[key].replace(/\$name/gim,opt.name),function(err){
            if(err){
                fis.log.error(" create fail");
            }else{
                fis.log.notice(" create success");
            }
        });
    }

};

/**
 * [fn_read description]
 * @param  {[type]} opt [description]
 * @return {[type]}     [description]
 */
function fn_read(opt){
    var tname=opt.tname || {};
    var temps={};
    for(key in tname){
        temps[key]=fis.util.read(path.join(opt.path,tname[key]));
    }
    return temps;
};
/**
 * [fn_travel copy dir tree]
 * @param  {[type]}   dir      [dir path]
 * @param  {[type]}   dst      [dist path]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function fn_travel(dir,dst,callback){
    fs.readdirSync(dir).forEach(function(file){
        var pathname=path.join(dir,file),
            despath=path.join(dst,file);
        if(fs.statSync(pathname).isDirectory()){
            fs.exists(despath,function(exists){
                if(!exists){
                    fs.mkdirSync(despath);
                }
            });
            fn_travel(pathname,despath,callback);
        }else{
            callback(pathname,despath);
        }
    });
};
/**
 * [fn_getTemps get page temlate]
 * @param  {[type]} pathname [description]
 * @param  {[type]} compare  [page type ,pc or wap]
 * @return {[type]}          [description]
 */
function fn_getTemps(pathname,compare){
    let tempdir=fs.readdirSync(pathname);
    let obj={};
    tempdir.map((item) => {
        if(item){
            let match=/^([\w\-]*?)\.([\w\-]*?)$/gi.exec(item);
            if(match[2] &&(!compare || compare(match))){
                obj[match[2]]=match[0];
            }
        }
    });
    return obj;
}
