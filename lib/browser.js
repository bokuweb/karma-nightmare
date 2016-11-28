const path = require('path');
const glob = require("glob")
const file = path.join(__dirname, 'custom-script.js');
const options = JSON.parse(process.argv[3]);
const webPreferences = options.webPreferences
      ? Object.assign(
        options.webPreferences,
        { preload: (options.webPreferences && options.webPreferences.preload) || file }
      )
      : { preload: file };

const nightmare = require('@bokuweb/nightmare-custom-for-karma')(Object.assign({
  waitTimeout: 1000000000,
  width: 800,
  height: 600,
  show: true,
}, options, { webPreferences }));

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
