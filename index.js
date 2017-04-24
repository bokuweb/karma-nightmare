var path = require('path');
var client = require("./client");

var NightmareBrowser = function (baseBrowserDecorator, args, config) {
  const options = config.nightmareOptions || {};
  const file = path.join(__dirname, 'lib/browser.js');
  baseBrowserDecorator(this);
  this._start = function (url) {
    this._execCommand('node', [
      file,
      url,
      JSON.stringify(options),
    ]);

    this._process.stderr.on('data', function (data) {
      console.log('' + data);
    })

    this._process.stdout.on('data', function (data) {
      console.log('' + data);
    })
  }
}

NightmareBrowser.prototype = {
  name: 'Nightmare',
}

NightmareBrowser.$inject = ['baseBrowserDecorator', 'args', 'config']

module.exports = {
  'launcher:Nightmare': ['type', NightmareBrowser],
  screenshot: client.screenshot,
  saveHtml: client.saveHtml,
  isNightmare: client.isNightmare,
  getCurrentWindow: client.getCurrentWindow,  
}
