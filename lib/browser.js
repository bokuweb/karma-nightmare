const path = require('path');
const nightmare = require('@bokuweb/nightmare-custom-for-karma')({
  waitTimeout: 1000000000,
  width: 600,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    preload: path.resolve("lib/custom-script.js")
  },
  show: true,
});

nightmare
  .goto(process.argv[2])
  .wait(() => null)
  .end()
  .catch((error) => console.error(error));
