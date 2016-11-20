var path = require('path');
var NightmareBrowser = function (baseBrowserDecorator, args, config) {
  console.log(config);
  console.log(this)
  baseBrowserDecorator(this)
  this._start = function (url) {
    this._execCommand('node', [path.resolve('lib/browser.js'), url])
  }
}

NightmareBrowser.prototype = {
  name: 'Nightmare',
}

NightmareBrowser.$inject = ['baseBrowserDecorator', 'args', 'config']

module.exports = {
  'launcher:Nightmare': ['type', NightmareBrowser],
}
