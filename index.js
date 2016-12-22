var path = require('path');
var client = require("./client");

var NightmareBrowser = function (baseBrowserDecorator, args, config) {
  const file = path.resolve(path.dirname(require.resolve('karma-nightmare')), 'lib/browser.js');
  baseBrowserDecorator(this);
  this._start = function (url) {
    this._execCommand('node', [
      file,
      url,
      JSON.stringify(config.nightmareOptions),
    ])
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
