const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const { getPrettyName } = require('./utils/pretty-name');

/**
 * Generate a multifile component in the current working directory
 * Working directory may not contain a folder with the same name as the component
 * @param {String} name name of the component to generate
 */
function generateComponent(name, verbose) {
  const isVerbose = verbose === undefined ? false : verbose;
  let src = path.join(__dirname, '/templates/small-component');
  let destination = process.cwd();
  if (isVerbose) {
    src = path.join(__dirname, '/templates/verbose-component');
    destination = path.join(process.cwd(), name);
  }
  console.log(chalk.blue(`Creating a component ${name} in ${destination}...`));

  try {
    let files = {
      [`${name}.vue`]: 'app.vue',
    };
    if (isVerbose) {
      fs.mkdirSync(destination);
      files = {
        [`${name}.js`]: 'app.js',
        [`${name}.css`]: 'app.css',
        [`${name}.html`]: 'app.html',
        [`${name}.vue`]: 'app.vue',
      };
    }

    // for each new file, parse the template file and save in the destination directory
    Object.keys(files).forEach((newFile) => {
      fs.readFile(path.join(`${src}/${files[newFile]}`), 'utf-8', (err, data) => {
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

module.exports = {
  generateComponent
}
