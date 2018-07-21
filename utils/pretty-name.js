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

module.exports = {
  getPrettyName,
}
