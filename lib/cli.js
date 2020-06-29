const cli = {};

cli.run = (argv,program)=>{
    const {
        name,
        desc,
        options,
        run,
        help
    } = require(`lesstool-plugins-${argv._[0]}`);
    if(!name || !run){
        return false;
    }
    let cmd = (()=>{
        return (
            program
            .command(name)
            .description(desc)
            .on('--help',help)
        );
    })();
    (Object.keys(options)).forEach((item)=>{
        cmd.option(item,options[item]);
    });
    cmd.parse(process.argv);
    run(argv);
}
module.exports = cli;