const path = require('path');
const glob = require("glob")
const file = glob.sync('./**/node_modules/karma-nightmare/lib/custom-script.js')[0];
const options = JSON.parse(process.argv[3]);
const nightmare = require('@bokuweb/nightmare-custom-for-karma')(Object.assign({
  width: 600,
  height: 600,
  show: true,
}, options, {
  waitTimeout: 1000000000,
  webPreferences: Object.assign({
    preload: path.resolve(file)
  }, options.webPreferences)
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
