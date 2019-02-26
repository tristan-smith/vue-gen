const fs = require('fs');
const path = require('path');

const configFileName = 'vue-gen.config.js';

/**
 * Find config relative to cwd by travelling up directories.
 * @param {String} filePath relative path to search in, '' or '/..' for example
 * @returns {Promise} resolves to config object or error
 */
function findConfig(filePath) {
  const fp = filePath || '';
  // promisify it
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), `${fp}/${configFileName}`), 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Could not find config file in this directory'));
      } else if (data) {
        resolve(JSON.parse(data));
      }
    });
  });

  return promise.then(data => data).catch(() => {
    if (fp.length > 100) {
      // Searched too many directories, call it quits...
      throw new Error('Could not find config file');
    } else {
      return findConfig(`${fp}/..`);
    }
  });
}

module.exports = {
  findConfig,
};
