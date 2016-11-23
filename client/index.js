module.exports = {
  screenshot(path) {
    const nightmare = window && window.__nightmare || parent.window.__nightmare;
    return new Promise((resolve, reject) => {
      if (!nightmare) resolve();
      nightmare.capture({ path });
      nightmare.ipc.once('reply', () => {
        resolve();
      });
    });
  }
}
