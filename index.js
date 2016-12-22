var path = require('path');
var client = require("./client");
var file = path.join(__dirname, 'lib/custom-script.js');

var NightmareBrowser = function (baseBrowserDecorator, args, config) {
  baseBrowserDecorator(this);
  const webPreferences = Object.assign(
    config.nightmareOptions.webPreferences || {},
    {
      preload: file,
      nodeIntegration: true,
    }
  );

  this._start = function (url) {
    const nightmare = require('nightmare')(
      Object.assign({
        width: 800,
        height: 600,
      }, config.nightmareOptions || {}, {
        waitTimeout: 1000000000,
        webPreferences
      })
    );

    nightmare
      .goto(url)
      .wait('#browsers')
      .evaluate(() => {
        document.querySelector('#banner').style.display = 'none';
        document.querySelector('#browsers').style.display = 'none';
      })
      .wait(() => null)
      .end()
      .catch((error) => console.error(error));
  }
}

NightmareBrowser.prototype = {
  name: 'Nightmare',
}

NightmareBrowser.$inject = ['baseBrowserDecorator', 'args', 'config']

module.exports = {
  'launcher:Nightmare': ['type', NightmareBrowser],
  screenshot: client.screenshot,
  isNightmare: client.isNightmare,
}
