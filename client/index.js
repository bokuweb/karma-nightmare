module.exports = {
  isNightmare: function () {
    const nightmare = typeof window !== 'undefined' &&
          window.__nightmare || window.parent.__nightmare;
    return !!nightmare;
  },
  screenshot: function (path) {
    return new Promise(function (resolve, reject) {
      const nightmare = typeof window !== 'undefined' &&
            window.__nightmare || window.parent.__nightmare;
      if (!nightmare || nightmare.skipScreenshot) {
        return resolve();
      }
      const fs = nightmare.fs;
      const win = nightmare.remote.getCurrentWindow();
      setTimeout(function() {
        win.capturePage(function(img) {
          const png = img.toDataURL();
          const data = png.split(',')[1];
          nightmare.mkdirp(nightmare.path.dirname(path), function (err) {
            if (err) reject(err);
            fs.writeFile(path, data, 'base64', resolve);
          });
        });
      }, 0);
    });
  },
  saveHtml: function (path, saveType) {
    return new Promise(function (resolve, reject) {
      const nightmare = typeof window !== 'undefined' &&
      window.__nightmare || window.parent.__nightmare;
      if (!nightmare || nightmare.skipCaptureHtml) {
        return resolve();
      }
      const win = nightmare.remote.getCurrentWindow();
      nightmare.mkdirp(nightmare.path.dirname(path), function (err) {
        if (err) reject(err);
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
      });
    });
  },
}
