function getNightmare() {
  return typeof window !== 'undefined' &&
    window.__nightmare || window.parent.__nightmare;
}

module.exports = {
  isNightmare: function () {
    const nightmare = getNightmare();
    return !!nightmare;
  },
  getCurrentWindow: function () {
    const nightmare = getNightmare();
    if (!nightmare) {
      return null;
    }
    return nightmare.remote.getCurrentWindow();
  },
  screenshot: function (path) {
    return new Promise(function (resolve, reject) {
      const nightmare = getNightmare();
      if (!nightmare || nightmare.skipScreenshot) {
        return resolve();
      }
      const fs = nightmare.fs;
      const win = nightmare.remote.getCurrentWindow();
      requestIdleCallback(function () {
        win.capturePage(function (img) {
          const size = img.getSize();
          const ratio = window.devicePixelRatio;
          const png = img.resize({ width: size.width / ratio, height: size.height / ratio }).toDataURL();
          const data = png.split(',')[1];
          nightmare.mkdirp(nightmare.path.dirname(path))
            .then(() => {
              fs.writeFile(path, data, 'base64', resolve);
            })
            .catch((err) => {
              reject(err);
            });
        });
      }, { timeout: 1000 });
    });
  },
  saveHtml: function (path, saveType) {
    return new Promise(function (resolve, reject) {
      const nightmare = getNightmare();
      if (!nightmare || nightmare.skipCaptureHtml) {
        return resolve();
      }
      const win = nightmare.remote.getCurrentWindow();
      nightmare.mkdirp(nightmare.path.dirname(path))
        .then(() => {
          if (saveType === 'HTMLOnly') {
            // Faster than using nightmare
            nightmare.fs.writeFile(path, document.documentElement.outerHTML, 'utf-8', function (err) {
              if (err) reject(err);
              resolve();
            });
          } else {
            win.webContents.savePage(path, saveType || 'HTMLComplete', function (err) {
              if (err) reject(err);
              resolve();
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
