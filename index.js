var path = require('path');
var glob = require("glob")
var client = require("./client");

var NightmareBrowser = function (baseBrowserDecorator, args, config) {
  const files = glob.sync('./**/node_modules/karma-nightmare/lib/browser.js');
  baseBrowserDecorator(this);
  console.log('asdasdasda')
  console.log(config.nightmareOptions)
  this._start = function (url) {
    this._execCommand('node', [
      path.resolve(files[0]),
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
}
