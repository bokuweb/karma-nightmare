const path = require('path');
const glob = require("glob")
const file = path.join(__dirname, 'lib/custom-script.js');
const options = JSON.parse(process.argv[3]);
const nightmare = require('@bokuweb/nightmare-custom-for-karma')(Object.assign({
  width: 800,
  height: 600,
  show: true,
}, options, {
  waitTimeout: 1000000000,
  webPreferences: Object.assign(
    options.webPreferences, {
      preload: (options.webPreferences && options.webPreferences.preload) ||
        path.resolve(file),
    }
  )
}));

nightmare
  .goto(process.argv[2])
  .wait('#browsers')
  .evaluate(() => {
    document.querySelector('#banner').style.display = 'none';
    document.querySelector('#browsers').style.display = 'none';
  })
  .wait(() => null)
  .end()
  .catch((error) => console.error(error));
