#!/usr/bin/env node
const cmd = require('commander');

const { generateComponent } = require('./component');
const { findConfig } = require('./utils/find-config');

// parse command options
cmd
  .command('c <componentName>')
  .option('-v, --verbose', 'Verbose option')
  .option('-s, --small', 'Small option')
  .action(async (componentName, options) => {
    let config = null;

    try {
      config = await findConfig();
      console.log('Found config');
    } catch (err) {
      // console.log(chalk.yellow('Could not find config file, continuing without user settings'));
      console.log(err.message);
    }

    makeComponent(config, componentName, options).then(() => {
      console.log('Generated component');
    }).catch((err) => {
      console.log(err.message);
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
        // fine
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
