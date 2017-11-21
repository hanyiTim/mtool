/**
 * 
 * 
 * 
 */
const chalk = require('chalk');
const log = console.log;

module.exports.error=function(str){
    // log(chalk.redBright(`ERROR:${str}`)) 
    log.apply(this,arguments);
}
module.exports.warn=function(str){
    // log(chalk.yellowBright(`WARN:${str}`))
    log.apply(this,arguments);
}
module.exports.success=function(str){
    // log(chalk.greenBright(`SUCCESS:${str}`))
    log.apply(this,arguments);
}
