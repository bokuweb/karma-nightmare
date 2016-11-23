module.exports = {
  screenshot(path) {
    const nightmare = typeof window !== 'undefined' &&
          window.__nightmare ||
          parent.window.__nightmare;
    return new Promise((resolve) => {
      if (!nightmare) resolve();
      nightmare.capture({ path });
      nightmare.ipc.once('reply', () => {
        resolve();
      });
    });
  }
}

