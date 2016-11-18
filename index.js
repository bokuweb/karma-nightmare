var path = require('path');
var nightmare = require('@bokuweb/nightmare-custom-for-karma')({
  waitTimeout: 1000000000,
  width: 600,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    preload: path.resolve("lib/custom-script.js")
  },
  show: true,
});

var NightmareBrowser = function (baseBrowserDecorator, args) {
  baseBrowserDecorator(this)
  this._start = function (url) {
    nightmare
      .goto(url)
      .wait(function() {
        return null;
      })
      .end()
      .catch(function(error) {
        console.error(error);
      })
  }
}

NightmareBrowser.prototype = {
  name: 'Nightmare',
  DEFAULT_CMD: {
  },
}

NightmareBrowser.$inject = ['baseBrowserDecorator', 'args']

module.exports = {
  'launcher:Nightmare': ['type', NightmareBrowser],
}
