const path = require('path');
const file = path.join(__dirname, 'custom-script.js');
const options = JSON.parse(process.argv[3]);
const webPreferences = Object.assign(
  options.webPreferences,
  {
    preload: file,
    nodeIntegration: true,
  }
);

const nightmare = require('nightmare')(
  Object.assign({
    width: 800,
    height: 600,
  }, options, {
    waitTimeout: 1000000000,
    webPreferences
  })
);

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
