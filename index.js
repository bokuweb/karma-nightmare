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

    this.on('kill', function (done) {
      if (!this._process) return;
      this._process.kill('SIGKILL');
      done();
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
