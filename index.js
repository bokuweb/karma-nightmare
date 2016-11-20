var path = require('path');
var glob = require("glob")

var NightmareBrowser = function (baseBrowserDecorator, args, config) {
  const files = glob.sync('./**/node_modules/karma-nightmare/lib/browser.js');
  baseBrowserDecorator(this)
  this._start = function (url) {
    this._execCommand('node', [path.resolve(files[0]), url])
  }
}

NightmareBrowser.prototype = {
  name: 'Nightmare',
}

NightmareBrowser.$inject = ['baseBrowserDecorator', 'args', 'config']

module.exports = {
  'launcher:Nightmare': ['type', NightmareBrowser],
}
