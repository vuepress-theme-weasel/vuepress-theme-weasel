var cmd=require('node-cmd')
var argv = require('minimist')(process.argv.slice(2));

const defaultArg = argv._

const pkg = defaultArg[0]

const pkgExec = defaultArg[1]

