#!/usr/bin/env node
const { program } = require('commander');
const cli = require('../lib/cli.js');
const argv = require('minimist')(process.argv.slice(2));
if(argv._[0]){
    cli.run(argv,program);
}else{
    console.log('cmd is  emtry');
}




