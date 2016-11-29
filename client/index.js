module.exports = {
  screenshot: function (path) {
    const nightmare = typeof window !== 'undefined' &&
          window.__nightmare ||
          parent.window.__nightmare;
    return new Promise(function (resolve) {
      if (!nightmare) resolve();
      nightmare.capture({ path: path });
      nightmare.ipc.once('reply', function () {
        resolve();
      });
    });
  }
}

