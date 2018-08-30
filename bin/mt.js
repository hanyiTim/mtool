#!/usr/bin/env node
var program = require('commander'),
    inquirer = require('inquirer'),
    chalk = require('chalk');

program
    .version('0.0.1')
    .command('cli [childCmd]','项目脚手架工具')
    

program.parse(process.argv);