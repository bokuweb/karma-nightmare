const nightmare = window.__nightmare || parent.window.__nightmare;

module.exports = {
  screenshot(path) {
    return new Promise((resolve, reject) => {
      if (!nightmare) reject();
      nightmare.capture({ path });
      nightmare.ipc.once('reply', () => {
        resolve();
      });
    });
  }
}

