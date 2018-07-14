#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cmd = require('commander');
const chalk = require('chalk');

// parse command options
cmd
  .option('-c, --component <componentName>', 'Generate component')
  .option('-v, --verbose', 'Verbose option')
  .parse(process.argv);

if (cmd.component) {
  generateVerboseComponent(cmd.component);
}

/**
 * Generate a multifile component in the current working directory
 * Working directory may not contain a folder with the same name as the component
 * @param {String} name name of the component to generate
 */
function generateVerboseComponent(name) {
  const src = path.join(__dirname, '/templates/verbose-component');
  const destination = path.join(process.cwd(), name);
  console.log(chalk.blue(`Creating a component ${name} in ${destination}...`));

  try {
    fs.mkdirSync(destination);
    const files = {
      [`${name}.js`]: 'app.js',
      [`${name}.css`]: 'app.css',
      [`${name}.html`]: 'app.html',
      [`${name}.vue`]: 'app.vue',
    };

    // for each new file, parse the template file and save in the destination directory
    Object.keys(files).forEach((newFile) => {
      fs.readFile(path.join(`${src}/${files[newFile]}`), 'utf-8', (err,data) => {
        if (err) {
          return console.log(err);
        }
        const newData = data.replace(/{{ name }}/g, name).replace(/{{ prettyName }}/g, getPrettyName(name));
        
        fs.writeFile(path.join(`${destination}/${newFile}`), newData, 'utf8', function (err) {
          if (err) return console.log(err);
       });
      })
    })

  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(chalk.red(`Component folder ./${name} already exists`));
      return;
    }
    console.log(err);
  }
}

/**
 * Generate a pretty name from a dash separated name
 * example: user-dashboard-component -> UserDashboardComponent
 * @param {String} name dash separated name of the component
 * @returns {String} prettyName
 */
function getPrettyName(name) {
  const words = name.split('-');
  let prettyName = '';
  words.forEach((word) => {
    prettyName += `${word[0].toUpperCase()}${word.substring(1)}`;
  })
  return prettyName;
}