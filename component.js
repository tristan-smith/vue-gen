const path = require('path');
const { promisify } = require('util');
const fs = require('fs');

const { getPrettyName } = require('./utils/pretty-name');

const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * Generate a multifile component in the current working directory
 * Working directory may not contain a folder with the same name as the component
 * @param {String} name name of the component to generate
 * @param {Boolean} verbose if true, generate separate files for template, script, and styles.
 * @throws {Error} throws if directory or file already exists.
 */
async function generateComponent(name, verbose) {
  // parse options
  // default is a single file component, not verbose
  const isVerbose = verbose === undefined ? false : verbose;
  let src = path.join(__dirname, '/templates/small-component');
  let destination = process.cwd();
  if (isVerbose) {
    src = path.join(__dirname, '/templates/verbose-component');
    destination = path.join(process.cwd(), name);
  }

  // check destinations and build files object - assign template files to file names.
  let files = {
    [`${name}.vue`]: 'app.vue',
  };
  if (isVerbose) {
    try {
      await mkdir(destination);
    } catch (err) {
      throw new Error('Directory already exists');
    }
    files = {
      [`${name}.js`]: 'app.js',
      [`${name}.css`]: 'app.css',
      [`${name}.html`]: 'app.html',
      [`${name}.vue`]: 'app.vue',
    };
  } else {
    try {
      const file = await readFile(path.join(process.cwd(), `${name}.vue`), 'utf-8');
      if (file) {
        throw new Error(`${name}.vue already exists`);
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        // if the file doesn't exist good
      } else {
        // otherwise throw an error
        throw err;
      }
    }
  }

  // for each new file, parse the template file and save in the destination directory
  Object.keys(files).forEach(async (newFile) => {
    try {
      const data = await readFile(path.join(`${src}/${files[newFile]}`), 'utf-8');
      const newData = data.replace(/{{ name }}/g, name).replace(/{{ prettyName }}/g, getPrettyName(name));
      await writeFile(path.join(`${destination}/${newFile}`), newData, 'utf8');
    } catch (err) {
      throw new Error(err.message);
    }
  });
}

module.exports = {
  generateComponent
}
