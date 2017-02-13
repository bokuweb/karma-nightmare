const path = require('path');
const file = path.join(__dirname, 'custom-script.js');
const options = JSON.parse(process.argv[3]);
const webPreferences = Object.assign(
  options.webPreferences || {},
  {
    preload: file,
    nodeIntegration: true,
  }
);

const nightmare = require('nightmare')(
  Object.assign({
    width: 800,
    height: 600,
  }, options || {}, {
    waitTimeout: 1000000000,
    webPreferences
  })
);

nightmare
  .goto(process.argv[2])
  .wait('#browsers')
  .evaluate((options) => {
    const __nightmare = window.__nightmare || window.parent.__nightmare;
    if (__nightmare) {
      __nightmare.skipScreenshot = options.skipScreenshot;
      __nightmare.skipCaptureHtml = options.skipCaptureHtml;
    }
    document.querySelector('html').style.backgroundColor = '#fff';
    document.querySelector('#banner').style.display = 'none';
    document.querySelector('#browsers').style.display = 'none';
  }, options)
  .wait(() => null)
  .end()
  .catch((error) => console.error(error));

