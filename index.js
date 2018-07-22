#!/usr/bin/env node
const cmd = require('commander');
const chalk = require('chalk');
const ora = require('ora');

const { generateComponent } = require('./component');
const { findConfig } = require('./utils/find-config');

// parse command options
cmd
  .command('c <componentName>')
  .option('-v, --verbose', 'Verbose option')
  .option('-s, --small', 'Small option')
  .action(async function (componentName, options) {
    let config = null;

    const spinner = ora();
    spinner.start('Finding config');

    try {
      config = await findConfig();
      spinner.succeed('Found config');
    } catch (err) {
      // console.log(chalk.yellow('Could not find config file, continuing without user settings'));
      spinner.warn(err.message);
    }

    spinner.start('Generating component');
    makeComponent(config, componentName, options).then(() => {
      spinner.succeed('Generated component');
    }).catch((err) => {
      spinner.fail(err.message);
    });
  });

cmd.parse(process.argv);

/**
 * Generate a vue component with config, command options, and component name
 * @param {Object} config
 * @param {*} componentName
 * @param {*} options
 */
function makeComponent(config, componentName, options) {
  return new Promise((resolve, reject) => {
    // check for mutually exclusive options...
    if (options.small && options.verbose) {
      reject(new Error('Please choose small or verbose'));
      return;
    }

    let verbose = false;
    if (config) {
      try {
        verbose = config.defaults.component.verbose;
      } catch (err) {
        // console.log(chalk.yellow('Malformed config file, continuing without user settings'));
      }
    }
    if (options.verbose !== undefined) {
      verbose = options.verbose;
    } else if (options.small !== undefined) {
      verbose = !options.small;
    }

    generateComponent(componentName, verbose).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
}
