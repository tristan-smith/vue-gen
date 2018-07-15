#!/usr/bin/env node
const cmd = require('commander');

let { generateComponent } = require('./component');

// parse command options
cmd
  .option('-c, --component <componentName>', 'Generate component')
  .option('-v, --verbose', 'Verbose option')
  .parse(process.argv);

if (cmd.component) {
  generateComponent(cmd.component, cmd.verbose);
}
