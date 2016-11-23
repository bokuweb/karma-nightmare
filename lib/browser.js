const path = require('path');
const glob = require("glob")
const file = glob.sync('./**/node_modules/karma-nightmare/lib/custom-script.js')[0];
const options = JSON.parse(process.argv[3]);
const nightmare = require('@bokuweb/nightmare-custom-for-karma')(Object.assign({
  waitTimeout: 1000000000,
  width: 600,
  height: 600,
  show: true,
}, options, {
  webPreferences: Object.assign({
    preload: path.resolve(file)
  }, options.webPreferences, {
    nodeIntegration: true
  })
}));

nightmare
  .goto(process.argv[2])
  .wait(() => null)
  .end()
  .catch((error) => console.error(error));
