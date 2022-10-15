#!/usr/bin/env node
const { Command } = require('commander');

const { generateComponent } = require('./component');
const { findConfig } = require('./utils/find-config');

program = new Command();

program
  .name('vue-gen')
  .description('a small Vue component generator')

// Create Component command
program
  .command('c')
  .argument('<componentName>', 'Dash separated component name')
  .option('-v, --verbose', 'Verbose option, creates separate files for script, template, and styles.')
  .option('-s, --small', 'Small option, creates a single file component. (Default)')
  .action(async (componentName, options) => {
    let config = null;


    try {
      config = await findConfig();
      console.log('Found config');
    } catch (err) {
      // Let the config utility tell us what went wrong
      console.log(err.message);
    }

    makeComponent(config, componentName, options).then(() => {
      console.log('Generated component');
    }).catch((err) => {
      // Let the component utility tell us what went wrong
      console.log(err.message);
    });
  });

program.parse();

/**
 * Generate a vue component with config, command options, and component name
 * @param {Object} config
 * @param {*} componentName
 * @param {*} options
 * @throws {Error} throws with invalid configuration, or component generation error (see component.js).
 */
function makeComponent(config, componentName, options) {
  return new Promise((resolve, reject) => {
    // check for mutually exclusive options...
    if (options.small && options.verbose) {
      reject(new Error('Please choose either small or verbose'));
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
