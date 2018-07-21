#!/usr/bin/env node
const cmd = require('commander');
const chalk = require('chalk');

const { generateComponent } = require('./component');
const { findConfig } = require('./utils/find-config');

// parse command options
cmd
  .command('c <componentName>')
  .option('-v, --verbose', 'Verbose option')
  .option('-s, --small', 'Small option')
  .action(async function (componentName, options) {
    let config = null;
    try {
      config = await findConfig();
    } catch (err) {
      console.log(chalk.yellow('Could not find config file, continuing without user settings'));
    }
    makeComponent(config, componentName, options);
  });

cmd.parse(process.argv);

/**
 * Generate a vue component with config, command options, and component name
 * @param {Object} config
 * @param {*} componentName
 * @param {*} options
 */
function makeComponent(config, componentName, options) {
  // TODO: build options object, populate with config, then populate with command line options

  // check for mutually exclusive options...
  if (options.small && options.verbose) {
    console.log(chalk.red('Please choose small or verbose'));
    return;
  }

  console.log(chalk.blue('Generating component'));

  let verbose = false;
  if (config) {
    try {
      verbose = config.defaults.component.verbose;
    } catch (err) {
      console.log(chalk.yellow('Malformed config file, continuing without user settings'));
    }
  }
  if (options.verbose !== undefined) {
    verbose = options.verbose;
  } else if (options.small !== undefined) {
    verbose = !options.small;
  }
  generateComponent(componentName, verbose);
}
