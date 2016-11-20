const path = require('path');
const glob = require("glob")
const file = glob.sync('./**/node_modules/karma-nightmare/lib/custom-script.js')[0];
const nightmare = require('@bokuweb/nightmare-custom-for-karma')({
  waitTimeout: 1000000000,
  width: 1200,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    preload: path.resolve(file)
  },
  show: true,
});

nightmare
  .goto(process.argv[2])
  .wait(() => null)
  .end()
  .catch((error) => console.error(error));
